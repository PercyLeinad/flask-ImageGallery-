
FROM python:3.9-slim-buster

WORKDIR /usr/src/v1.1

COPY requirements.txt /usr/src/v1.1

RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 9000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:9000", "--access-logfile", "-", "--error-logfile", "-"]
