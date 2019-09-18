############## FROM

## 1. install ubuntu (package update)
#FROM	ubuntu:16.04
#MAINTAINER subicura@subicura.com
#RUN	apt-get -y update
#
## 2. install ruby
#RUN	apt-get -y install ruby
#RUN	gem install bundler
#
## 3. Copy source
#COPY	. /usr/src/app
#
## 4. install gem
#WORKDIR	/usr/src/app
#RUN	bundle install
#
## 5. execute sinatra server
#EXPOSE	4567
#CMD	bundle exec ruby app.rb -o 0.0.0.0
#

############## TO

# 1. install ruby
FROM	ruby:2.3
MAINTAINER subicura@subicura.com

# 2. Copy source
COPY    Gemfile* /usr/src/app
WORKDIR	/usr/src/app
RUN	bundle install --no-rdoc --no-ri

COPY	. /usr/src/app

# 4. execute sinatra server
EXPOSE	4567
CMD	bundle exec ruby app.rb -o 0.0.0.0

############## TIP

## 불필요한 로그는 무시
# before
# RUN apt-get -y update
#
# after
# RUN apt-get -y -qq update

## 필요없는 문서는 생성하지 말기
# before
# RUN bundle install
#
# after
# RUN bundle install --no-rdoc --no-ri

## 이쁘게
# before
# RUN apt-get -y -qq update
# RUN apt-get -y -qq install ruby
#
# after
# RUN apt-get -y -qq update && \
#     apt-get -y -qq install ruby
