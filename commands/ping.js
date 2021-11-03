const discord = require('discord.js');

module.exports = {
    name: "ping",
    aliases: [""],
    run: (client, message, args) => {
        message.delete()
        const embed = new discord.MessageEmbed()
            .setAuthor('Mensagem de aviso')
            .setDescription(`**O ping do bot é de** ***${Math.round(client.ws.ping)}*** **ms!**`)
            .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            .setColor('#851d86')
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
        })
            .catch(console.error);;
    },
};