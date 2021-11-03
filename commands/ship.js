const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ship",
  aliases: [""],
  run: async (client, message, args) => {
    message.delete()
    let embed = new MessageEmbed()

    let usuario = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!usuario) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription('Lembre-se de mencionar um usuário válido para shipar')
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.reply(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }

    if (!usuario || message.author.id === usuario.id) {
      usuario = message.guild.members
        .filter(m => m.id !== message.author.id)
        .random();
    }

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "❤".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    embed.setAuthor('Qual o nivel de amor?')
    embed.setDescription(`❣️${usuario} & ${message.author}❣️\n\n💕 ${Math.floor(love)}%\n\n${loveLevel}`)
    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
    embed.setColor('#851d86')

    message.channel.send(embed);
  }
}