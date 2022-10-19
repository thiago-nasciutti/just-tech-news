//path module = provides utilities for working with file and directory paths
const path = require('path');
const express = require('express');
//express-handlebars = Template engine, allow you to write HTML code in a more familiar environment, leaving placeholders like {{ some_data }} for the data you want to be merged in.
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

//set-up template engine(handlebars)
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//express.static = built-in Express.js middleware function that takes all of the contents of the folder 'public' and serve them as static assets.  
// path = links to dir puclic 
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
