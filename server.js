// Express Dependency
const express = require('express');

// Express config
const app = express();

// Setting the port
const PORT = process.env.PORT || 3000;

// Sets Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up use of the public folder
app.use('/static', express.static('public'));

// API and HTML route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Listener to start server
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});


