import "dotenv/config.js";
import { Client, IntentsBitField } from "discord.js";
import mini_server from "./mini_server.js";
import { getRandomE6Post } from "./api/e6requests.js";
import { getRandomR34Post } from "./api/r34requests.js";

const usersMap = new Map();
const LIMIT = 2;
const MAXDIFF = 5000;
const TIME = 6000;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.on("ready", (c) => {
  console.log(`The bot: ${c.user.tag} is online.`);
});

client.on("messageCreate", async (msg) => {
  //regular emoji pegar emoji en string
  const member = await msg.member;
  const nubiID = "1158250135134949427";
  const chBotComandos = "1148505392964436089";
  const chBotNsfw = "1253983412004323358";
  const chTempKinky = "1253978439745277962";
  const rolInmune = "<@&1235824421608882196>";

  // TODO: actualizar lista de comandos conforme se cambien/agreguen nuevos
  const commandPool = [
    "-rate",
    "-lsqwaifu",
    "-kom",
    "-tetotas",
    "-chaparra",
    "-eatonwaifu",
    "-sarlocwaifu",
    "-owo",
    "-ferwaifu",
    "-sex",
    "-bj",
    "-cum",
    "-yuri",
    "-feralf7",
  ];
  //! Evitar avanzar al eliminar un mensaje (eliminar mensajes no tiene msg.member)
  if (member) {
    if (member.id === nubiID) return;
  } else {
    return;
  }
  const mRoles = member.roles.cache.map((r) => `${r}`);

  if (msg.content.includes("-rate")) {
    msg.react("👍");
    msg.react("👌");
    msg.react("😳");
    msg.react("🥵");
    msg.react("<:cum_drops:1162994388713087069>");
  }
  /*
   *Si el mensaje tiene un comando de la lista entonces guardar datos temporales de usuarios para comprobar SPAM
   */
  const txt = msg.content.toLowerCase();
  if (commandPool.includes(txt)) {
    //!! SPAM CHECK
    if (usersMap.has(msg.member.id)) {
      const userData = usersMap.get(msg.member.id);
      const { lastMessage, timer } = userData;
      const difference = msg.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      if (difference > MAXDIFF) {
        //restaurar usuario (quitar de la lista de recientes)
        //si el mensaje se envio luego de MAXDIFF segundos entre mensajes
        clearTimeout(timer);
        // console.log("Cleared Timeout");
        userData.msgCount = 1;
        userData.lastMessage = msg;
        userData.timer = setTimeout(() => {
          usersMap.delete(msg.member.id);
          // console.log("Removed from map.");
        }, TIME);
        usersMap.set(msg.member.id, userData);
      } else {
        if (commandPool.includes(txt)) ++msgCount;
        if (parseInt(msgCount) >= LIMIT && !mRoles.includes(rolInmune)) {
          //penalizacion/aviso por limite
          msg.reply(":warning: Aviso: Tomate unos segundos entre comandos.");
          userData.msgCount = LIMIT;
          // msg.channel.bulkDelete(LIMIT);
          console.log("Avisado de spam");
        } else {
          userData.msgCount = msgCount;
          usersMap.set(msg.member.id, userData);
        }
      }
    } else {
      let fn = setTimeout(() => {
        //restaurar usuario (quitar de la lista de recientes)
        // Si el timeout acaba
        usersMap.delete(msg.member.id);
        // console.log("Removed from map.");
      }, TIME);
      usersMap.set(msg.member.id, {
        msgCount: 1,
        lastMessage: msg,
        timer: fn,
      });
    }
  } else {
    // * IMPORTANTE: Si el mensaje no tiene un comando de la lista, no pasa de aqui
    // console.log("HERE");
    return;
  }

  // custom e6 random img
  const e6blacklist = ` -baby -gore -feces -scatplay -vore -fart -fart_fetish -diaper -andromorph -maleherm -gender_transformation -macro -hyper_belly -pregnant -humiliation -degradation -food -rape -feral -young -loli -shota -toddler`; //blacklist para todo lo main
  const e6lsqBlacklist = ` -rating:safe -baby -gore -feces -scatplay -vore -fart -fart_fetish -diaper -andromorph -maleherm -gender_transformation -macro -hyper_belly -pregnant -humiliation -rape -toddler -male/male -intersex/male -male_penetrated -tentacles -big_anus`; //blacklist para lo nicho
  const r34blacklist = ` -cuntboy -gore -feces -scat -vore -fart -fart_fetish -diaper -andromorph -maleherm -gender_transformation -macro -hyper_belly -pregnant -humiliation -degradation -food -rape -feral -young -loli -shota -toddler -bestiality -zoophilia`; //blacklist para todo lo main
  // * Si el usuario ya alcanzo el limite de usos recientes entonces no pasa a menos que tenga el rol que lo hace inmune a esta regla.
  if (
    usersMap.get(msg.member.id).msgCount < LIMIT ||
    mRoles.includes(rolInmune)
  ) {
    if (
      txt.startsWith("-lsqwaifu") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "~meow_skulls_(fortnite) ~hariet_(mario) ~neco-arc ~amy_rose ~pinkie_pie_(mlp) ~princess_zelda ~blaze_the_cat ~lop_(star_wars_visions) ~yuumi_(lol) ~briar_(lol) ~neeko_(lol) ~betilla ~vex_(lol) score:>=75 rating:explicit" +
            e6blacklist,
          200
        )
      );
    } else if (
      msg.content.startsWith("-kom") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "kom_(komdog) ~female ~intersex score:>=50" + e6blacklist,
          100
        )
      );
    } else if (
      msg.content.startsWith("-tetotas") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "~big_breasts ~huge_breast female solo score:>=250" + e6blacklist,
          200
        )
      );
    } else if (
      msg.content.startsWith("-chaparra") &&
      msg.channelId === chTempKinky
    ) {
      msg.reply(
        await getRandomE6Post(
          "big_breasts ~huge_breasts -intersex ~oppai_loli young female score:>=78 -hyper -young_male -younger_male -smaller_male -shota -flat_chested -small_breasts -bestiality" +
            e6lsqBlacklist,
          200
        )
      );
    } else if (
      txt.startsWith("-eatonwaifu") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "~judy_hopps ~nikki_(saucy) ~denisse ~katrina_fowler ~ginger_(jaeh) ~cherry_(animal_crossing) ~pinkie_pie_(mlp) ~fiona_fawnbags_(dullvivid) ~tits_(lysergide) ~lillia_(lol) ~charizard ~michiru_kagemori ~fluttershy_(mlp) big_breasts female -intersex score:>=50" +
            e6blacklist,
          200
        )
      );
    } else if (
      msg.content.startsWith("-sarlocwaifu") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomR34Post(
          "( raven_(dc) ~ gwen_tennyson ~ lord_dominator ~ loona_(helluva_boss) ~ rebecca_(edgerunners) ~ azula ~ nadia_fortune ~ elastigirl ~ matoi_ryuuko ~ catra ~ rose_the_cat ) female -rating:safe -flat_chested -futanari -small_breasts score:>=100" +
            r34blacklist,
          200
        )
      );
    } else if (
      msg.content.startsWith("-owo") &&
      msg.channelId === chTempKinky
    ) {
      msg.reply(
        await getRandomE6Post(
          "~intersex ~intersex/female score:>=250 -intersex/male -male_penetrated -intersex_penetrating_male score:>=200" +
            e6blacklist,
          100
        )
      );
    } else if (
      msg.content.startsWith("-ferwaifu") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomR34Post(
          "( mirko ~ kitagawa_marin ~ blackfire ~ morgana ~ chun-li ~ tatsumaki ~ mitaka_asa ~ bulma_briefs ~ tsuyu_asui ) female -rating:safe -flat_chested -futanari -dickgirl -small_breasts score:>=100" +
            r34blacklist,
          200
        )
      );
    } else if (
      msg.content.startsWith("-sex") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "male/female female_penetrated score:>=350" + e6blacklist,
          100
        )
      );
    } else if (
      msg.content.startsWith("-bj") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "fellatio male/female score:>=200 -female_penetrated" + e6blacklist,
          100
        )
      );
    } else if (
      msg.content.startsWith("-cum") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "~cum_in_pussy ~cum_in_mouth ~cum_on_breasts ~cum_on_face type:gif ejaculation female score:>=400 -solo -cum_on_self -male/male -intersex" +
            e6blacklist,
          200
        )
      );
    } else if (
      msg.content.startsWith("-yuri") &&
      (msg.channelId === chBotNsfw ||
        msg.channelId === chBotComandos ||
        msg.channelId === chTempKinky)
    ) {
      msg.reply(
        await getRandomE6Post(
          "female/female rating:explicit score:>=150" + e6blacklist,
          100
        )
      );
    } else if (
      msg.content.startsWith("-feralf7") &&
      msg.channelId === chTempKinky
    ) {
      msg.reply(
        await getRandomE6Post(
          "feral female score:>=350 -young" + e6lsqBlacklist,
          200
        )
      );
    }
  }

  if (msg.content.includes(nubId)) {
    if (msg.content.includes("puta")) {
      msg.reply("https://i.imgur.com/4ODjAJ9.jpg");
    } else if (msg.content.includes("hola") || msg.content.includes("ola")) {
      msg.reply("https://media.tenor.com/xI8X94Z_emgAAAAi/puppy-dog.gif");
    }
  }
});

const mySecret = process.env.TOKEN;
const nubId = process.env.NID;
console.log(mySecret);
client.login(mySecret);
