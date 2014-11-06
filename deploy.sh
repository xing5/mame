#!/bin/bash

jade views -P -o deploy/
cp -rf public/* deploy/