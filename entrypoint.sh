#!/bin/bash
ollama serve & \
sleep 5 &&\
ngrok http --url=$URL $PORT &