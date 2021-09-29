const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "say",
  aliases: [""],
  run: async (client, message, args) => {
    message.delete()
    let embed = new MessageEmbed()

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
    const sayMessage = args.join(' ')
    message.delete()
    message.channel.send(sayMessage)
  }
}