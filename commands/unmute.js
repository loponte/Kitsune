const { MessageEmbed, Message, Client } = require('discord.js')
const discord = require('discord.js')

module.exports = {
  name: 'unmute',
  aliases: ["desmute"],
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    message.delete()
    let embed = MessageEmbed()

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {

      embed.setAuthor('Mensagem de erro')
      embed.setDescription(':x: | Você não tem permissão para usar esse comando')
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);

    }

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!Member) {

      embed.setAuthor('Mensagem de erro')
      embed.setDescription(':x: | Eu não encontrei este membro.')
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);

    }

    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'mutado');

    await Member.roles.remove(role)

    let embedUn = new discord.MessageEmbed()
      .setTitle("Sistema de moderação | desmute")
      .addField('Usuario Desmutado:', `**Tag:** ${Member.user.tag}\n**Id:** ${Member.user.id}`, false)
      .addField('Moderador:', `**Tag:** ${message.author.tag}\n**Id:** ${message.author.id}`, false)
      .setColor("#851d86")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    message.channel.send(embedUn).then(msg => {
      msg.delete({ timeout: 10000 })
    })
      .catch(console.error);
  }
}