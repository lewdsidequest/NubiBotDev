require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mini_server = require('./mini_server');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.on('ready', (c) => {
  console.log(`The bot:${c.user.tag} is online.`);
});

client.on('messageCreate', (msg) => {
  //custom emoji usar \:emoji: en discord y copiar resultado -> <:happy_sally:1158282208793083996>
  //regular emoji pegar emoji en string

  //const channelList = [];
  if (msg.content.includes('-rate')) {
    msg.react('👍');
    msg.react('👌');
    msg.react('😳');
    msg.react('🥵');
    msg.react('<:cum_drops:1162994388713087069>');
  }

  if (msg.content.includes(nubId)) {
    let q = false; //si ya hay una coincidencia con mas prioridad ignora el resto arriba-abajo

    if (!q && (msg.content.includes('ola puta') || msg.content.includes('hola puta'))) {
      msg.reply('https://i.imgur.com/4ODjAJ9.jpg');
      q = true;
    }

    if (!q && (msg.content.includes('hola') || msg.content.includes('ola'))) {
      msg.reply('https://media.tenor.com/xI8X94Z_emgAAAAi/puppy-dog.gif');
      q = true;
    }
  }
});

const mySecret = process.env['TOKEN']
const nubId = process.env['NID']
client.login(mySecret);