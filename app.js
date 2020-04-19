const Discord = require('discord.js');
const bot = new Discord.Client();

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;

const prefix = '!';

bot.on('message', (message) => {
  let args = message.content.substring(prefix.length).split(' ');

  switch (args[0]) {
    case 'clear':
      if (!args[1])
        return message.reply(
          'Du måste ange en siffra mellan 1-100 (t.ex. !clear 20)'
        );
      message.channel.bulkDelete(args[1]);
      break;
    case 'kick':
      if (!args[1])
        message.channel.send('Du måste skriva vilken person du vill kicka');

      const user = message.mentions.users.first();

      if (user) {
        const member = message.guild.member(user);

        if (member) {
          member
            .kick('Du blev kickad för')
            .then(() => {
              message.reply(`${user.tag} blev kickad`);
            })
            .catch((error) => {
              message.reply('Lyckades inte kicka användaren');
              console.log(error);
            });
        } else {
          message.reply('Den användaren existerar inte i den här kanalen');
        }
      }
      break;
  }
});

bot.login(token);
