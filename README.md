# MapTale Project

MapTale is a project management tool that allows users to create and manage projects with a hierarchical structure of nodes, notes, and maps. Users can add pins to maps and link them to notes, providing a visual representation of project elements.

## Project Setup

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn

### Backend Setup

1. Clone the repository:

    ```
    git clone <repository-url>
    cd <repository-directory>/backend
    ```

2. Create and activate a virtual environment:

    ```
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:

    ```
    pip install -r ../requirements.txt
    ```

4. Apply the database migrations:

    ```
    python manage.py migrate
    ```

5. Create a superuser for the Django admin:

    ```
    python manage.py createsuperuser
    ```

6. Start the Django development server:

    ```
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd ../frontend
    ```

2. Install the required npm packages:

    ```
    npm install
    ```

3. Start the Vite development server:

    ```
    npm run dev
    ```

### Accessing the Application

- The backend API will be available at `http://127.0.0.1:8000/`
- The frontend application will be available at `http://127.0.0.1:5173/`
- The Django admin interface will be available at `http://127.0.0.1:8000/admin/`

### Additional Information

- The backend is built using Django and Django REST framework.
- The frontend is built using React and Material-UI.
- The project uses SQLite as the database.
