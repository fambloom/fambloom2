#!/bin/bash
python manage.py makemigrations
python manage.py migrate --run-syncdb
python manage.py loaddata seeds.yaml
python manage.py runserver 0.0.0.0:$PORT
