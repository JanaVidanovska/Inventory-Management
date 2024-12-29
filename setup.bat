@echo off

:: Pull necessary Docker images
docker-compose pull

:: Build and start containers in detached mode
docker-compose up --build -d

:: Provide feedback
echo App is now running at http://localhost:5173
echo Backend is running at http://localhost:8080/api/inventory
