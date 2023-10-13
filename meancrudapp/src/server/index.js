const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dbConnect = require('./db.js');
const emproutes = require('./router.js');

app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use('/api/employee', emproutes);

dbConnect().then(() => {
    console.log('DB connected successfully!!');
})
.catch((err) => {
    console.log(`DB connection error due to ${err}`);
});

app.listen(PORT, () => {
    console.log(`Server is running in the port ${PORT}`);
});
