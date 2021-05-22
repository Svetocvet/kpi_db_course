import redis
import sys

class Redis:
    host = '127.0.0.1'
    port = 6379

connection = redis.Redis(host=Redis.host, port=Redis.port, db=0, decode_responses=True)

def connect():
    try:
        connection.ping()
    except Exception as err:
        sys.exit(err)
    