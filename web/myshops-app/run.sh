#!/bin/bash


function help(){
  echo "Usage: `basename $0` environment operation"
  echo "  environment - use following values"
  echo "       prod - production environment, file src/config/prodconfig.js"
  echo "       dev - development environment, file src/config/devconfig.js"
  echo "  operation - use following values"
  echo "       start - run 'npm start' "
  echo "       build - run 'npm build' "
}

if [ ! -n "$1" ]
then
  help
  exit $E_BADARGS
fi

if (( $# < 2 ))
then
  help
  exit $E_BADARGS
fi

if [[ "$1" != "prod" ]]  && [[ "$1" != "dev" ]]
then
  help
  exit $E_BADARGS
fi

if [[ "$2" != "start" ]]  && [[ "$2" != "build" ]]
then
  help
  exit $E_BADARGS
fi


if [ "$1" == "prod" ]
then
  cp -f src/config/prodconfig.js src/config/liveconfig.js
fi

if [ "$1" == "dev" ]
then
  cp -f src/config/devconfig.js src/config/liveconfig.js
fi

npm $2


