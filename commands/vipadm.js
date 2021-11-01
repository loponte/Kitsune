const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const Vip = mongoose.model('vips');
const GuildCreate = mongoose.model('guilds');
const moment = require('moment');
moment.locale('pt-br');

module.exports = {
    name: "vipadm",
    aliases: [""],
    run: async (client, message, args) => {
        const vipData = await Vip.findOne({
            user: message.author.id
        })
        let avatar = message.author.displayAvatarURL({
            format: "png"
        });

        const member = message.mentions.members.first()

        const subCommand = args.shift().toLowerCase();
        
        if (!subCommand) {
            message.delete();
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const Embed = new Discord.MessageEmbed()
                .setColor("FF0000")
                .setDescription(`**• ${message.author.tag} | Verifique a ortografia ou a falta de algo.**\n **• Utilize** r!vip help **para uma Lista de Comandos.**`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }

        if (subCommand == "create") {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                embed.setAuthor('Mensagem de erro')
                embed.setDescription(`${message.author.username}, você não tem permissão para usar este comando!`)
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                embed.setColor('#cc0000')
                return message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                    .catch(console.error);
            }
            
            if (!args[1]) {
                let avatar = message.author.displayAvatarURL({ format: "png" });
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${message.author.tag} | Verifique a ortografia ou a falta de algo.**\n **• Tente:** r!vipc create @${message.author.tag} 1d`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }
            let guild = await GuildCreate.findOne({
                guildID: message.guild.id
            })
            if (!guild) {
                guild = new GuildCreate({
                    guildID: message.guild.id
                })
                const embed = new Discord.MessageEmbed()
                    .setAuthor('Mensagem de configuração')
                    .setDescription('Oh, parece que você não fez algumas configurações, vou te ajudar nisto! Precisamos configurar um cargo onde vou colocar todos os vips novos abaixo dele. Por favor, copie o ***ID*** do cargo e envie para mim.(1/2)')
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setColor('#cc0000')
                message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 60000 })
                })
                    .catch(console.error);

                const filter = msg => msg.author.id == message.author.id
                let options = {
                    max: 1
                };
                let col = await message.channel.awaitMessages(filter, options)
                guild.roleplacementID = col.first().content

                const embed2 = new Discord.MessageEmbed()
                    .setAuthor('Mensagem de configuração')
                    .setDescription('Perfeito! Agora copie o ID ***ID*** da categoria que deseja, essa categoria será para criar as salas vips.(2/2)')
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setColor('#cc0000')
                message.channel.send(embed2).then(msg => {
                    msg.delete({ timeout: 60000 })
                })
                    .catch(console.error);

                const filter2 = msg => msg.author.id == message.author.id
                let options2 = {
                    max: 1
                };
                let col2 = await message.channel.awaitMessages(filter2, options2)
                guild.categoryID = col2.first().content
                guild.save()
            }
            const RolePlacement = await message.guild.roles.fetch(guild.roleplacementID);

            if (RolePlacement.position > message.guild.members.resolve(client.user).roles.highest.position) {
                const embed2 = new Discord.MessageEmbed()
                    .setAuthor('Mensagem de configuração')
                    .setDescription('Eu estou sem permissão para continuar o processo de criação. Para que eu consiga fazer os comandos de admistração, preciso que me coloque no topo dos cargos.')
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setColor('#cc0000')
                return message.channel.send(embed2).then(msg => {
                    msg.delete({ timeout: 60000 })
                })
                    .catch(console.error);
            }

            let vip = await Vip.findOne({
                user: member.user.id
            });
            if (!vip) {
                vip = new Vip({
                    user: member.user.id,
                });
                const RolePlacement = await message.guild.roles.fetch(guild.roleplacementID);
                const role = await message.guild.roles.create({
                    data: {
                        name: `${member.user.username} VIP`,
                        mentionable: false,
                        color: "ffffff",
                        position: RolePlacement.position
                    }
                });
                vip.role = role.id
                member.roles.add(role);

                const channel = await message.guild.channels.create(`${member.user.username}'s Quartinho`, {
                    type: 'voice',
                    userLimit: "10",
                    parent: guild.categoryID,
                    permissionOverwrites: [{
                        id: message.guild.roles.everyone.id,
                        deny: ['CONNECT']
                    },
                    {
                        id: role.id,
                        allow: ['CONNECT']
                    }
                    ]
                });
                vip.channel = channel.id
            }

            const multiplier = args[1].slice(args[1].length - 1);
            const time = Number(args[1].slice(0, args[1].length - 1));
            if (isNaN(time)) {
                let avatar = message.author.displayAvatarURL({
                    format: "png"
                });
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${message.author.tag} | Verifique a ortografia ou a falta de algo.**\n **• Tente:** r!vipc create @${message.author.tag} 1d`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }
            let multiplyBy;
            const expires = moment();

            switch (multiplier) {
                case 'h':
                    expires.add(time, 'hours');
                    break;
                case 'd':
                    expires.add(time, 'days');
                    break;
                case 's':
                    expires.add(time, 'weeks');
                    break;
                case 'm':
                    expires.add(time, 'months');
                    break;
                default:
                    expires.add(1, 'weeks')
            };

            vip.expires = expires;
            vip.save().then(vip => {
                let avatar = message.author.displayAvatarURL({
                    format: "png"
                });
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${message.author.tag} | VIP Criado, aproveite.**\n **• Acaba ${moment(expires).fromNow()}**`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 40 * 1000
                }));
            })
        }

        if (subCommand == "delete") {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                embed.setAuthor('Mensagem de erro')
                embed.setDescription(`${message.author.username}, você não tem permissão para usar este comando!`)
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                embed.setColor('#cc0000')
                return message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                    .catch(console.error);
            }
            
            const vip = await Vip.findOne({
                user: member.user.id
            });
            if (!vip) {
                let avatar = message.author.displayAvatarURL({
                    format: "png"
                });
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${message.author.tag} | VIP Não encontrado.**`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }

            const role = await message.guild.roles.fetch(vip.role);
            await role.delete();
            const channel = await message.guild.channels.resolve(vip.channel);
            await channel.delete();

            await vip.delete();

            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const user = message.mentions.members.first()
            const Embed = new Discord.MessageEmbed()
                .setColor("001e36")
                .setDescription(`**• ${message.author.tag} | Processo completo.**\n **• ${user} | <= A Call foi Apagada!**`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }
        if (subCommand == "deleteguild") {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                embed.setAuthor('Mensagem de erro')
                embed.setDescription(`${message.author.username}, você não tem permissão para usar este comando!`)
                embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                embed.setColor('#cc0000')
                return message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
                    .catch(console.error);
            }
            let guild = await GuildCreate.findOne({
                guildID: message.guild.id
            })
            if (!guild) {
                guild = new GuildCreate({
                    guildID: message.guild.id
                })
                const embed = new Discord.MessageEmbed()
                    .setAuthor('Mensagem de configuração')
                    .setDescription('Oh, parece que você não configurou o vip, escreva `k!vipadm create <@fulano> <tempo>`')
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                    .setColor('#cc0000')
                message.channel.send(embed).then(msg => {
                    msg.delete({ timeout: 60000 })
                })
                    .catch(console.error);
            }

            await guild.delete();

            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const user = message.mentions.members.first()
            const Embed = new Discord.MessageEmbed()
                .setColor("001e36")
                .setDescription(`**• ${message.author.tag} | Processo completo.**`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }
    }
}