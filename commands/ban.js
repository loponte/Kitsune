const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
  name: "ban",
  aliases: [""],
  run: async (client, message, args) => {
    message.delete()

    let embed = new MessageEmbed()
    if(!message.member.hasPermission('BAN_MEMBERS')) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`${message.author.username}, você não tem permissão para usar este comando!`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      embed.setColor('#cc0000')
     return message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(console.error);
    }
  
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`${message.author.username}, eu não tem permissão para usar este comando!`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      embed.setColor('#cc0000')
     return message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(console.error);
    }
  
      let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]);
      
      if(!target) {
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`${message.author.username}, por favor, mencione a pessoa que você quer banir!`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#cc0000')
       return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
      .catch(console.error);
      }
         
      if(target.id === message.author.id) {
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`${message.author.username}, você não pode banir você mesmo!`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#cc0000')
       return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
      .catch(console.error);
      }
  
      const motivo = args.slice(1).join (" ");
  
      if (!motivo) {
        let embed2 = new MessageEmbed()
        embed.setAuthor("Sistema de confirmação")
        embed.setDescription(`**Deseja banir o usuário a seguir?**`)
        embed.addField('Usuario:', `${target} (**${target.user.id}**)`, false)
        embed.addField('Motivo:', ('Nenhum motivo inserido.'), false)
        embed.setColor("#851d86")
        embed.setThumbnail(target.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        message.channel.send(embed).then(msg => {
        msg.react("👍").then(r => {});
  
        let Filtro = (reaction, user) => reaction.emoji.name === "👍" && user.id === message.author.id;
  
        const coletor = msg.createReactionCollector(Filtro);
  
        coletor.on("collect", em => {
          embed2.setTitle("Sistema de moderação | Ban")
          embed2.addField('Usuario Banido:', `**Tag: **${target.user.tag}\n**Id:** **${target.user.id}**`, false)
          embed2.addField('Moderador:', `**Tag: **${message.author.tag}\n**Id:** **${message.author.id}**`, false)
          embed2.addField('Motivo:', ('Nenhum motivo inserido.'), false)
          embed2.setColor("#851d86")
          embed2.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
          embed2.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
          target.ban();
          return message.channel.send(embed2)
  
        });
  });
      } else {
  
        let embed2 = new MessageEmbed()
  
        embed.setAuthor("Sistema de confirmação")
        embed.setDescription(`**Deseja banir o usuário a seguir?**`)
        embed.addField('Usuario:', `${target} (**${target.user.id}**)`, false)
        embed.addField('Motivo:', `${motivo}`, false)
        embed.setColor("#851d86")
        embed.setThumbnail(target.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        message.channel.send(embed).then(msg => {
        msg.react("👍").then(r => {});
  
        let Filtro = (reaction, user) => reaction.emoji.name === "👍" && user.id === message.author.id;
  
        const coletor = msg.createReactionCollector(Filtro);
  
        coletor.on("collect", em => {
            embed2.setTitle("Sistema de moderação | Ban")
            embed2.addField('Usuario Banido:', `**Tag: **${target.user.tag}\n**Id:** **${target.user.id}**`, false)
            embed2.addField('Moderador:', `**Tag: **${message.author.tag}\n**Id:** **${message.author.id}**`, false)
            embed2.addField('Motivo:', ('Nenhum motivo inserido.'), false)
            embed2.setColor("#851d86")
            embed2.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
            embed2.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            target.ban();
            return message.channel.send(embed2)
        });
  });
      }
    }
  }