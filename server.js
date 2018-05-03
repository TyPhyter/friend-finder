const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'app/public')));
app.use('/survey', express.static(path.join(__dirname, 'app/public')));

const apiRoutes = require('./app/routing/apiRoutes.js');
const htmlRoutes = require('./app/routing/htmlRoutes.js');
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});