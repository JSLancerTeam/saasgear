#!/bin/bash

cd /var/www/app/api
npm run db:migrate
npm run db:seed