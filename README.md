# Slurp

Slurp is the perfect way to find the best Ramen in your area and is inspired by [Yelp](https://yelp.com).

Website: [https://jrusso-slurp.herokuapp.com/](https://jrusso-slurp.herokuapp.com/)

## Technologies Used

- JavaScript
- Express
- CSS
- BCrypt
- Heroku
- Sequelize
- PostgreSQL
- React
- Redux

## Installation

In the root directory, run `npm install` to install dependencies for both the front and backend

### Development

_Ensure PostgreSQL is installed and running_

1. Create a database user with `CREATEDB` privledges.
2. Copy `backend/.env.example` to `backend/.env` and configure the database information with the user created in step 1.
3. Set up the database:
   1. Run `npm run sequelize db:create`
   2. Run `npm run sequelize db:migrate`
   3. Run `npm run sequelize db:seed:all`
4. Start the development servers:
   1. Run `npm run dev:backend`
   2. Run `npm run dev:frontend`

### Deployment

1. Configure `JWT_EXPIRES_IN` and `JWT_SECRET` environment variables
2. Deploy to heroku
3. Migrate & seed database
   1. Run `npm run sequelize db:migrate`
   2. Run `npm run sequelize db:seed:all`

## Documentation Links

- [Database Schema](https://github.com/justinrusso/Slurp/wiki/Database-Schema)
- [Features](https://github.com/justinrusso/Slurp/wiki/Features)
