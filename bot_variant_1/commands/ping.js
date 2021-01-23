module.exports = {
	name: 'ping',
	description: 'Пинг!',
	execute(message, args) {
		message.channel.send('Да тут я, тут...');
	},
};