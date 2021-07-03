#!/bin/bash
python backend/manage.py makemigrations
python backend/manage.py migrate --run-syncdb
python backend/manage.py loaddata seeds.yaml
python backend/manage.py runserver 0.0.0.0:$PORT
