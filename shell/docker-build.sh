#!/bin/sh
docker-compose down && docker-compose build node && docker-compose up -d