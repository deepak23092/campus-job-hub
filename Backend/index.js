const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/jobs/', require('./routes/jobRoutes'));
app.use('/company/', require('./routes/companyRoutes'));

app.get("/", async (req, res) => {
    res.send("server");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
})