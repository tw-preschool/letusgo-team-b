#!/bin/bash
rm -f db/development.sqlite3
rm -f db/test.sqlite3
./setup.sh
rake seed
