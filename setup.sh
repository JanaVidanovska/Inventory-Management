# setup.sh
#!/bin/bash

if ! command -v docker &> /dev/null; then
  echo "Docker could not be found. Please install Docker first."
  exit 1
fi

if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose could not be found. Please install Docker Compose first."
  exit 1
fi

echo "Building and starting the app..."
docker-compose up --build