FROM nginx:1.15

LABEL maintainer="tuan.anh@jslancer.com"

# Install modules
RUN apt-get update && apt-get install -y \
  g++ \
  zip \
  vim \
  curl \
  openssl \
  libssl-dev \
  --no-install-recommends apt-utils \
  && rm -r /var/lib/apt/lists/*

WORKDIR /var/www/app