const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '19', 'views'));

routes.initialize(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});