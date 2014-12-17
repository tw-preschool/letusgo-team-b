#!/bin/bash
rm -f db/development.sqlite3
rm -f db/test.sqlite3
RACK_ENV=development rake migrate
RACK_ENV=test rake migrate
rake seedroot
