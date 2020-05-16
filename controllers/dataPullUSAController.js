const db = require("../models");
var Sequelize = require("sequelize");
const axios = require("axios").default;

module.exports = {
  pullData: function (req, res) {
    console.log("Going to call API")
    axios
      .get("http://covidtracking.com/api/us")
      .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch(function (error) {
        console.error(error);
        res.send("Error")
      });
  },
};
