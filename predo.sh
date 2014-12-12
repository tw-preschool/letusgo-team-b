#!/bin/bash
cd db
sqlite3 development.sqlite3
drop table products;
drop schema_migrations;
.exit
