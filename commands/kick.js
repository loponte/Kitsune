const discord = require('discord.js')

module.exports = {
  name: "kick",
  aliases: [""],
  run: async (client, message, args) => {
    message.delete()
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(`**${message.author.username}** ***Você não tem permissão para usar este comando***`)
    }

    if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
      return message.channel.send(`**${message.author.username}** ***Eu não tenho permissão para usar este comando***`)
    }

    let target = message.mentions.members.first();

    if (!target) {
      return message.channel.send(`**${message.author.username}**, ***Por favor, mencione a pessoa que você quer kickar***`)
    }

    if (target.id === message.author.id) {
      return message.channel.send(`**${message.author.username}**, ***Você não pode kickar você mesmo...***`)
    }

    if (!args[1]) {
      return message.channel.send(`**${message.author.username}**, ***Por favor, me fale o motivo do kick***`)
    }

    let embed = new discord.MessageEmbed()
      .setTitle("Ação: Kick")
      .setDescription(`Kickado ${target} (${target.id})`)
      .setColor("RANDOM")
      .setFooter(`Kickado por ${message.author.username}`);

    message.channel.send(embed)

    target.kick(args[1]);

  }
}