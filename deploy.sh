#!/bin/bash

jade views -P -o deploy/
cp -rf public/* deploy/
grep 'api/' javascripts/*.js | awk -F ':' '{print $1}'|uniq | xargs -I xx sed -i '' -e 's/\/api/http:\/\/api.xingwu.me\/proposal/g' xx