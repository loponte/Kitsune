const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "kiss",
    aliases: ["beijo"],
    run: async (client, message, args) => {
        message.delete()

    let usuario = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!usuario) {
        const embed2 = new Discord.MessageEmbed()
        .setAuthor('Mensagem de erro')
        .setDescription('Lembre-se de mencionar um usuário válido para beijar!')
        .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        .setColor('#cc0000')
        return message.reply(embed2);
    }

    var data = await fetch('https://nekos.life/api/v2/img/kiss')
        .then(res => res.json())
        .then(json => json);
    const url = data.url;

    var datab = await fetch('https://nekos.life/api/v2/img/kiss')
    .then(res => res.json())
    .then(json => json);
    const urlb = datab.url;

let avatar = message.author.displayAvatarURL({format: "png"});
    const embed = new Discord.MessageEmbed()
        .setColor('#851d86')
        .setDescription(`${message.author} **beijou** ${usuario}`)
        .setImage(url)
        .setTimestamp()
        .setFooter('reaja com "❣" para retribuir!')

        message.channel.send(embed).then(msg => {
          msg.react('❣').then(r => {})

const kissFilter = (reaction, user) => reaction.emoji.name === '❣' && user.id === usuario.id;

const kisses = msg.createReactionCollector(kissFilter);

kisses.on('collect', r2 => {
    const embed3 = new Discord.MessageEmbed()
  .setDescription(`${usuario} **beijou** ${message.author}`)
  .setImage(urlb)
  .setTimestamp()
  .setColor('#851d86')
  msg.channel.send(embed3)

})
})
}
}