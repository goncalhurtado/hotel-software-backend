# Hotel Software Management System Backend

This software provides a comprehensive solution for managing hotel information, handling user reservations, checking room availability, and facilitating communication between users and the hotel. Additionally, it offers full CRUD functionality for administrative tasks.
Check out the  [Frontend repository](https://github.com/goncalhurtado/hotel-software) for more details.


## Installation

```
git clone https://github.com/goncalhurtado/hotel-software-backend
cd hotel-software-backend
npm install
```

### Start the API

```
npm run dev
```

### Configure Database Connection
Set up the database connection by adding the connection URL to the .env file. Use the following URL template, replacing `username`, `password`, and `dbName` with your MongoDB credentials. 
Also, include the cluster name from your MongoDB database.

> [!TIP]
> You can check the [example.env](example.env) file for more information.

## Routes

#### Admin Routes
- `GET /admins` - Retrieve all admins (Authenticated)
- `POST /register` - Register a new admin (Authenticated)
- `DELETE /admin/:id` - Delete admin by ID (Authenticated)
- `GET /admin/:id` - Retrieve admin by ID
- `POST /login` - Admin login

#### Booking Routes
- `GET /bookings/all` - Retrieve all bookings (Authenticated)
- `GET /bookings/upcoming` - Retrieve upcoming bookings (Authenticated)
- `GET /bookings/past` - Retrieve past bookings (Authenticated)
- `GET /bookings/current` - Retrieve current bookings (Authenticated)
- `POST /booking` - Create a new booking
- `PUT /booking/:id` - Update booking by ID (Authenticated)
- `DELETE /booking/:id` - Delete booking by ID (Authenticated)
- `GET /booking/reports` - Get booking reports (Authenticated)

#### Search Routes
- `GET /bookings/search` - Search available bookings

#### Category Routes
- `POST /category` - Create a new category (Authenticated)
- `DELETE /category/:id` - Delete category by ID (Authenticated)
- `GET /category/:id` - Retrieve category by ID
- `GET /categories` - Retrieve all categories
- `PUT /category/:id` - Update category by ID (Authenticated)

#### Room Routes
- `POST /room` - Create a new room (Authenticated)
- `PUT /room/:id` - Update room by ID (Authenticated)
- `GET /room/:id` - Retrieve room by ID
- `GET /rooms` - Retrieve all rooms
- `GET /rooms/:categoryId` - Retrieve rooms by category ID (Authenticated)
- `DELETE /room/:id` - Delete room by ID (Authenticated)

#### Contact Routes
- `POST /contact` - Post a new contact
- `GET /admin/contacts/all` - Retrieve all contacts (Authenticated)
- `GET /admin/contacts/pending` - Retrieve pending contacts (Authenticated)
- `GET /admin/contacts/pending/reports` - Get pending contact reports (Authenticated)
- `PUT /admin/contacts/pending/:id` - Set contact as pending (Authenticated)
- `GET /admin/contacts/answered` - Retrieve answered contacts (Authenticated)
- `PUT /admin/contacts/answered/:id` - Set contact as answered (Authenticated)
- `DELETE /admin/contacts/:id` - Delete contact by ID (Authenticated)

#### Email Response Routes
- `POST /admin/contacts/response` - Respond to a contact (Authenticated)

## Main Technologies

### Main Back-End Framework
- NodeJS

### Additional Frameworks and Implementations

- [**Express**](https://expressjs.com/es/): Fast, minimalist, and flexible web infrastructure for Node.js. 
- [**nodemon**](https://nodemon.io/): Automatically updates your Node server when you make changes to any file.
- [**Bcrypt**](https://www.npmjs.com/package/bcryptjs): Library for encryption.
- [**JWT**](https://jwt.io/): Used for generating authentication tokens.
- [**Mongoose**](https://mongoosejs.com/): Object modeling tool for MongoDB in Node.js.
- [**morgan**](https://www.npmjs.com/package/morgan): Middleware for HTTP request logging in Node.js.
- [**passport**](https://www.passportjs.org/): Used for implementing authentications in Node.js.
- [**dotenv**](https://www.npmjs.com/package/dotenv): Management of environment variables.
- [**cors**](https://www.npmjs.com/package/cors): HTTP access control.
- [**multer**](https://www.npmjs.com/package/multer): File handling in NodeJS.

### Database

- [**MongoDB Atlas**](https://www.mongodb.com/atlas/database): Cloud platform for MongoDB databases.

## Deploy on Netlify
* [**Hotel Goncal**](https://hotel-goncal.netlify.app/)

## Autor
Goncal Hurtado [![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://goncalhurtado.netlify.app/) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/goncalhurtado/)
