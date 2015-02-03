FROM centos:centos6

RUN curl -sL https://rpm.nodesource.com/setup | bash -
RUN yum install -y nodejs
RUN yum install -y gcc-c++ make

COPY . /src
RUN cd /src; npm install

EXPOSE 3000

CMD ["node", "./src/app.js"]