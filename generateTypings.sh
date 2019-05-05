#!/usr/bin/env bash

DIRS=$(find "$(pwd)/messages" -maxdepth 1 -not -path '*/\.*' | sort)

for DIR in ${DIRS}
do
  DIR_NAME=`basename ${DIR}`
  #echo ${DIR_NAME}
  if [[ ${DIR_NAME} != "messages" ]];
  then
  for FILE in ./messages/${DIR_NAME}/*
  do
    QUICK_NAME=`basename ${FILE}`
    FILE_NAME="${QUICK_NAME%.json}"
    FILE_NAME=${FILE_NAME/%.request/Request}
    FILE_NAME=${FILE_NAME/%.response/Response}
    FILE_NAME=${FILE_NAME//./}
    OUTPUT_FILE_NAME="./typings/${FILE_NAME}.d.ts"
    json-ts "./messages/${DIR_NAME}/${QUICK_NAME}" --prefix '' --rootName "${FILE_NAME}" --namespace "Alexa.${FILE_NAME}" | tee "${OUTPUT_FILE_NAME}"
  done
  fi
done
