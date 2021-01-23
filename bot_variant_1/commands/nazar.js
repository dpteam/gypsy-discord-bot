const fetch = require("node-fetch");
const { Attachment, RichEmbed } = require("discord.js");
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatDateTweet = date => {
  let newDate = date.toDateString().slice(4);
  newDate.substring(0, date.length - 5);

  return newDate.substring(0, newDate.length - 5);
};

const getCycleDay = () => {
  let dayCycle;
  let weekDay = new Date().getUTCDay();
  switch (weekDay) {
    case 2: //tuesday
    case 4: //thursday
    case 6: //saturday
      dayCycle = 1;
      break;

    case 0: //sunday
    case 3: //wednesday
      dayCycle = 2;
      break;

    case 1: //monday
    case 5: //friday
      dayCycle = 3;
      break;
    default:
      dayCycle = undefined;
      break;
  }
  return dayCycle;
};

const getColor = day => {
  let color;
  switch (day) {
    case 1:
      color = 0x2e97d1;
      break;
    case 2:
      color = 0xe88024;
      break;
    case 3:
      color = 0xc536ab;
      break;
    default:
      return false;
  }
  return color;
};

module.exports = {
  name: "nazar",
  description: "Ответ с местонахождением Мадам Назар",
  execute(message, args) {
    fetch(
      "https://madam-nazar-location-api.herokuapp.com/location/current"
    ).then(function(response) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response
          .json()
          .then(function(json) {
            const botAnswer = `🔎 В регионе **${capitalize(
              json.data.location.region.precise
            )}**, на территории **${capitalize(
              json.data.location.region.name
            )}**.`;

            const embed = new RichEmbed()
              .setTitle(`🚩 Мадам Назар была найдена!`)
              .setURL("https://madamnazar.io/")
              .addField("Цикл/День", getCycleDay(), true)
              .addField("🗓 Сегодня ", `${formatDateTweet(new Date())}`, true)
              .setColor(getColor(getCycleDay()))
              .setImage(json.data.location.image)
              .setDescription(botAnswer)
              .setTimestamp()
              .setFooter(
                "🔮 𝕭ы 𝖊щ𝖊 𝕳𝖊 𝖈ли𝖜𝖐𝖔𝕸 т𝖆и𝕳𝖈т𝖇𝖊𝕳𝕳ы для 𝕸𝖔𝖊г𝖔 𝖈𝖐𝖕𝖔𝕸𝕳𝖔г𝖔 𝖔бщ𝖊𝖈т𝖇𝖆"
              );
            message.channel.send(embed);
          })
          .catch(err => {
            console.log(err);
            message.channel.send(`⚠️ Возникла проблема: **${err}**`);
          });
      } else {
        message.channel.send(
          "No JSON found! Please contact @iamfabriceg#6920 or @LukyVj#1181"
        );
      }
    });
  }
};