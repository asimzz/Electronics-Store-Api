# E-commerce api using Node.js
The api built using Node.js and Express.js and MongoDB.

The api not finish yet just The  Authentication functionality and CRUD Operation of the Product & Reviews models are implemented, all the routes are fully protected.

The Data was collected manually from [Amazon] 

## Check The Documentation

The Documentation was created with help of Postman check the documentation with examples [here](https://documenter.getpostman.com/view/11336818/TVCY6XZi)

## Main features

- Searching was done using MongoDB Atlas Search(The $search Aggregation Pipeline Stage) for more info check the documentation with examples [here](https://docs.atlas.mongodb.com/reference/atlas-search/query-syntax/)
- The concept of middleware was used heavily in this project.

## What left to implement??

- The CRUD Operation of Order,CartItems,Shipping models.
- Forgot Password & sending verification emails functionalities.
- Sending emails when the product delivered successfully.
- Upload user photo.

all these and more will implemented unitl the next commit.

## Install Packages

```
npm install
```

## Run App

```
# Run in dev mode

npm run dev


# Run in prod mode

npm start
```

## Database Seeder

To seed the database with users, products, and reviews with data from the "\_data" folder, run


```
# Destroy all data

node seeder -d


# Import all data

node seeder -i
```

- Author: Asim Abdalla


