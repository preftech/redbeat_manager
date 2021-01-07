from celery import Celery
import os

host = os.getenv("REDIS_URL", "redis://localhost/")
app = Celery('POC', broker=host)


@app.task
def add(x, y):
    return x + y