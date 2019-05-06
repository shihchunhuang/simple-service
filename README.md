# simple-service
Incrementing integers as a service

Thank you for using this web application.


START
___________________________________________________________________________

Please clone the project to your local.

in the directory of where you clone your project, run the following command:

npm install
npm install express
npm install nodemon

After the commands above, you should be able to use command nodemon to run the application.

Please go to browser and type on the URL section: localhost:9000.

You will see the application is running on localhost:9000.



LOGISTICS
___________________________________________________________________________

1. An accounts.json is saved in the project for the storage of users and their current number

2. A simple UI in Jade is created

3. Because I decided to use Jade as UI, I worked around the headers by passing token with each request as a query. If you prefer not using UI, please go to verifyToken function in service.js to uncomment out a line of code for Postman and comment out the code for Jade UI. I display the token on purpose for the use on endpoint tool like Postman.



Limitation and future improvements
____________________________________________________________________________

1. The input field for set current is not checked.

2. Navigate button after each service is called.

3. Somehow in Jade's form, method='PUT' is not working. I had to use GET to work around this issue given the limited time.

