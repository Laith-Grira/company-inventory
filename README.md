# Company Inventory: Shopify Challenge Summer 2022

&nbsp;
## Overview
Welcome to my attempt in the Shopify Summer 2022 challenge. <br/>
In this project, I have created a Web application for the Shopify Inventory for tech equipments. <br/>
Those equipments are stored as **Item**. Each Item have a name, a price, and a count (number stored in the inventory). <br/>
When the user launches the application, a home page appears, containing some description and a table of all items stored in the inventory. <br/>
By clicking on the **NEW** button in the home page, the user will be redirected to the **create item** page, where he/she will be able to create a new item by inserting the name, price, and count. <br/>
In the home page, the user can click on the **Edit** button (next to the item) to be able to change any of the three properties of the item (user will be redirected to the **Edit item** page to perform this task). <br/>
When users wish to delete an item, they can use the **Delete** button. <br/>
Feature chosen: a search bar to filter items by name.

&nbsp;
## Technologies used
- NodeJS
- ExpressJS
- MongoDB
- ReactJS
- Docker

&nbsp;
## Set up
To set up the project in your local machine:
- Install NodeJs in your machine.
- Install Git.
- Install Docker.
- Clone this repository URL, and under your terminal type `git clone <the-cloned-url>`
- Under the root folder, navigate to /client folder and run `npm install`to install the front-end dependencies.
- Navigate back to the root folder, and run 'docker-compose up'
- After the backend launches, open a new terminal and in the root folder start the web application using `npm run client`
- A web page should be open, if not, type http://localhost:3000 in your browser <br />

&nbsp;
N.B: since there is no existent data in your docker volumes under your machine, you will see that the table of items in the web app is empty, try to create some items and head back to the main page to see those items visible in the table of items, here is what the table should look like when you have some items:
![image](https://user-images.githubusercontent.com/59850587/149869977-3e77fd7b-036d-44ef-8bab-44b0360b23bd.png)


&nbsp;
## Test
This project contains some integration tests for /items endpoint, for each of the GET/POST/PATCH/DELETE requests. <br/>
To run the tests, under the root folder, run the command `npm test`.
![image](https://user-images.githubusercontent.com/59850587/149631834-e8112bc1-6bbc-4ec7-8e55-b86b7f9c55b2.png)

