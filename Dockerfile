FROM debian

WORKDIR /app

COPY . .

EXPOSE 8081

RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    git \
    && rm -rf /var/lib/apt/lists/*

CMD ["/bin/bash"]