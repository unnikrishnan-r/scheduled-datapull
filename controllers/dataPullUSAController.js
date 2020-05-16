const db = require("../models");
const axios = require("axios").default;

module.exports = {
  pullData: function (req, res) {
    console.log("Going to call API");
    axios
      .get("http://covidtracking.com/api/us")
      .then(function (response) {
        let nationalCurrent = {};
        let nationalData = response.data[0];
        nationalCurrent.confirmed = nationalData.positive;
        nationalCurrent.active = nationalData.positive - nationalData.recovered;
        nationalCurrent.recovered = nationalData.recovered;
        nationalCurrent.tested = nationalData.tested;
        db.National_Current.create(nationalCurrent)
          .then((dbModel) => res.json(dbModel))
          .catch((err) => {
            console.log(err.parent);
            res.status(400).json(err.parent.errno);
          });
      })
      .catch(function (error) {
        console.error(error);
        res.send("Error");
      });
  },
};
