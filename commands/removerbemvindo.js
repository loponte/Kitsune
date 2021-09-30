const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "removerbemvindo",
  aliases: ["rbv"],
  run: (client, message, args) => {
    message.delete()

    let channel = message.mentions.channels.first()

    //quick.db

    if (user.id === '185562772464074753') {
      db.delete(`welchannel_${message.guild.id}`)
      db.delete(`welmessage_${message.guild.id}`)
      const embed = new Discord.MessageEmbed()
      .setAuthor('Mensagem de aviso')
      .setDescription('Mensagem de boas vindas foi removida.')
      .setColor('#cc0000')
      .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 5000 })
      })
        .catch(console.error);
    }

    if(!message.member.permissions.has("MANAGE_MESSAGES")) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`${message.author.username}, você não tem permissão para usar este comando!`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }

    db.delete(`welchannel_${message.guild.id}`)
    db.delete(`welmessage_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
    .setAuthor('Mensagem de aviso')
    .setDescription('Mensagem de boas vindas foi removida.')
    .setColor('#cc0000')
    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    return message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 5000 })
    })
      .catch(console.error);
  }
}