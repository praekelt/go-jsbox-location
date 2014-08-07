#!/bin/bash -e
jshint `find lib test examples -name "*.js"`
mocha -R spec `find test examples/test -name "*.js"`
