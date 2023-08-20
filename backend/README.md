# Model-Match-Pro

## A Code Fellows Code401-Python Final Project by

    - Deiosha Sparks: [Github](https://github.com/Deiosha), [LinkedIn](https://linkedin.com/in/deiosha-sparks-954882251/)
    - Jerry Barrows-Fitzgerald: [Github](https://github.com/jbarrfitz), [LinkedIn](https://linkedin.com/in/jbarrowsfitzgerald/)
    - Lauren Main: [Github](https://github.com/elleem), [LinkedIn](https://linkedin.com/in/laurenmain28/)
    - Manuch Sadri: [Github](https://github.com/mcsadri), [LinkedIn](https://linkedin.com/in/manuch-sadri/)

## Overview

- What is the vision of this product?
  - Model-Match-Pro will allow to developers to compare several models simultaneously to see which ones best match their use case.

- What pain point does this project solve?
  - With the proliferation of large language models, many users pick their favorite and then try to engineer their prompts to work for their use case. Currently, there are very few, if any, applications that allow users to compare results from multiple LLMs.

- Why should we care about your product?
  - We will be one of the few products to bring together a method to compare results from multiple LLMs.

## Links

- deployed application: ______TBD______

## Back-end Set-up

- In terminal (assumes git, python, and npm are previously installed):
  - Clone repo from GitHub:
    - $ ```git clone https://github.com/Match-Makers/model-match-pro.git```
  - Change directory to the backend folder in the cloned local repo:
    - $ ```cd model-match-pro/backend```
  - Create & run virtual environment:
    - $ ```python3.11 -m venv .venv```
    - $ ```source .venv/bin/activate```
  - Install requirements:
    - $ ```npm install -r requirements.txt```
  - Get secrets from project team for `/model-match-pro/backend/model_match_proj/.env`
  - Start dev web server:
  - $ ```python manage.py runserver```
- In browser (to run locally):
  - Django REST Framework default web pages:
    - http://localhost:8000/ - home
    - http://localhost:8000/admin/ - admin panel
    - http://localhost:8000/api/v1/model_match_app
