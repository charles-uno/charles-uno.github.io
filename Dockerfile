
FROM ubuntu

RUN apt-get -y update

# Avoid prompt for time zone info.
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y \
    build-essential \
    git \
    ruby \
    ruby-dev \
    zlib1g-dev

RUN gem install bundler

# Watch out for locale encoding weirdness due to no time zone.
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# https://bundler.io/blog/2019/01/04/an-update-on-the-bundler-2-release.html
ADD Gemfile .
RUN gem update --system
RUN bundle install

CMD ["/bin/bash"]
