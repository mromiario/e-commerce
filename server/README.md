# e-commerce

Routes
---
Access : http://localhost:3000/api

Bellows are routes that used in the sever **products**

- base routes PRODUCTS url : http://localhost:3000/api/products

    - GET : /
        - description : get all products 
        - body : none
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 

                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

    - GET : /:id
        - description : Get spesific product based on product id
        - body : none
        - Headers : none
        - params : ObjectId of product
        - Response :
            - Success :
                Status Code : 200
                ``` 
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
    - POST : /
        - description : add new product
        - body : 
            ```
            {
                name : String,
                stock : Number,
                price : Number,
                Shop : ObjectId
            }
            ```
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 

                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - DELETE : /:id
        - description : delete spesific product based on id
        - body : none
        - params : product ObjectId
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data has been deleted"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
    - PATCH : /:id
        - description : update data of a product
        - body : data that may want to be updated
            ```
            {
                name : String,
                stock : Number,
                price : Number,
                Shop : ObjectId
            }
            ```
        - params : product ObjectId
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {
                    "message" : "data is updated"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```

                Status Code : 401
                ```
                {
                    "message": "Unauthorized user"
                }
                ```
                
- base routes USERS url : http://localhost:3000/api/users

    - POST : /
        - description : create a new user
        - body : 
            ```
                { 
                    name : String,
                    email : String,
                    password : String,
                    role : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 201
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"Muhammad Romi Ario Utomo",
                    "email":"mromiario@gmail.com",
                    "password":"$2a$10$KElSSENK14IoN4zsyY",
                    "role" : "admin"
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
     - GET : /
        - description : get data of user
        - body : none
        - Headers : JWT Token
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   "_id":"5d4fcfcfe892dd5c17e365c6",
                    "name":"Muhammad Romi Ario Utomo",
                    "email":"mromiario@gmail.com",
                    "role" : "admin"
                    "__v":0
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
    - POST : /login
        - description : login to the system
        - body : 
            ```
                { 
                    email : String,
                    password : String
                }
            ```
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
                Status Code : 404
                ```
                {"message" : "invalid username/password"}
                ```

    - POST : /googleLogin
        - description : login to the system using google
        - body : Google OAuth Token
        - Headers : none
        - Response :
            - Success :
                Status Code : 200
                ``` 
                {   
                    "token" : "hcsuacnsdhidzuSDHBGASVGAwdu"
                }
                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
- base routes CART url : http://localhost:3000/api/cart

    - POST : /
        - description :
        - body :
        - Headers : 
        - Response :
            - Success :
                Status Code : 200
                ``` 

                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```
        - DELETE : /
        - description :
        - body :
        - Headers : 
        - Response :
            - Success :
                Status Code : 200
                ``` 

                ```
            - Error :
                Status Code : 500
                ```
                {"message" : "Internal Server Error"}
                ```


Usage
----

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
    $ npm init -y
    $ npm install
    $ nodemon app.js
```

