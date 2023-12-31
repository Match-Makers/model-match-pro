# Model-Match-Pro

## A Code Fellows Code401-Python Final Project by

- Deiosha Sparks: [Github](https://github.com/Deiosha), [LinkedIn](https://linkedin.com/in/deiosha-sparks-954882251/)
- Jerry Barrows-Fitzgerald: [Github](https://github.com/jbarrfitz), [LinkedIn](https://linkedin.com/in/jbarrowsfitzgerald/)
- Lauren Main: [Github](https://github.com/elleem), [LinkedIn](https://linkedin.com/in/laurenmain28/)
- Manuch Sadri: [Github](https://github.com/mcsadri), [LinkedIn](https://linkedin.com/in/manuch-sadri/)

## Overview

- What is the vision of this product?
  - Model-Match-Pro enables its users to submit a single Large Language Model (LLM) prompt and then simltaneously compare the responses from multiple models to find which one(s) best match their use case.

- What pain point does this project solve?
  - With the recent proliferation of Large Language Models, many users pick their favorite and then try to engineer their prompts to work for their use case. Currently, there are very few, if any, applications that allow users to simltaneously compare results from multiple LLMs. Oftentimes, LLM users must test each LLM individually, and attempt to compare the responses through inefficient means.

- Why should we care about your product?
  - Model-Match-Pro will be one of the few products providing a method to compare the results from multiple LLMs within the same web browser tab using a single prompt submission.

## Links

- [Model Match Pro](https://model-match-pro.vercel.app/)

## Set-up

### Clone repo (if not done already)

- In terminal (assumes git, python3.11, and npm are previously installed):
  - Clone repo from GitHub:
    - $ ```git clone https://github.com/Match-Makers/model-match-pro.git```

### Frontend Set-up

- Open new terminal window or tab.
- Change directory to the frontend folder in the cloned local repo:
  - $ ```cd model-match-pro/frontend```
- Install all the dependencies:
  - $ ```npm install```
- Get secrets from project team for `/model-match-pro/frontend/.env`.
- Run local environment:
  - $ ```npm run dev```
- In browser (to run locally):
  - http://localhost:3000

### Frontend Tests

- Open new terminal window or tab.
- Change directory to the frontend folder in the cloned local repo:
  - $ ```cd model-match-pro/frontend```
- Run Playwright tests:
  - With new user registration:
    - $ ```node ./tests/pw-new-user.js```
  - With existing user:
    - $ ```node ./tests/pw-existing-user.js```
