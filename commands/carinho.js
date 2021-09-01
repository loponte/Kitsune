const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "carinho",
  aliases: ["pat"],
  run: async (client, message, args) => {

    var data = await fetch('https://nekos.life/api/v2/img/pat')
    .then(res => res.json())
    .then(json => json);
    const url = data.url;

    var datab = await fetch('https://nekos.life/api/v2/img/pat')
    .then(res => res.json())
    .then(json => json);
    const urlb = datab.url;

    let usuario = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!usuario) {
        const embed2 = new Discord.MessageEmbed()
        .setAuthor('Mensagem de erro')
        .setDescription('Lembre-se de mencionar um usuário válido para fazer carinho!')
        .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        .setColor('#cc0000')
        return message.reply('embed2').then(msg => {
          msg.delete({ timeout: 10000 })
        })
        .catch(console.error);
    }

/*
    message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files:[rand]});
*/

let avatar = message.author.displayAvatarURL({format: "png"});
    const embed = new Discord.MessageEmbed()
        .setColor('#851d86')
        .setDescription(`${message.author} **fez carinho em** ${usuario}`)
        .setImage(url)
        .setTimestamp()
        .setFooter('reaja com "❣" para retribuir')
        await message.channel.send(embed).then(msg => {
          msg.react('❣').then(r => {})

const killFilter = (reaction, user) => reaction.emoji.name === '❣' && user.id === usuario.id;

const kills = msg.createReactionCollector(killFilter);

kills.on('collect', r2 => {
  const embed3 = new Discord.MessageEmbed()
  .setDescription(`${usuario} **fez carinho em** ${message.author}`)
  .setImage(urlb)
  .setTimestamp()
  .setColor('#851d86')
  msg.channel.send(embed3)

})
})
}
}

        /*message.member.send({ embed }).then((embed) => {
          [💞].forEach((emoji) => {
            embed.react(emoji);
          });
          const collector = embed.creatrReactionCollector((reaction, user) => 
          [💞].includes(reaction.emoji.name)
          );
          collector.on("collect", (reaction, user) => {
            console.log(reaction.emoji.name);
          });
        });*/