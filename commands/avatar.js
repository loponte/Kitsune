const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  run: (client, message, args) => {
    message.delete()

    let embed = new MessageEmbed();

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
    if (user.id === '185562772464074753') {
      embed.setColor(`#00ffff`)
      embed.setAuthor('⭐ Kitsune Owner ⭐')
      embed.setDescription(`Avatar de ${user.username}`)
      embed.setImage(avatar)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }));
      message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 20000 })
      })
        .catch(console.error);

    } else {
      embed.setColor(`#851d86`)
      embed.setAuthor('🦊 Kitsune User 🦊')
      embed.setDescription(`Avatar de ${user.username}`)
      embed.setImage(avatar)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }));
      message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 20000 })
      })
        .catch(console.error);
    }
  }
}