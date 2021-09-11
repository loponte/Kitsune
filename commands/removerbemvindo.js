const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "removerbemvindo",
  aliases: ["rbv"],
  run: (client, message, args) => {
    message.delete()

    let channel = message.mentions.channels.first()

    //quick.db

    db.delete(`welchannel_${message.guild.id}`)
    db.delete(`welmessage_${message.guild.id}`)
    const embed = new discord.MessageEmbed()
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