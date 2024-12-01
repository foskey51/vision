#!/bin/bash

# Start ollama service directly
ollama serve &

# Wait for Ollama to initialize
sleep 5

# Start ngrok
ngrok http --url=$URL $PORT --host-header="localhost:11434" &

# Keep the container running
tail -f /dev/null



