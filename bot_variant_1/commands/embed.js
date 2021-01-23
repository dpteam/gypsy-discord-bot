// at the top of your file
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'embed-test',
	description: 'Embed test fo madamnazar.io',
	execute(message, args) {
    // inside a command, event listener, etc.
    const test = new RichEmbed()
      .setColor('#f30b03')
      .setTitle('Какой-то заголовок')
      .setURL('https://madamnazar.io/')
      .setAuthor('Какое-то имя', 'https://pbs.twimg.com/profile_images/1182324129296506880/gBjY7ch-_400x400.jpg', 'https://madamnazar.io/')
      .setDescription('Какое-то описание')
      .setThumbnail('https://pbs.twimg.com/profile_images/1182324129296506880/gBjY7ch-_400x400.jpg')
      .addField('Обычный заголовок поля', 'Какое-то значение здесь')
      .addBlankField()
      .addField('Заголовок встроенного поля', 'Какое-то значение здесь', true)
      .addField('Заголовок встроенного поля', 'Какое-то значение здесь', true)
      .addField('Заголовок встроенного поля', 'Какое-то значение здесь', true)
      .setImage('https://pbs.twimg.com/profile_images/1182324129296506880/gBjY7ch-_400x400.jpg')
      .setTimestamp()
      .setFooter('Немного текста нижнего колонтитула здесь', 'https://pbs.twimg.com/profile_images/1182324129296506880/gBjY7ch-_400x400.jpg');

    message.channel.send(test);   
	}
};