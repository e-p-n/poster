const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    //secret: process.env.SESS_SECRET,
    secret: 'ihfkh hgfdjd d76==',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    expires: new Date(Date.now() + (2 * 60 *60 * 1000)),
    store: new SequelizeStore({
        db: sequelize
    })
};


const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});