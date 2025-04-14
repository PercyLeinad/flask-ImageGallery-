FROM python:3.13-alpine

WORKDIR /usr/src/flask-ImageGallery

COPY requirements.txt /usr/src/flask-ImageGallery

RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 8000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000", "--access-logfile", "-", "--error-logfile", "-"]
