## Authentication Microservice

![image](https://github.com/Zetsy-Store/zetsy-authentication/assets/102910615/7a2e7cf5-ccc6-44d4-a05d-498a46886e8a)

This is a Node.js microservice for handling user authentication in a web application. It provides endpoints for user registration, login, and logout, as well as protected routes that require a valid authentication token to access.

### Features
* User registration
* User login and logout
* Authentication token generation and verification
* Protected routes that require authentication
* Password hashing and salting for secure storage
* CORS and helmet middleware for basic security measures

### Installation
1. Clone the repository: git clone https://github.com/Zetsy-Store/zetsy-node.git
2. Install dependencies: `npm install` or `yarn install`
3. Create a .env file with the following variables:
   * **PORT**: the port number to run the server on
   * **DATABASE_URL**: the URL of your database
   * **SECRET_KEY**: a secret key for generating authentication tokens
4. Start the server: `npm start` or `yarn start` or `bun run start`

### Usage
#### User Registration
To register a new user, make a POST request to /api/register with the following JSON data:
```
{
  "username": "exampleuser",
  "password": "examplepassword"
}
```

The response will contain the user ID and an authentication token:
```
{
  "user_id": "123",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Xs3qCpq7aWcqLf8fyv7PQcQEkz74MnWkT8Yv7rPCnNk"
}

```

#### User Login
To log in a user, make a POST request to /api/login with the same JSON data as for user registration. The response will contain an authentication token:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Xs3qCpq7aWcqLf8fyv7PQcQEkz74MnWkT8Yv7rPCnNk"
}
```

#### Protected Routes
To access a protected route, include the authentication token in the Authorization header of the request:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Xs3qCpq7aWcqLf8fyv7PQcQEkz74MnWkT8Yv7rPCnNk
```

If the token is valid, the protected data will be returned. Otherwise, a 401 Unauthorized response will be sent.

#### User Logout
To log out a user, make a POST request to /api/logout with the authentication token in the Authorization header.

---

### Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
