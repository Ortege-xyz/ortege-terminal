This sample React application demonstrates how to use the Ortege REST API to fetch and display data in interactive tables. 

# Prerequisites
* Node.js (version 14 or higher)
* npm (version 6 or higher)
* Ortege JWT Token with the necessary permissions

# Getting Started
## Installation
Clone the Repository

```
git clone https://github.com/Ortege-xyz/ortege-terminal.git
cd ortege-terminal
```

Install Dependencies

`npm install`

## Configuration
Set Up Environment Variables

Create a .env file in the root directory of the project. This file will store your Ortege API credentials and should not be committed to version control.

.env

```
ORTEGE_API_URL=https://api-staging.ortege.ai
ORTEGE_TOKEN=your_jwt_token_here
```

Replace `your_jwt_token_here` with your actual Ortege JWT token.

# Running the Application
Start the application in development mode:

`npm start`

Open http://localhost:3000 to view it in your browser.

# Project Structure
```
├── src
│   ├── components
│   │   ├── ContractCallsTable.js
│   │   ├── DappsTvlMarketCapTable.js
│   │   └── StackedStxTable.js
│   ├── CubeProvider.js
│   ├── queries.js
│   └── App.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
* src/components: Contains React components for each interactive table.
* CubeProvider.js: Initializes the Cube.js client using the REST API and provides it via React Context.
* queries.js: Stores all Ortege queries separately.
* App.js: Main application file that renders the components.