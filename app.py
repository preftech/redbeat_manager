from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS
from celery import Celery
from redis_manager import get_schedules
from redbeat.decoder import RedBeatJSONEncoder, RedBeatJSONDecoder, to_timestamp
import os
import json
from pprint import pprint as pp

app = Flask(__name__, static_url_path='/', static_folder='redbeat-react/build')
CORS(app)

CELERY_APP = os.getenv("CELERY_APP", "POC")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost/")
celery = Celery(CELERY_APP, broker=REDIS_URL)

@app.route('/', defaults={'file' :'index.html'})
def index(file) :
    pp(app.static_folder)    

    return send_from_directory(app.static_folder, file)

@app.route('/schedules')
def retrieve():
    entries = get_schedules(celery)
    result_list = []
    for d in entries : 
        definition = {
            'name': d.name,
            'task': d.task,
            'args': d.args,
            'kwargs': d.kwargs,
            'options': d.options,
            'schedule': d.schedule,
            'enabled': d.enabled
        }
        meta = {
            'last_run_at': d.last_run_at,
        }
        entry =  json.loads(json.dumps(definition,cls=RedBeatJSONEncoder))
                    #"meta" :json.dumps(meta, cls=RedBeatJSONEncoder) 
        result_list.append(entry)

    return {'result': result_list}