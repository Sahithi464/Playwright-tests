# Project Setup and Testing Instructions

## Step 1: Install Node.js

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

## Step 2: Clone the Project

1. Create a new folder.
2. Clone the project into the folder.

git clone <repository-url>
cd <project-folder>


## Step 3: Open the project in VSCode 
Install the packages by running command "npm install"

## Step 4: Executing the Playwright Typescript Tests run your tests with the below command:
"npx playwright test swaglabs.spec.ts --project=chromium" 
Here all our 3 scenarios are present in swaglabs.spec.ts class


## Running tests in headless mode by running below command 
**Windows:**
set HEADLESS=true && npx playwright test swaglabs.spec.ts
**Powershell:**
$env:HEADLESS='true'; npx playwright test swaglabs.spec.ts

###N ote: Html Report is generated in playwright-report folder 

To view the latest report run "  npx playwright show-report"

Running tests in different browser by overriding in command line
"npx playwright test swaglabs.spec.ts --project=<browsername>" 


