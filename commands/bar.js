const Discord = require("discord.js");

module.exports = {
  name: "bar",
  aliases: [""],
  run: (client, message, args) => {

    if (message.member.roles.cache.has("779516767533400074") || message.member.roles.cache.has("864486805775319051")) {
      message.delete()
      message.channel.send('https://images-ext-1.discordapp.net/external/9PQTqPzH0IRBh-DLkjER9HiDQ2WWYQxIC3P7C83hjSU/https/media.discordapp.net/attachments/860974818820227092/864160288621592636/hotzeirosbarrinha.png?width=984&height=132');
    }
  }
}