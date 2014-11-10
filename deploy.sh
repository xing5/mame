#!/bin/bash

jade views/{index,her,me,story,letter}.jade -P -o deploy/
sed -i '' -e 's/\(href="\/\)\([^"]*\)/\1\2\.html/g' deploy/index.html
grep '/proposal/' deploy/javascripts/*.js | awk -F ':' '{print $1}'|uniq | xargs -I xx sed -i '' -e "s/\"\/proposal/\"http:\/\/api.xingwu.me\/proposal/g" xx
cp -rf public/images deploy/
cp -rf public/*.html deploy/
cp -rf public/javascripts/*.js deploy/
