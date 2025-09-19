# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run the app on your local machine, use the following command:

```bash
npm run dev
```

This will start the development server, and you can view your app at [http://localhost:9002](http://localhost:9002).

## Deployment to Firebase App Hosting

This project is configured to be deployed using Firebase App Hosting.

### Prerequisites

1.  **Firebase Project**: Make sure you have a Firebase project created. If you don't have one, you can create it in the [Firebase Console](https://console.firebase.google.com/).
2.  **Firebase CLI**: You need to have the Firebase Command Line Interface (CLI) installed on your machine. If you don't have it, install it globally using npm:
    ```bash
    npm install -g firebase-tools
    ```

### Deployment Steps

1.  **Login to Firebase**:
    Open your terminal and log in to your Google account:
    ```bash
    firebase login
    ```

2.  **Initialize App Hosting**:
    If you haven't already, you may need to associate your local project with your Firebase project. Run the following command in your project's root directory:
    ```bash
    firebase init apphosting
    ```
    Follow the prompts to select your Firebase project.

3.  **Deploy your Backend**:
    Once you're ready to deploy, run the following command:
    ```bash
    firebase apphosting:backends:deploy
    ```
    This command will build your Next.js application and deploy it as a backend on Firebase App Hosting. After the deployment is complete, the CLI will provide you with the URL where your application is live.
