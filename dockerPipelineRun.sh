#!/bin/bash

# Help function
function show_help() {
    echo "Usage: $0 COUNTRY_ENVIRONMENT SPEC [OTHER]"
    echo
    echo "Runs Cypress tests with specified configuration."
    echo "  - COUNTRY_ENVIRONMENT: Sets the Cypress environment configuration."
    echo "  - SPEC: Specifies the test files to run."
    echo "  - OTHER: (optional) Additional Cypress command line options."
    echo
    echo "Example: $0 'instance:environment' 'cypress/integration/tests/*'"
}

# Check for help flag
if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    show_help
    exit 0
fi

# Check the number of parameters
if [ "$#" -lt "1" ]; then
    echo "No parameters set"
    show_help
    exit 1
fi

# Assigning parameters to variables
COUNTRY_ENVIROMENT="$1"
SPEC="$2"
shift 2
OTHER="$@"

# Running Cypress
npx cypress run --browser=chrome --e2e --headless --env publishReport=true,configFile="$COUNTRY_ENVIROMENT" --spec="$SPEC" "$OTHER"
