# Track Pilot AI

Trip tracking app for drivers.

A company creates a trip and the app generates a unique code. The driver enters the code, sees the trip, and records the start, arrival and finish times. The duration is calculated automatically.

## Features

- Unique trip code generated automatically
- Driver view: find a trip by its code
- Status updates: start, arrive, finish, each with a timestamp
- Trip duration calculated automatically
- REST API built with Django REST framework

## Getting started

    git clone https://github.com/alighabi/trackpilot-ai.git
    cd trackpilot-ai
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt

    Create a file named .env in the project folder with your own secret key:

    SECRET_KEY=your-secret-key

Then create the database and start the server:

    python manage.py migrate
    python manage.py runserver