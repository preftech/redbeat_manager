from POC import app
from celery.schedules import crontab
from celery.schedules import schedule
from redbeat import RedBeatSchedulerEntry
import random

interval = schedule(run_every=30)  # seconds
entry = RedBeatSchedulerEntry('POC.add', 'POC.add', interval, app=app, args=[random.randint(1, 1000), random.randint(1,1000)])
entry.save()

app.conf.timezone = 'UTC'