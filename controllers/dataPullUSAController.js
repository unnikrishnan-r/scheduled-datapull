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
        nationalCurrent.id = 1;
        nationalCurrent.confirmed = nationalData.positive;
        nationalCurrent.active = nationalData.positive - nationalData.recovered;
        nationalCurrent.recovered = nationalData.recovered;
        nationalCurrent.deceased = nationalData.death;
        nationalCurrent.tested = nationalData.tested;
        db.National_Current.upsert(nationalCurrent)
          .then((dbModel) =>
            dbModel
              ? res.status(200).json("Inserted")
              : res.status(200).json("Updated")
          )
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
