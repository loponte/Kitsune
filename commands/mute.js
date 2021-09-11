const {Message, MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "mute",
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()

        if(!message.member.hasPermission('MANAGE_MESSAGES')) {

            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Você não tem permissão para usar esse comando.')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);

        }
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) {

            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Eu não encontrei este membro.')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);

        }
        if(!time) { 

            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Por favor especifique um tempo. 5s, 5m, 5h.')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);

        }
        const motivo = args.slice(2).join (" ");

        if (!motivo) {

            embed.setAuthor('Mensagem de erro')
            embed.setDescription('**Não esqueça de falar o motivo!**')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);

        }

        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'mutado')
        if(!role) {

                embed.setAuthor('Mensagem de erro')
                embed.setDescription('O cargo "mutado" não foi encontrado, estou criando este cargo agora mesmo!')
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
                embed.setColor('#cc0000')
                message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
                  .catch(console.error);
            
            try {

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'mutado',
                        permissions: []
                    }
                });
                
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: false

                    })
                });

                message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        VIEW_CHANNEL: true,
                        SPEAK: false

                    })
                });

                embed.setAuthor('Mensagem de aviso')
                embed.setDescription('O cargo "mutado" foi criado com sucesso! Estou mutando agora mesmo!')
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
                embed.setColor('#851d86')
                await message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 10000 })
                  })
                  .catch(console.error);

            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'mutado')

        if(Member.roles.cache.has(role2.id)) {

            embed.setAuthor('Mensagem de erro')
            embed.setDescription(`${Member.displayName} *já foi mutado!*`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);

        }
        await Member.roles.add(role2)

        let embed2 = new MessageEmbed()
        .setTitle("Sistema de moderação | Mute")
        .addField('Usuario Mutado:', `**Tag:** ${Member.user.tag}\n**Id:** ${Member.user.id}`, false)
        .addField('Moderador:', `**Tag:** ${message.author.tag}\n**Id:** ${message.author.id}`, false)
        .addField('Tempo:', `**${time}**`, false)
        .addField('Motivo:', motivo, false)
        .setColor("#851d86")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
        .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        message.channel.send(embed2)             

        setTimeout(async () => {
            await Member.roles.remove(role2)
            embed.setAuthor('Mensagem de aviso')
            embed.setDescription(`Acabou a punição de ${Member.user.tag}!`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        }, ms(time))
    }
}