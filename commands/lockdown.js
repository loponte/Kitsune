const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "lockdown",
    aliases: ["ld"],
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()

        if (!message.member.permissions.any(["MANAGE_GUILD", "ADMINISTRATOR"])) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Você não tem a permissão **"Gerenciar Servidor"**, verifique antes de continuar.')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);   
            }

            if(!args[0]){
                embed.setAuthor("Sistema de Anti-Raiding")
                embed.setDescription(`**Deseja travar todos os chats?**\n(escolha o que deseja fazer)`)
                embed.addField('Lockdown', '`k!lockdown on` ou `k!lockdown off`', false)
                embed.setColor("#851d86")
                embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
                message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 30000 })
                  })
                  .catch(console.error);   
                }

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category')
        if (args[0] === 'on'){
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += '🔒')
                })
            })
            
            embed.setAuthor('Sistema de Anti-Raiding')
            embed.setDescription('Lockdown foi ativado com sucesso, todos os canais estão "lockados"')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 30000 })
              })
              .catch(console.error);   
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                    channel.setName(channel.name.replace('🔒', ''))
                })
            })
            embed.setAuthor('Sistema de Anti-Raiding')
            embed.setDescription('Lockdown foi desativado com sucesso, todos os canais estão "deslockados"')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);   
        }
    }
}