const { MessageEmbed } = require("discord.js")

const Schema = require('../modules/WelcomeSchema')

module.exports = {
  name: "addbemvindo",
  aliases: [""],
  run: (client, message, args) => {
    message.delete()
    let embed = new MessageEmbed()

    let channel = message.mentions.channels.first()

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`${message.author.username}, você não tem permissão para usar este comando!`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }

    if (!channel) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription("Por favor, marque um canal que queira adicionar o boas-vindas.\nk!addbemvindo <#id-canal>.")
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }

    //quick.db

    Schema.findOne({ guildId: message.guild.id }, async (err, data) => {
      if (data) {
        data.channelId = channel.id;
        data.save();
      } else {
        new Schema({
          guildId: message.guild.id,
          channelId: channel.id
        }).save()
      }
    })

    embed.setAuthor('Mensagem de aviso')
    embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
    embed.setDescription(`・Mensagem de Boas-Vindas foi adicionada em: ${channel}`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#851d86')
    return message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  }
}