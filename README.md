# Redbeat Schedule Manager

A basic project to provide an interface for viewing and managing celery tasks scheduled
through redbeat.
- [Redbeat Schedule Manager](#redbeat-schedule-manager)
- [Development](#development)
  - [Install python dependencies](#install-python-dependencies)
  - [Config](#config)

# Development
Built with Flask & Yarn

## Install python dependencies 
Virtual env is your friend

```bash
docker-compose up -d . # start local dev redis server
pip install -r requirements.txt
flask run &  # starts the flask app, now time to start the node app
cd redbeat-react
yarn
yarn start
```

IMPORTANT: 
There are now 2 services running flask & node.
For development you will primarily be looking at the the output of the node service on [localhost:3000](http://localhost:3000/)

The flask app [localhost:5000](http://127.0.0.1:5000/) is set to load a fully built app.


The primary code is in two places
Python 
- app.py - flask app for json for react display
- redis_manager.py - provides helper functions for redbeat

React 
- redbeat-react/src/components/schedules_viewer
- table.tsx - the primary table display and XHR requests
- formatters.tsx - table cell display formatters
- JSONEditor.tsx - refactor needed, a code style viewer for individual cells. 

Releasing
```bash
yarn build
```
Compiles typescript and outputs to redbeat-react/build
app.py is set to server static data from 
redbeat-react/build


## Config

Right now, only REDIS_URL is required
``bash
export REDIS_URL=redis://localhost/
flask run
```