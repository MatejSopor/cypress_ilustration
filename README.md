# Cypress real project ilustration

## Overview
Welcome to the Cypress real project ilustration! This project is designed to assist engineers in implementing Cypress within larger projects by providing a well-organized structure and practises that was already implemented and worked the best for my team.

If you find yourself struggling with how to structure your Cypress tests, how to use multiple config files and as well how to succesfully send different kind of reports from your tests. You can find everything in one place

## Table of Contents

- [Structuring](#installation)
- [Multiple configs](#usage)
- [Custom reporting](#features)
- [](#contributing)
- [Run tests in CI pipeline with Docker](#license)


## Installation
Clone the repository to your local machine and install all npm packages used for this project

```bash
npm install
```

## 1. Multiple configs

If you ran in a situation that you are testing against multiple environments/instances and in each the testing data differ.

Solution would be to use the main cypress.cy.ts config which would include the not changig data:

