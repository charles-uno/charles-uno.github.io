FROM alpine:3.13
COPY Gemfile .
RUN apk add --update ruby
RUN apk add \
        build-base \
        ruby-dev \
        libffi-dev \
        ruby-etc \
        zlib-dev
RUN gem install bundler
RUN bundle install

#RUN gem cleanup
#RUN apk del build-dependencies
#RUN gem update --system

CMD ["/bin/sh"]
