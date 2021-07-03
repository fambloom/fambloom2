# Fambloom
Created with docker, django, react, postgres, heroku


# Local Deployment  
  1) Make sure docker is installed and running.
  2) Clone github repo  
  3) Run: `docker-compose up --build`  

# Production Deployment  
  1) `heroku git:remote -a fambloom2`
  2) `git push heroku master`

   == OR == (faster)
  1) `heroku container:login`
  2) `docker build -t registry.heroku.com/fambloom2/web .`
  3) `docker push registry.heroku.com/fambloom2/web`
  4) `heroku container:release -a fambloom2 web`

## Third-Party Guides  
- Initial Setup: https://dev.to/englishcraig/creating-an-app-with-docker-compose-django-and-create-react-app-31lf  
- Connecting Django and Postgres in Heroku Deployment: https://testdriven.io/blog/deploying-django-to-heroku-with-docker/  
- https://dev.to/mdrhmn/deploying-react-django-app-using-heroku-2gfa

###  Code Changes  
  Django:  
  - models moved to folder, migrations moved within models folder  
  - in backend/urls.py, there is a regex that sends all urls that are undefined to the index.html template  
    - this causes a problem when accessing sites without appending a backslash  
      - `fambloom2.herokuapp.com/admin/` will display the Django admin page  
      - `fambloom2.herokuapp.com/admin` will not display the Django admin page  
  - a scripts/ folder was added (backend/scripts) which contains the `entrypoint.sh` file which defines the startup process for the Django container which is called by the Dockerfile  
