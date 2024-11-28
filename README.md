
# ValoInfo frontend
Built using reactjs - Authorization and project idea at last(user login credentials too).

```bash
Deployed Link - https://valo-info-c.vercel.app/
Admin board route - https://valo-info-c.vercel.app/account?tab=Users (use it with login credentials email - r@g2.com password - rahul123)
```

```bash
backend folder - /api
frontend folder - /client
```

## Installation

Install my-project with npm

```bash
  For client

  cd /client
  npm install
  npm run dev
```

```bash
  For api

  cd /api
  npm install
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. I am providing my own env files for use.

```bash
For client side -
VITE_BASE_API_URL = https://valo-info-api.vercel.app/api/v1
VITE_API_KEY = HDEV-c86bcf19-4414-4a51-9092-8a81610b8caa
VITE_LOCAL_BASE_URL = http://localhost:8000/api/v1
VITE_FIREBASE_APP_ID = 1:1094956894684:web:47dfe73202b3282455a719
VITE_FIREBASE_MESSAGING_SENDER = 1094956894684
VITE_FIREBASE_STORAGE_BUCKET = valoinfo-fullstack.appspot.com
VITE_FIREBASE_PROJECT_ID = valoinfo-fullstack
VITE_FIREBASE_AUTH_DOMAIN = valoinfo-fullstack.firebaseapp.com
VITE_FIREBASE_API_KEY = AIzaSyAEpPYYJ2J364C5-niVrMU8OAAd5cTy2_4

For api side -
CORS_ORIGIN = https://valo-info-c.vercel.app/
MONGO_URL = mongodb+srv://rahulharit13:77sKzPnSme7SQ8Zc@cluster0.stvohut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT = 8000

ACCESS_TOKEN_SECRET = fjsbdffsdgfisgdfuii
REFRESH_TOKEN_SECRET = afbajbsdfoasbvgouaeb

ACCESS_TOKEN_EXPIRY = 1d
REFRESH_TOKEN_EXPIRY = 10d
```
## Authorization Functionality and Project idea
ValoInfo is a full-stack web application tailored for Valorant enthusiasts to access live data about ongoing tournaments, share articles, and foster discussions through user-generated posts. The platform is built with a strong focus on user roles and access control, supporting two distinct roles: admin and user, each with specific functionalities.

```bash
User Authentication: Secure login system that ensures users access protected routes and functionalities only after authentication.
   User Signed in -Specific Routes:
        /create-post: Allows users to create discussion posts.
        /account: Displays user-specific information and allows them to manage their content.
        /update-post: Enables users to update their previously published posts.
        /user/:username: Provides access to individual user profiles, showcasing posts and activities.
        Commenting system: Users can add comments on articles and discussion posts to engage with the community.

  Admin-Only Functionality
        Admin-Specific Routes:
        /create-article: Allows admins to publish articles related to Valorant tournaments or community news.
        /account: Admins can view a list of all users and published articles.

User Management:
Admins can add new admins to the platform, ensuring secure delegation of privileges.
Admins have the authority to delete any user profile.

ADMIN LOGIN DETAILS -
email - r@g2.com
password - rahul123
```
