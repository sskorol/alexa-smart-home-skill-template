# Alexa Smart Home Skill Template

The purpose of this repository is to reduce the initial effort of creating a good and reliable Alexa Smart Home Skills.

On the other hand, this code was built to provide a basic Alexa integration with 3rd-party Arduino-like controllers and different sensors.

The main idea is about creating so-called **virtual devices**, which could be then mapped with real micro-controllers via a custom middleware.

You may just wondering why do we need a middleware service? That's due to Smart Home Skills' limitation in terms of a backend.
Unfortunately, Amazon provides only a single option - AWS Lambda. That's a pretty straightforward business strategy. However, from developers' perspective it might be really painful to deal with Lambdas while Smart Home Skills development.
Here's why:

 - When lambda is cold started, it causes a several secs delay, until the device reacts to the voice command. It's very annoying, especially when you need to e.g. turn on the light while opening the front door. With such a huge delay, it's much easier to press the button on the switch instead of a voice command.
 - Cold start also causes devices' discovery issues. It may take some time until a round trip between Lambda and an external cloud provider is over (including devices states fetching). So Alexa sometimes fails to find new devices.
 - It's impossible to perform a direct MQTT integration into Alexa skill backend, as Lambda is not intended for long-running operations. We can't just subscribe to some topics and keep the connection open. And when Lambda is timed-out, we have to establish it once again, which causes sad delays and timeouts.

So this API was built keeping in mind all the above factors. Smart Home Skill will interact with a custom middleware, which knows everything about your devices, supplies requested information to Alexa, and proxies commands to micro-controllers.

