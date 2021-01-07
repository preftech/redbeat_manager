'''
b'_kombu.binding.celeryev'
b'set'
b'redbeat:add-every-30-seconds'
b'hash'
b'redbeat:celery.backend_cleanup'
b'hash'
b'_kombu.binding.celery'
b'set'
b'redbeat::statics'
b'set'
b'redbeat::schedule'
b'zset'
b'redbeat::lock'
b'string'
b'_kombu.binding.celery.pidbox'
b'set'
'''

def retrieve (r, k):
    key_type = r.type(k).decode("utf-8") 
    print(key_type)
    k = k.decode()
    if key_type in ['string']:
        return r.get(k)
    if key_type in ['hash'] :
        return r.hgetall(k)
    if key_type in ['zset'] :
        return r.zrange(k, 0, -1)
    if key_type in ['set'] :
        return r.smembers(k)