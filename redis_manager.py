import os
from POC import app
from redbeat import schedulers
#from pprint import pprint as pp


def get_schedules(app):
    redis = schedulers.get_redis(app)
    conf = schedulers.RedBeatConfig(app)
    keys = redis.zrange(conf.schedule_key, 0, -1)
    entries = [schedulers.RedBeatSchedulerEntry.from_key(key, app=app)
                for key in keys]
    #pp(entries)

    return entries

