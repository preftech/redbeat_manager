from flask import Flask
from flask_cors import CORS
from celery import Celery
from redis_manager import get_schedules
from redbeat.decoder import RedBeatJSONEncoder, RedBeatJSONDecoder, to_timestamp
import os
import json

app = Flask(__name__)
CORS(app)

CELERY_APP = os.getenv("CELERY_APP", "POC")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost/")
celery = Celery(CELERY_APP, broker=REDIS_URL)


@app.route('/schedules')
def retrieve():
    entries = get_schedules(celery)
    result_list = []
    for d in entries : 
        #print(json.dumps(d.from_key(d.key, celery), cls=RedBeatJSONEncoder))
        #print(d.from_key(d.key, celery))
        definition = {
            'name': d.name,
            'task': d.task,
            'args': d.args,
            'kwargs': d.kwargs,
            'options': d.options,
            'schedule': d.schedule,
            'enabled': d.enabled,
        }
        meta = {
            'last_run_at': d.last_run_at,
        }
        entry =  json.loads(json.dumps(definition,cls=RedBeatJSONEncoder))
                    #"meta" :json.dumps(meta, cls=RedBeatJSONEncoder) 
        result_list.append(entry)

    return {'result': result_list}