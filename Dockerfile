# OS Image
FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Build arguments
ARG URL
ARG AUTH_TOKEN
ARG PORT

# Set env variables
ENV URL=${URL}
ENV AUTH_TOKEN=${AUTH_TOKEN}
ENV PORT=${PORT}

# Set WORKDIR
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && apt-get clean

RUN curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
	| tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
	&& echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
	| tee /etc/apt/sources.list.d/ngrok.list \
	&& apt update \
	&& apt install ngrok

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Get model from ollama
RUN ollama serve & \
	sleep 15 && \
	ollama pull llava:7b

# Begin a proxy connnection
RUN  ngrok config add-authtoken $AUTH_TOKEN

# Copy file with permission
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Entrypoint
CMD ["/app/entrypoint.sh"]