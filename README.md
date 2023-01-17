
This application is a clone of Air-Bnb, the popular website that allows you to rent out a house for a short duration

The app allows user to create an account, allowing them to post their locations that they would like to rent out and leave reviews for places they don't own.  Users are able to look around the main page and look further into any of the locals.  In the future, this app will also allow users to book reservations.


The current list of features are:

User-based:
-Creating an account by setting up a unique email, username, and password.
-Being able to securely log in and out of your account using csrf protection.

Spot-Based:
-Adding a new spot to the app as long as you are logged in and the addcres hasn't been claimed by another user.
-Checking out the specfic details of a spot.  This can be done by those who are logged in or not.  Displays more info than is initially shown on the splash page.
-Editing any spot owned by the user to fix any mistakes that were made on creation or to raise/lower the price to stay.
-Deleting any spot owned by the user and removing it from the app.

Review-Based:
-Adding a review to any spot not belonging to the user AND that they haven't already left a review for.
-Reviews are displayed on the detailed page of a location.  All reviews for location can be brought up with a click of the review button.
-Deleting a review.  This removes it from the detailed spot page.  It also allows for a new review to be posted by the user for that spot.


For cloning and set-up:

-In the 'backend' folder, you will an env.example file.  This file contains the port number, database location, jwtToken information, and name of the schema.  This information can be changed but is not necessary.  Rename the file from '.env.example' to '.env' to allow it to be read.  You may also just create a new .env file and copy these contents into the new file.

-Open the console inside the 'backend' folder and type in 'npm install'.  This will install the dependencies need for the application to run.  Once the installation is complete, change directories into the 'frontend' folder and type in 'npm install' there as well.

-In the 'backend' folder, there are already migration, model, and seeder files ready to go but they WILL NOT be connected by default.  There are two ways to get them connected:

--1-- Open the console inside the 'backend' folder and type in 'npm run rebuild'.  This command will wipe out the current database and start the migration/seeding process.  This is the fastest way of seeding the application, and also works well in case you need to reset the application back to its starting information.  If you used to reset, this will wipe out any spots, reviews, and user accounts made by anyone.  It will then finish by launching the backend server.

--2-- Open the console inside the 'backend' folder and type in 'npx sequelize db:migrate'.  This set up models in the database.  After it's finished migrating, type in 'npx sequelize db:seed:all' to fill in the models.  This is the default data in the application.  From here you should be all set to launch the server by typing in 'npm start.  You can reset the data in the application by running 'sequelize db:seed:undo:all' and then 'sequelize db:migrate:undo'.  You will then need to run the first two commands again to repopulate the application.

-Open the console inside the 'frontend' folder and type in 'npm start'.  THAT'S IT!  The application will now be running on localhost:3000 and you can view any changes you make to the application there.


Some of the technologies used for this application:
-Node.js
-Express
-Sequelize
-Sqlite3
-React
-Redux
-Html5
-Css
-Git
-Javascript


To Get in Contact with Me (please don't)

-My LinkedIn : https://www.linkedin.com/in/scott-konner-0b38774a/
-My GitHub   : https://github.com/scottkonner
