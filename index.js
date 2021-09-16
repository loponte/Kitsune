const DisTube = require("distube")
const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const client = new Discord.Client()
const fs = require("fs")
const config = require("./config.json")
const db = require("quick.db")
const Canvas = require('canvas')

let embed = new MessageEmbed()

client.config = require("./config.json")
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnEnd: false, leaveOnEmpty: false, leaveOnStop: false })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

client.distube.on("initQueue", queue => {
  queue.autoplay = false;
  queue.volume = 100;
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!")
  const jsFiles = files.filter(f => f.split(".").pop() === "js")
  if (jsFiles.length <= 0) return console.log("Could not find any commands!")
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  const activities = [
    `k!help para obter ajuda.`,
    `${client.guilds.cache.size} servidores.`,
    `${client.channels.cache.size} canais.`,
    `k!convite para me adicionar no seu servidor!`
  ];
  let i = 0;
  setInterval(() => {
    i += 1;
    if (i >= activities.length) { i = 0 }
    client.user.setActivity(`${activities[i]}`, {
      type: "PLAYING"
    });
  }, 10000);
  console.log(`Pronto em ${client.guilds.cache.size} servidores, para um total de ${client.users.cache.size} pessoas`);
})

client.on("message", async message => {
  embed.setAuthor('Mensagem de erro')
  embed.setDescription(`Você deve estar em um canal de voz!`)
  embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
  embed.setColor('#cc0000')

  const prefix = config.prefix
  if (!message.content.toLowerCase().startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    embed.setAuthor('Mensagem de erro')
    embed.setDescription(`Você deve estar em um canal de voz!`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#cc0000')
    return message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);

  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    embed.setAuthor('Mensagem de erro')
    embed.setDescription(e)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#cc0000')
    console.error(e)
    message.reply(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  }
})

client.on('voiceStateUpdate', (oldState, newState) => {

  // if nobody left the channel in question, return.
  if (oldState.channelID !== oldState.guild.me.voice.channelID || newState.channel)
    return;

  // otherwise, check how many people are in the channel now
  if (!(oldState.channel.members.size - 1))
    setTimeout(() => { // if 1 (you), wait five minutes
      if (!(oldState.channel.members.size - 1)) // if there's still 1 member, 
        oldState.channel.leave(); // leave
    }, 60000); // (1 min in ms)
});

const status = queue => `Volume: ${queue.volume}% | Filtro: ${queue.filter || "Off"} | Loop: ${queue.repeatMode ? queue.repeatMode === 2 ? "Playlist total" : "Musica" : "Off"} | Autoplay: ${queue.autoplay ? "On" : "Off"}`
client.distube
  .on("playSong", async (message, queue, song) => {
    let embed2 = new MessageEmbed()
    embed2.setAuthor('Mensagem de aviso')
    embed2.setDescription(`Tocando: ${song.name} - ${song.formattedDuration}\nPedido por: ${song.user}`)
    embed2.setFooter(`${status(queue)}`, message.author.displayAvatarURL({ format: "png" }))
    embed2.setColor('#851d86')
    message.channel.send(embed2).then(msg => {
      msg.delete({ timeout: 240000 })
    })
      .catch(console.error);
  })
  .on("addSong", (message, queue, song) => {
    embed.setAuthor('Mensagem de aviso')
    embed.setDescription(`Adicionado: ${song.name} - ${song.formattedDuration} a playlist por: ${song.user}`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#851d86')
    message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  })
  .on("playList", (message, queue, playlist, song) => {
    embed.setAuthor('Mensagem de aviso')
    embed.setDescription(`Nome: ${playlist.title} (${playlist.total_items} musicas).\nPedido por: ${song.user}\nTocando agora: ${song.name} - ${song.formattedDuration}`)
    embed.setFooter(`${status(queue)}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#851d86')
    message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  })
  .on("addList", (message, queue, playlist) => {
    embed.setAuthor('Musica adicionada')
    embed.setDescription(`Adicionado: ${playlist.title} playlist (${playlist.total_items} musicas) na queue`)
    embed.setFooter(`${status(queue)}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#851d86')
    message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  })

  .on("error", (message, err) => {
    embed.setAuthor('Mensagem de erro')
    embed.setDescription(`Um erro encontrado: ${err}`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#851d86')
    message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  })

//define a msg de boas vindas

client.on("guildMemberAdd", async member => {

  let chx = db.get(`welchannel_${member.guild.id}`);
  let ch = client.channels.cache.get(chx);
  var welcomeCanvas = {};
  let canvas = welcomeCanvas;
  let membro = member.user.tag;
  let server = member.guild.memberCount;

  if (chx === null) {
    return;
  }

  if (ch === null) {
    return;
  }

  welcomeCanvas.create = Canvas.createCanvas(1024, 500)
  welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
  welcomeCanvas.context.font = '72px Dudu Calligraphy';
  welcomeCanvas.context.fillStyle = '#ffffff';

  const background = await Canvas.loadImage(`./img/bg.jpg`);
  welcomeCanvas.context.drawImage(background, 0, 0, 1024, 500)
  welcomeCanvas.context.fillText("Bem-vindo(a)", 315, 360);
  welcomeCanvas.context.beginPath();
  welcomeCanvas.context.arc(512, 166, 120, 0, Math.PI * 2, true);
  welcomeCanvas.context.stroke()
  welcomeCanvas.context.fill()

  canvas.context.font = '42px Dudu Calligraphy',
    canvas.context.textAlign = 'center';
  canvas.context.fillText(membro, 512, 410)
  canvas.context.font = '32px Dudu Calligraphy'
  canvas.context.fillText(`Você é o ${server} membro`, 512, 455)
  canvas.context.beginPath()
  canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
  canvas.context.closePath()
  canvas.context.clip()
  await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 1024 }))
    .then(img => {
      canvas.context.drawImage(img, 393, 47, 238, 238);
    })
  const atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
  try {
    ch.send(`☕ Olá ${member}, você está no ${member.guild.name}!`, atta)
  } catch (e) {
    console.error(e)
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.premiumSince !== newMember.premiumSince) {
    const channel = client.channels.cache.get('887770931408306266')
    const embed2 = new Discord.MessageEmbed()
        .setDescription(`${newMember} acaba de dar Booost no servidor!`)
        .setColor('#cc0000')
        .setFooter(`Direitos autorais: Loponte & Nate || The Happy.js`, avatar)
        .setAuthor("Seja bem vindo!", avatar);
        channel.send(embed2)
  }
});

client.login(config.token)
