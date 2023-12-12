# Vite + Vue 3 Application Deployment and Environment Setup Guide

## Table of Contents

-   [Setting Up Environment Variables](#setting-up-environment-variables)
-   [Development](#development)
-   [Deployment](#deployment)

---

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14.17.0 or later recommended)
-   [npm](https://www.npmjs.com/) (v6.14.0 or later recommended)

## Setting Up Environment Variables

Create a `.env` file in the root of your project to manage environment-specific configurations. Use the `.env.example` file as a starting point.

```bash
# .env.example
VUE_APP_API_BASE_URL= your-url
```

## Deployment

### Deploying to a Server

1. **Build the Project for Production:**

    ```bash
    npm install
    npm run build
    ```
