#**App Automation Test**

## Must have before start

- Git
- Docker

### Steps

1. Pull the docker image containing the web app
`docker pull automaticbytes/demo-app`

2. Run the image
`docker run -p 3100:3100 automaticbytes/demo-app`

3. Verify the app is shown in below url and set it as the base url for the tests.
`http://localhost:3100`

4. Fork this repository and develop your tests following bellow guidances/requisites.

5. When finished open a Pull Request for Code Review.

### General requisites for submission

1. Programming languages
   - Java or Javascript are preferred.
   - Other languages like C#, Go or Python are accepted but bear in mind we work in Java/Javascript

2. Drivers. Only one accepted
   - Playwright

3. Browsers
	- Chrome (preferred)
	- Firefox

### General test requisites
- All tests should provide a setup and tear down mechanism that opens and closes the browser.
- All tests should run successfully either from IDE or command line.
- Instructions to build and run the code and tests submitted must be provided.
- Submitted code implementing a Page Object Model will be taken in high consideration.

### Tests Scenarios
1.  Login Success
   - Navigate to http://localhost:3100/login
   - Successfully login with credentials: johndoe19/supersecret
   - Assert that welcome message containing username is shown.

2. Login Failure A
   - Navigate to http://localhost:3100/login
   - Enter wrong username/password
   - Assert error message is shown.

3. Login Failure B
   - Navigate to http://localhost:3100/login
   - Leave both username/password in blank
   - Assert error message is shown.

4. Checkout Form Order Success
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is not checkmarked then checkmark it.
   - Submit the form and assert that the order confirmation number is not empty.

5. Checkout Form Alert
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is checkmarked, then uncheckmark it.
   - Try to submit the form and validate that the alert message is shown and confirm the alert.
   - Assert alert is gone.

6. Cart Total Test
    - Navigate to http://localhost:3100/checkout
	- Assert that the cart total shown is correct for the item prices added.

7. Grid Item Test
    - Navigate to http://localhost:3100/grid
    - Assert that in position 7 the product shown is "Super Pepperoni"
	- Assert that the price shown is $10
	
8. Grid All Items Test	
	- Navigate to http://localhost:3100/grid
	- Assert that all the items have a non empty title, price, image and a button.

9. Search Success
  - Navigate to http://localhost:3100/search
  - Search for any word (for instance automation)
  - Assert that "Found one result for" plus the word you searched is shown.

10. Search Empty
	- Navigate to http://localhost:3100/search
	- Leave search box empty and submit the search
	- Assert that "Please provide a search word." message is shown.

# Follow the Instructions from here to run the test 

```markdown
# **Home-Test Automation Project**

## Project Structure

```plaintext
HOME-TEST/
├── allure-report/
├── allure-results/
├── node_modules/
├── pages/
│   ├── checkoutOrderForm.js
│   ├── gridItemsPage.js
│   ├── loginPage.js
│   └── searchPage.js
├── playwright-report/
│   └── index.html
├── test-results/
├── tests/
│   ├── checkoutFormOrderPage.spec.js
│   ├── gridItems.spec.js
│   ├── loginPage.spec.js
│   └── SearchPage.spec.js
├── .gitignore
├── LoginUserDeatils.json
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

## Description

This project is a test automation suite built using Playwright. It is structured to cover various test scenarios for web applications.

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **Git**: Version control system for cloning the repository and managing code.
- **Docker**: Required to run the application locally.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/automationapptest/home-test.git
   cd home-test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the Docker image for the application:**
   ```bash
   docker pull automaticbytes/demo-app
   docker run -p 3100:3100 automaticbytes/demo-app
   ```

4. **Set the base URL for your tests:**
   - Base URL: `http://localhost:3100`

## Running Tests

1. **Execute tests:**
   ```bash
   npm run test
   ```

2. **Generate and view reports:**
   - To generate an Allure report:
     ```bash
     npx playwright show-report
     ```

3. **View the test reports:**
   - The test results and reports can be found under `allure-report/`, `allure-results/`, and `playwright-report/`.

## Folder Structure

- **pages/**: Contains Page Object Models for different pages of the application.
- **tests/**: Contains test specifications and scenarios.
- **allure-report/**: Contains generated Allure reports for test execution.
- **allure-results/**: Contains raw data and results from test execution.
- **playwright-report/**: Contains HTML reports generated by Playwright.
- **test-results/**: Stores test results for analysis.

## Key Files

- **playwright.config.js**: Configuration file for Playwright tests.
- **package.json**: Contains dependencies and scripts to run the project.
- **LoginUserDeatils.json**: Sample JSON file used for login tests.

## Test Scenarios

The test scenarios are implemented in the respective files within the `tests/` folder:

1. **Login Tests:**
   - `loginPage.spec.js`: Covers successful login, invalid login, and blank credentials scenarios.

2. **Checkout Tests:**
   - `checkoutFormOrderPage.spec.js`: Tests for successful order placement and form validation alerts.

3. **Grid Tests:**
   - `gridItems.spec.js`: Verifies the grid items and their properties.

4. **Search Tests:**
   - `SearchPage.spec.js`: Tests the search functionality for valid and invalid inputs.
