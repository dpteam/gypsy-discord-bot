module.exports = {
	name: 'vps',
	description: 'первая команда на vps',
	execute(message, args) {
		message.channel.send('Бот Цыганка - автоматическая перезагрузка VPS');
	},
};