const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unban",
    aliases: [""],
    run: async (client, message, args) => {
        message.delete()

        let embed = new MessageEmbed()

        const member = args[0];

        if (!member) {
            embed.setAuthor('Mensagem de erro')
                embed.setDescription(`${message.author.username}, Por favor, coloque um ID!`)
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
                embed.setColor('#cc0000')
                return message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
                  .catch(console.error);
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            embed.setAuthor('Mensagem de aviso')
            embed.setDescription(`${message.author.username}, o ${member} foi desbanido!`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            await message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        } catch (e) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription(`${message.author.username}, ops, houve um erro!`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        }

    }
}