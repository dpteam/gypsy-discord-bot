const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Вошла в систему как ${client.user.tag}!\nЯ готова!\nСписок команд:\n1. nazar\n2. cycle\n3. embed\n4. api\n5. ping\n6. vps\n7. welcome`);;

  client.user.setActivity('madamnazar.io');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  console.log(message.content);

  const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
		let reply = `Вы не указали никаких аргументов, ${message.author}!`;

		if (command.usage) {
			reply += `\nПравильное использование было бы так: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
  
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('при попытке выполнить эту команду произошла ошибка!');
  }
});

client.login(token);