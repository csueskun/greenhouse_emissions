# Greenhouse Gas Emissions

This project tracks and analyzes greenhouse gas emissions data. It visualizes the emissions in interactive charts, and the data can be filtered based on various criteria.

## Instructions

### Running the Application
To start the application, use the following command:
```bash
docker compose up -d --build
```

### Seeding the Database
To seed the database with initial data, run the following command:
```bash
docker compose run --rm api python manage.py seed_emissions
```

### Running Tests
To test the API, use:
```bash
docker compose run --rm api python manage.py test greenhouse
```

To test the web application, use:
```bash
docker compose run --rm web_app npx jest
```

## Version
0.0.1-dev