![image](https://user-images.githubusercontent.com/6638780/57966822-d68e1300-795f-11e9-8a24-ba4f8e58fe31.png)

## API Style

An API style for building a Smart Home Skill is pretty similar to [common skills' SDK](https://ask-sdk-for-nodejs.readthedocs.io/en/latest/).

It's enough to call `SkillBuilders.smartHome` to drill into a chain of actions you may use to define your skill's handlers.

```typescript
exports.handler = SkillBuilders.smartHome(new Middleware())
  .addRequestHandlers(
    AuthorizationHandler,
    PowerHandler,
    BrightnessHandler,
    ChannelHandler,
    SpeakerHandler,
    DiscoveryHandler,
    StateHandler
  )
  .lambda()
``` 

## Types

To simplify the overall development effort there was created a basic set of types required for working with Alexa Smart Home Skills. You can find their declarations in **./typings/Alexa.d.ts**.
Some other useful structures are located in **./src/model** folder.

## Middleware

It might be a custom https server, which routes requests between Alexa and micro-controllers.

On the API level you can either reuse a built-in `Middleware` class or create your own by implementing `MiddlewareService` interface.

You can find a simple implementation in the following [repository](https://github.com/sskorol/alexa-middleware). 

## Handlers

There're several built-in handlers implemented:

 - **AuthorizationHandler**: triggered while skill's activation after linking your account. That's just a basic implementation. For more advanced scenarios check [Authorization](https://developer.amazon.com/docs/device-apis/alexa-authorization.html#acceptgrant) docs. You may also want to check [json samples](https://github.com/alexa/alexa-smarthome/tree/master/sample_messages/Authorization) to understand the required format.
 - **DiscoveryHandler**: triggered while asking Alexa to discover devices (or via similar feature in Alexa app). Note that it's a key handler for sending required info from micro-controllers to Alexa (through Middleware). Check [json samples](https://github.com/alexa/alexa-smarthome/tree/master/sample_messages/Discovery) for more details.
 - **StateHandler**: key handler for devices' state notifications. If you open Alexa mobile app and check your devices, the app will continuously poll this handler for state updates. Check [state reporting](https://developer.amazon.com/docs/smarthome/state-reporting-for-a-smart-home-skill.html#report-state-with-changereport-events) and json [samples](https://github.com/alexa/alexa-smarthome/tree/master/sample_messages/StateReport) for details.
 - [BrightnessHandler](https://developer.amazon.com/docs/device-apis/alexa-brightnesscontroller.html), [ChannelHandler](https://developer.amazon.com/docs/device-apis/alexa-channelcontroller.html), [PowerHandler](https://developer.amazon.com/docs/device-apis/alexa-powercontroller.html) and [SpeakerHandler](https://developer.amazon.com/docs/device-apis/alexa-speaker.html): triggered while asking Alexa to perform some common actions, e.g. "turn on / off" something.
 
You can create your own handlers by implementing `RequestHandler` interface. I'd recommend to use existing handlers' implementations as a baseline.

Also note that you have to follow an official [json schema](https://github.com/alexa/alexa-smarthome/blob/master/validation_schemas/alexa_smart_home_message_schema.json). As you may already noticed, this repository also contains a set a sample json messages for a quick start.

If you have some comments, thoughts or improvement ideas, feel free to create issues or PRs.

## Building and deployment

To set everything up, install the required dependencies first:

```bash
npm install
```

Create a **.env** file in the root of the project with the following content:

```dotenv
HOST=
PORT=
TIMEZONE=Europe/Kiev
API_VERSION=3
```

**HOST** / **PORT** refers to your Middleware service address. Note that you have to provide these environment variables on AWS Lambda as well.

There're several useful scripts for getting latest schema and generating typings:

```bash
npm run getSchema
npm run generateInterfaces
npm run generateMessages
```

You can check **./generateTypings.sh**, which simplifies this process.

When you're ready for publishing just run the following command:

```bash
npm run build 
```

That will create an **./archive.zip** which could be uploaded to Amazon Lambda then.

To get more details on how to create a Smart Home skill from scratch, use the following [instruction](https://github.com/alexa/skill-sample-nodejs-smarthome-switch/blob/master/instructions/README.md).

## Flow

Let's consider the following scenario: user wants to turn on the light.

Light bubble might be controlled by NodeMCU board via relay or RF transmitter.

If micro-controller sends the following json to **home/devices** topic, [Middleware](https://github.com/sskorol/alexa-middleware) will put it into in-memory storage for further usage by Alexa Smart Home Skill. 

```json
[
  {
    "endpointId": "lobby_lamp_1",
    "friendlyName": "light",
    "description": "Lobby Lamp 1",
    "manufacturerName": "Home",
    "cookie": {},
    "displayCategories": [
      "LIGHT"
    ],
    "capabilities": [
      {
        "type": "AlexaInterface",
        "interface": "Alexa.PowerController",
        "version": "3",
        "properties": {
          "supported": [
            {
              "name": "powerState"
            }
          ],
          "proactivelyReported": true,
          "retrievable": true
        }
      },
      {
        "type": "AlexaInterface",
        "interface": "Alexa",
        "version": "3"
      },
      {
        "type": "AlexaInterface",
        "interface": "Alexa.EndpointHealth",
        "version": "3",
        "properties": {
          "supported": [
            {
              "name": "connectivity"
            }
          ],
          "proactivelyReported": true,
          "retrievable": true
        }
      }
    ]
  }
]
```

When user first activates a skill and run devices' discovery, Smart Home Skill calls [DiscoveryHandler](https://github.com/sskorol/alexa-smart-home-skill-template/blob/development/src/core/DiscoveryHandler.ts), which then requests devices from our Middleware **/devices** endpoint.

When user says **Alexa, light on** (assuming the mentioned above friendly name in json), Smart Home Skill calls [PowerHandler](https://github.com/sskorol/alexa-smart-home-skill-template/blob/development/src/core/PowerHandler.ts), which then sends a power control command, e.g.

```json
[
  {
	"command":"TurnOn",
  	"state":true
  }
]
```
 
to our Middleware -> **/device/lobby_lamp_1** endpoint.

This command is published to individual **home/device/lobby_lamp_1** topic, which our NodeMCU board is subscribed to.

Micro-controller parses json message and executes the requested command via relay or RF transmitter. 
