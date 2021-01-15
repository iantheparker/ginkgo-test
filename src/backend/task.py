from celery import Celery
from bio import search_protein_list


CELERY_BROKER_URL = ("redis://redis:6379",)
CELERY_RESULT_BACKEND = "redis://redis:6379"

celery = Celery(
    "worker",
    backend=CELERY_RESULT_BACKEND,
    broker=CELERY_BROKER_URL,
)


@celery.task()
def search_protein_task(arg):
    print("search_protein_task starting")
    result = search_protein_list(arg)
    # write to db the status and results. Cache it using the search term
