# Shopify Back End Challenge Summer 2022

&nbsp;
## Overview
Welcome to my attempt in the Shopify Back End challenge. <br/>
In this project, I have created an Web application for the Shopify Inventory for tech equipments. <br/>
Those equipments are stored as **Item**. Each Item have a name, a price, and a count (number stored in the inventory). <br/>
When the user lauches the application, a home page appears, containing some description and a table of all items stored in the inventory. <br/>
By clicking on the **NEW** button in the home page, the user will be redirected to the **create item** page, where he/she will be able to create a new item by inserting the name, price, and count. <br/>
In the home page, the user can click on the **Edit** button (next to the item) to be able to change any of the three properties of the item (user will be redirected to the **Edit item** page to performe this task). <br/>
When users wish to delete an item, they can use the **Delete** button. <br/>
Feature choosen: a search bar to filter items by name.

&nbsp;
## Technologies used
- NodeJS
- ExpressJS
- MongoDB
- ReactJS

&nbsp;
## Set up
To set up the project in your locl machine:
- Make sure to have NodeJs (preferrably >= 16) and NPM installed in your machine.
- Make sure to have git installed.
- Clone this repository, and under your terminal type `git clone <the cloned url>`
- Under the /be-summer-2022 folder, run `npm install`to install the backend dependencies.
- Navigate to /client folder using `cd client`, and run `npm install` to install the frontend dependencies
- Head back to the /be-summer-2022 folder using `cd ..` , and run `npm run app` to start the application
- A web page should be open, if not, type http://localhost:3000 in your browser

&nbsp;
## Test
This project contains some unit tests for /items endpoint, for each of the GET/POST/PATCH/DELETE requests. <br/>
To run the tests, under the /be-summer-2022 folder, run the command `npm run test`
