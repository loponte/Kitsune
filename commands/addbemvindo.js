const { MessageEmbed } = require("discord.js")

const db = require("quick.db")

module.exports = {
  name: "addbemvindo",
  aliases: [""],
  run: (client, message, args) => {
    message.delete()
    let embed = new MessageEmbed()

    let channel = message.mentions.channels.first()

    if(!channel) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription("Por favor, marque um canal que queira adicionar o boas-vindas.\nk!addbemvindo <#id-canal>.")
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
      .catch(console.error);
    }

    //quick.db
  
    db.set(`welchannel_${message.guild.id}`, channel.id)

    embed.setAuthor('Mensagem de aviso')
    embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
    embed.setDescription(`・Mensagem de Boas-Vindas foi adicionada em: ${channel}`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
    embed.setColor('#851d86')
    return message.channel.send(embed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(console.error);
  }
}