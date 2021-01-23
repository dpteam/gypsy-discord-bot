const fetch = require("node-fetch");

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const formatDateTweet = date => {
  let newDate = date.toDateString().slice(4);
  newDate.substring(0, date.length - 5);

  return newDate.substring(0, newDate.length - 5);
};

module.exports = {
  name: "findnazar",
  description: "Respond with Madam Nazar location",
  execute(message, args) {
    fetch(
      "https://madam-nazar-location-api.herokuapp.com/location/current"
    ).then(function(response) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          console.log(json.data.location.image);
          const botAnswer = `🚩 Сегоднф ${formatDateTweet(
            new Date()
          )} 📅, Мадам Назар была найдена в районе **${capitalize(
            json.data.location.region.precise
          )}** в **${capitalize(json.data.location.region.name)}** territory ${
            json.data.location.image
          }`;
              message.channel.send(botAnswer);

        });
      } else {
        console.log("Ой, у нас нет JSON!");
      }
    });
  }
};
