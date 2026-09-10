# TechDesk

TechDesk is an AI-powered IT support assistant that helps users troubleshoot common technical issues.

Users can describe a problem, and TechDesk analyzes the issue, identifies the category and priority, suggests a possible cause, provides troubleshooting steps, and generates a professional support response.

## Features

- AI-powered IT troubleshooting
- Issue categorization
- Priority classification
- Possible cause analysis
- Step-by-step troubleshooting guidance
- Professional support response generation
- Quick example buttons for Wi-Fi, login, and printer issues
- Clear/reset functionality
- Clean technology-inspired interface

## Technologies Used

- React
- JavaScript
- Node.js
- Express.js
- OpenAI API
- HTML
- CSS

## How It Works

1. The user enters an IT problem.
2. The React frontend sends the problem to the Node.js backend.
3. The backend sends the problem to the OpenAI API.
4. The AI analyzes the issue.
5. TechDesk displays the category, priority, possible cause, troubleshooting steps, and suggested response.

## Example

**Problem:**

My office printer says offline and I cannot print.

**TechDesk Analysis:**

- Category: Printer
- Priority: Medium
- Possible Cause: The printer may be disconnected from the network or set to offline.
- Troubleshooting Steps: TechDesk provides several recommended steps.
- Suggested Response: A professional support response is generated for the user.

## Security

The OpenAI API key is stored in an environment variable and is excluded from GitHub using `.gitignore`.

## Author

Sadaf Mohammad

© 2026 Sadaf Mohammad
