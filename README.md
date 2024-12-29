## How to Set Up the App

### 1. **Prerequisites**:
Before setting up the application, ensure you have the following installed on your system:

- **Git**: To clone the repository.
  - Install Git from [here](https://git-scm.com/).
  
- **Docker**: To run the application in containers.
  - Install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).
  
- **Docker Compose**: To manage multi-container applications (usually bundled with Docker Desktop, so no additional installation is required for most users).

- **Node.js**: To run the frontend (if not included in Docker containers).
  - Install Node.js from [here](https://nodejs.org/).

- **Python** (for backend development, if not using Docker containers):
  - Install Python from [here](https://www.python.org/downloads/).
  - Install necessary Python packages by running `pip install -r requirements.txt`.


2. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

3. **Run the setup script**:

    For Linux/Mac:
    ```bash
    ./setup.sh
    ```

    For Windows:
    - Double-click the `setup.bat` file.

4. **Access the application**:
    Once the containers are running, you can access the app in your browser:
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:8080/api/inventory](http://localhost:8080/api/inventory)

5. **Stop the application**:
    To stop the containers, run:

    ```bash
    docker-compose down
    ```

6. **Running Tests**:
    - To run backend tests, ensure that `pytest` is installed by running:
    ```bash
    pip install pytest
    ```
      - navigate to the `backend` directory and use `pytest`:
      ```bash
      cd backend
      pytest
      ```
    - To run frontend tests, ensure that `Jest` is installed by running:
    ```bash
    npm install --save-dev jest
    ```
      - then, navigate to the `frontend` directory and use 
        ```bash
        npm test
        ```

        