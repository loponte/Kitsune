const Discord = require('discord.js');

module.exports = {
  name: "say",
  aliases: [""],
  run: async (client, message, args) => {
    message.delete()
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Verifique suas permissões');
    const sayMessage = args.join(' ')
      message.delete()
      message.channel.send(sayMessage)
}
}