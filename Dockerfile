FROM python:3.8.6
WORKDIR /app
COPY . /app/
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install yarn
RUN pip install -r /app/requirements.txt
RUN cd redbeat-react && \ 
                yarn && \
                yarn build
CMD ["flask", "run","--host", "0.0.0.0"]