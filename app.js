const fetch = require('node-fetch');

const Discord = require('discord.js');
const bot = new Discord.Client();

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.TOKEN;

const prefix = '!';

bot.on('message', (message) => {
  let args = message.content.substring(prefix.length).split(' ');
  const user = message.mentions.users.first();
  const member = message.guild.member(user);

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

      if (user) {
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
    case 'ban':
      if (!args[1])
        message.channel.send('Du måste skriva vilken person du vill banna');

      if (user) {
        if (member) {
          member
            .ban({
              reason:
                'Du blev bannad pga.. Ja inte vet jag, du var väl otrevlig',
            })
            .then(() => {
              message.reply(`${user.tag} blev bannad`);
            })
            .catch((error) => {
              message.reply('Lyckades inte banna användaren');
              console.log(error);
            });
        } else {
          message.reply('Den användaren existerar inte i den här kanalen');
        }
      }
      break;
  }
});

let msg = null;
const greeting = [
  'Hola!',
  'Nämen hallå!',
  'Mucho gusto!',
  'Ja hejhej!',
  'Tjenare!',
];

bot.on('message', (message) => {
  if (!message.author.bot) {
    if (message.content.toLowerCase() == 'hej') {
      msg = greeting[Math.floor(Math.random() * greeting.length)];
      message.reply(msg);
    }
  } else {
    return false;
  }
});

const url = 'https://covid19.mathdro.id/api/countries/sweden';

bot.on('message', (message) => {
  if (!message.author.bot) {
    if (
      message.content.toLowerCase() == 'corona' ||
      message.content.toLowerCase() == 'covid-19'
    ) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const { confirmed, deaths, recovered, lastUpdate } = data;

          const result = `
          Här är den senaste informationen gällande Corona i Sverige jag kunde hitta:
Antal drabbade: **${confirmed.value}**
Antal avlidna: **${deaths.value}**
Antal tillfrisknade: **${recovered.value}**
Information uppdaterad: **${new Date(lastUpdate).toDateString()}**
          `;

          message.channel.send(result);
        })
        .catch((error) => {
          console.log(error);
          return 'Kolla i konsolen efter error meddelande';
        });
    } else {
      return false;
    }
  }
});

bot.login(token);
