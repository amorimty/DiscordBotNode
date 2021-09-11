require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });



client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
			
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// 1º Identificar se a mensagem fetched é a mensagem dos cargos (faça a identificação como quiser)
	// 2º Caso seja, identificar se a reação é uma das 3 definidas (colocá-las num array)
	// 3º Identificada a reação, dar o cargo
	
	if (reaction.message.id === '834149991445954641') {
		const array = ['📘', '📙', '📕', '🐌', '🐙', 'shades_smile', 'csyes', 'usp', 'camisa10', 'Cpepe'];
		const roles = [
			'834153649050878023', 
			'834153738028711967', 
			'834153796594565130', 
			'687051964940419087', 
			'687051522932211782', 
			'679113777156980757',
			'729790498570502164',
			'755602787043246140',
			'752651872086524017',
			'767752950021750854'
		];
		// roles: t1, t2, t3, calourx, veteranx, parsas, bcc, USP, valorant, among us
		const guildUser = reaction.message.guild.members.cache.get(user.id);

		if(array.includes(reaction.emoji.name)){
			if(!guildUser.roles.cache.get(roles[array.indexOf(reaction.emoji.name)]))
			{
				console.log(`usuário: ${user.tag} recebeu o cargo ${roles[array.indexOf(reaction.emoji.name)]}`);
				guildUser.roles.add(roles[array.indexOf(reaction.emoji.name)]);
			}
		}
	}


});

client.login('BOT_TOKEN');
