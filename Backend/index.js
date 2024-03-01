const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.DB_HOST;

app.use(bodyParser.json());

app.use(cors({
    origin: 'https://campus-job-hub.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, auth-Token'
}));

app.get("/", async (req, res) => {
    res.send("server");
})

app.use('/jobs/', require('./routes/jobRoutes'));
app.use('/company/', require('./routes/companyRoutes'));


app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})