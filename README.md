## Authentication service for Sign up component

Flow:
1. User signs up
2. App subscribes and communicates with backend (i.e., Express server)
3. If sign up successful, app redirects to the Sign in component and opens the snackbar

Files changed: `database.sql`, `server.js`, `styles.scss`, `app.module.ts`, `app-routing.module.ts`, `sign-up.component.ts`, `sign-up.component.html`, `auth.service.ts`

*Note 1: `id` column is the primary key now (not `email`)*

*Note 2: Added error messages for better UX*

---

## Setup

1. Clone the repo: `git clone https://github.com/cervus-camelopardalis/angular-auth-signup.git`
2. Create PostgreSQL database (see `database.sql` file)
3. Insert your database user and password (edit `db.js` file)
4. Install Express modules: `C:\Users\xxxxx\xxxxx\xxxxx\express-server>npm i`
5. Install Angular modules: `C:\Users\xxxxx\xxxxx\xxxxx\angular-client>npm i`
6. Start Express server: `C:\Users\xxxxx\xxxxx\xxxxx\express-server>nodemon server`
7. Run Angular app: `C:\Users\xxxxx\xxxxx\xxxxx\angular-client>ng serve -o`

---

## Screenshots

Flow:

![Flow](https://github.com/cervus-camelopardalis/angular-auth-signup/blob/main/01-screenshot-flow.gif)

Data inserted successfully:

![Success](https://github.com/cervus-camelopardalis/angular-auth-signup/blob/main/02-screenshot-psql.png?raw=true)

Error messages:

![Errors](https://github.com/cervus-camelopardalis/angular-auth-signup/blob/main/03-screenshot-errors.gif)