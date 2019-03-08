
FROM ubuntu

RUN apt-get -y update

# Avoid prompt for time zone info.
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y \
    build-essential \
    ruby \
    ruby-dev \
    zlib1g-dev

RUN gem install bundler

# Watch out for locale encoding weirdness due to no time zone.
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

ADD Gemfile .
RUN bundle install
RUN bundle update

CMD ["/bin/bash"]
