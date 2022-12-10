FROM python:3.8.6-slim-buster

LABEL maintainer = "Jakub Tichý - tichyj15@fit.cvut.cz"

RUN mkdir wd
WORKDIR wd
COPY ./requirements.txt .
RUN #pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# Copy app folder to app folder in container
COPY src/ ./

# Run locally on port 8050
 CMD [  "gunicorn", "-b 0.0.0.0:8050",  "app:server"]