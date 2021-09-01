const { MessageEmbed, Discord } = require('discord.js');

module.exports = {
    name: "lock",
    aliases: [" "],
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send('vc não tem permissão')
        }

        try {
            message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: false
            })

            embed.setAuthor('Sistema de moderação')
            embed.setDescription('O chat foi lockado com sucesso! Para deslockar basta reagir com "🔓"')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            message.channel.send(embed).then(msg => {
                msg.react("🔓").then(r => {});

                let Filtro = (reaction, user) => reaction.emoji.name === "🔓" && user.id === message.author.id;

                const coletor = msg.createReactionCollector(Filtro);

                coletor.on("collect", em => {

                    message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                        SEND_MESSAGES: true
                    })

                    embed.setAuthor('Sistema de moderação')
                    embed.setDescription('O chat foi deslockado com sucesso!')
                    embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
                    embed.setColor('#851d86')
                    msg.edit(embed).then(msge => {
                        msge.delete({ timeout: 10000 })
                      })
                      .catch(console.error);
      });
            })
        }catch(e) {
            console.log(e)
        }
    }
}