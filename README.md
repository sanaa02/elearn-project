# elearn-project

Welcome to elearn-project! This project aims to provide a platform for online learning.

## Getting Started

To run the project locally, follow these steps:

1. **Create a Virtual Environment:**
   ```bash
   # Create a virtual environment
   python -m venv env


2. **Activate the Environment:**
   ```bash
   # Activate the virtual environment
   .\env\Scripts\activate

3. **Install Dependencies::**
   ```bash
   # Install required packages
   pip install -r requirements.txt
   # Apply migrations
   python manage.py makemigrations
   python manage.py migrate


4. **Run server:**
   ```bash
   # Run the server
   python manage.py runserver


to update requirements after installing new package :
   ```bash
   pip freeze > requirements.txt




