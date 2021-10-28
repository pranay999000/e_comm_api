const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express()
app.use(express.json())

let data = fs.readdirSync(path.join(__dirname, 'routes'))
data = data.filter((el) => {
    let apiName = el.replace('.js', '')
    let dir = path.join(__dirname, 'routes', el)
    app.use(`/api/v1/${apiName}`, require(dir))
})

module.exports = app
