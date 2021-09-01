const discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

module.exports = {
    name: "info",
    aliases: [""],
    run: (client, message, args) => {
        message.delete();
        const gAvatar = message.guild.iconURL();
        const embed = new discord.MessageEmbed()
        
        .setTimestamp()
        .setTitle(`${message.guild.name}`)
        .setThumbnail(gAvatar)
        .setColor("#851d86")
        .setDescription(`Algumas informações de: ${message.guild.name}!`)
        .addField(`ID do servidor:`, message.guild.id, true)
        .addField(`Posse do servidor:`, message.guild.owner, true)
        .addField(`Região do servidor:`, message.guild.region, true)
        .addField(`Total de canais:`, message.guild.channels.cache.size, true)
        .addField(`Total de membros:`, message.guild.memberCount, true)
        .addField(`Criada em:`, moment(message.guild.createdAt) .format ('LLL'), true)
        .addField(`Você entrou aqui em:`, moment(message.member.joinedAt) .format ('LLL'), true)
        .setFooter(`Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({Size: 32}))
    
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);;
    }
}
