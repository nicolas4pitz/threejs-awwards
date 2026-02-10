FROM debian

WORKDIR /app

COPY . .

EXPOSE 8081

RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs \
    npm \
    git \
    curl

RUN echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc

#RUN curl -f https://zed.dev/install.sh | sh

CMD ["/bin/bash"]