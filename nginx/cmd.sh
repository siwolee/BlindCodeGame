#!/bin/sh
set -e
while 1; do
  if [ping -c 1 backend > /dev/null 2>&1]; then
    break
  fi
  sleep 1
  echo "Waiting for backend..."
done;

nginx -g "daemon off"; #is used to keep the container running. If you don't use this, the container will exit immediately after starting.