const express = require('express')
const app = express()
const path = require('path');


require('dotenv').config()

const root = path.join(__dirname, 'client', 'build')
app.use(express.static(root));
app.set('trust proxy', 1);

app.get("*", (req, res) => {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0"); // HTTP 1.1.
    res.header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
    // res.set("Cache-Control", "no-cache, no-store, must-revalidate, proxy-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT"); // Proxies.
    res.sendFile('index.html', { root });
})



const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log("Running on port " + port)
})


