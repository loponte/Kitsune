const DisTube = require("distube")
const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const client = new Discord.Client()
const fs = require("fs")
const config = require("./config.json")
const db = require("quick.db");

let embed = new MessageEmbed()

client.config = require("./config.json")
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnEnd: false, leaveOnEmpty: true })
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

  //member count
/*
  client.on('ready', function(){
    let myGuild = client.guilds.cache.get("827005733538365480");
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.cache.get("827005733538365484");
    memberCountChannel.setName("Member•" +memberCount+ "•User")
});
*/

client.on("message", async message => {
    embed.setAuthor('Mensagem de erro')
    embed.setDescription(`Você deve estar em um canal de voz!`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
    embed.setColor('#cc0000')

    const prefix = config.prefix
    if (!message.content.toLowerCase().startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel){
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`Você deve estar em um canal de voz!`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
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
        embed.setDescription(`Erro: ${e}`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#cc0000')
        console.error(e)
        message.reply(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    }
})

const status = queue => `Volume: ${queue.volume}% | Filtro: ${queue.filter || "Off"} | Loop: ${queue.repeatMode ? queue.repeatMode === 2 ? "Playlist total" : "Musica" : "Off"} | Autoplay: ${queue.autoplay ? "On" : "Off"}`
client.distube
    .on("playSong", async (message, queue, song) => {
      let embed2 = new MessageEmbed()
        embed2.setAuthor('Mensagem de aviso')
        embed2.setDescription(`Tocando: ${song.name} - ${song.formattedDuration}\nPedido por: ${song.user}`)
        embed2.setFooter(`${status(queue)}`, message.author.displayAvatarURL({format: "png"}))
        embed2.setColor('#851d86')
        message.channel.send(embed2).then(msg => {
          msg.delete({ timeout: 240000 })
        })
        .catch(console.error);
    })
    .on("addSong", (message, queue, song) => {
        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`Adicionado: ${song.name} - ${song.formattedDuration} a playlist por: ${song.user}`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    })
    .on("playList", (message, queue, playlist, song) => {
        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`Nome: ${playlist.title} (${playlist.total_items} musicas).\nPedido por: ${song.user}\nTocando agora: ${song.name} - ${song.formattedDuration}`)
        embed.setFooter(`${status(queue)}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    })
    .on("addList", (message, queue, playlist) => {
        embed.setAuthor('Musica adicionada')
        embed.setDescription(`Adicionado: ${playlist.title} playlist (${playlist.total_items} musicas) na queue`)
        embed.setFooter(`${status(queue)}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    })
  /*
    .on("searchResult", (message, result) => {
        let i = 0
        embed.setAuthor('Escolha uma das opções abaixo')
        embed.setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Digite qualquer outra coisa ou aguarde 60 segundos para cancelar.*`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 20000 })
        })
        .catch(console.error);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => {
        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`${client.emotes.error} | Pesquisa cancelada.`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    })
    */
    .on("error", (message, err) => {
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`Um erro encontrado: ${err}`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    })

    //define a msg de boas vindas

client.on("guildMemberAdd", (member) => {

    let chx = db.get(`welchannel_${member.guild.id}`);
    let mchx = db.get(`welmessage_${member.guild.id}`);
    let ch = client.channels.cache.get(chx);
  
    if(chx === null) {
      return;
    }

    if(ch === null) {
      return;
    }

    if(mchx === null){
      return;
    }

    var list1 = [
        'https://i.pinimg.com/originals/9d/c9/65/9dc965024bd5974607bd39937c07fd2d.gif',
        'https://i.pinimg.com/originals/e6/8e/7d/e68e7df444a43c28f0a99d7fffbacf1c.gif',
        'https://4.bp.blogspot.com/-c-MsXhM7oqo/W7alo9uaGnI/AAAAAAAAEUw/Es4o9rs__384Is032uKItDXONv4D2EguQCLcBGAs/s1600/tumblr_inline_na9u62JkNG1rbpimx.gif',
        'https://64.media.tumblr.com/d911ab9f6a6d1d88769f4532d5314f81/tumblr_p6kdhoDcfG1x6plgko1_500.gifv',
        'https://cdn.discordapp.com/attachments/780174381674266634/781014046731534336/82d3638b296f0b3d2ab5d09170345955.gif',
        'https://cdn.discordapp.com/attachments/780174381674266634/781014046346182656/5181b23dd78810c7f2fbc190b7300e71.gif',
        'https://cdn.discordapp.com/attachments/780174381674266634/781014047197233162/1045de7f55ee232c9c064df5465dfcd7.gif',
      ];
  
      var rand1 = list1[Math.floor(Math.random() * list1.length)];
      
    let embed = new Discord.MessageEmbed()
    .setColor('#7dfff1')
    .setTitle(`**${member.user.tag} | Bem-vindo(a)!** `)
    .setDescription(mchx)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
    .setFooter('ID do usuário: ' + member.user.id)
    .setTimestamp();
    if(ch){
    ch.send(embed);
    }
    /*
    if(chx){
      member.send(`*Bem-vindo ao servidor* **${member.guild.name}**, <@!${member.user.id}>`);
    }
*/
  });
  
  //define a msg de saida
  
  client.on("guildMemberRemove", (member) => {
    let chxe = db.get(`exichannel_${member.guild.id}`);
    let ch1 = client.channels.cache.get(chxe);
  
    if(chxe === null) {
      return;
    }
    if(ch1 === null) {
      return;
    }

      var list2 = [
        'https://cdn.discordapp.com/attachments/780174381674266634/781016738292039720/8d6f437c76dd1c9919241eaa9163f29c.gif',
        'https://cdn.discordapp.com/attachments/780174381674266634/781016856463015967/3c691659f01aba24f6a6deed24305989.gif',
        'https://cdn.discordapp.com/attachments/780174381674266634/781016927165349918/ff6a57a6f237042c48ac455735968745.gif',
        'https://cdn.discordapp.com/attachments/780174381674266634/781016966403325952/6068b8de6a62b9c24fa7ab8769e588fb.gif',
        'https://i.pinimg.com/originals/78/fa/24/78fa2478323fc9d423263f808baad9ed.gif',
        'https://pa1.narvii.com/6334/d35bdd9951eb452f1d1f320625fe1fbde3eb33a2_hq.gif',
        'https://cdn.discordapp.com/attachments/780174381674266634/781017061421350912/8aa933fb1c1aac28ea3a1d88bfeb3705.gif',
  
      ];
  
      var rand2 = list2[Math.floor(Math.random() * list2.length)];
  
    let embed = new Discord.MessageEmbed()
    .setColor('#7dfff1')
    .setTitle(`**${member.user.tag} | Saiu do server!** `)
    .setDescription(`***Infelizmente ${member.user.tag}*** **saiu do servidor ${member.guild.name},** *** foi muito bom ter passado um tempo com você, espero algum dia te encontrar novamente*** :(`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
    .setFooter('ID do usuário: ' + member.user.id)
    .setTimestamp();
    if(ch1){
    ch1.send(embed)
    }
  });

client.login(config.token)
