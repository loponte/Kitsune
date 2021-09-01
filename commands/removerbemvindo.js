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


    message.channel.send(`***Mensagem de Bem-Vindo foi removida***`).then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(console.error);
  }
}