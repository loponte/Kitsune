const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const Vip = mongoose.model('vips');
const GuildCreate = mongoose.model('guilds');
const moment = require('moment');
moment.locale('pt-br');

module.exports = {
    name: "vip",
    aliases: [""],
    run: async (client, message, args) => {
        const vipData = await Vip.findOne({
            user: message.author.id
        })
        let avatar = message.author.displayAvatarURL({
            format: "png"
        });

        if (vipData == null) {
            message.delete();
            const Embed = new Discord.MessageEmbed()
                .setColor("FF0000")
                .setDescription(`• ${message.author.tag} | Você não possui um VIP Registrado.\n • Peça para um moderador ativar para você!`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }

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

        if (subCommand == "help") {
            message.delete();
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const Embed = new Discord.MessageEmbed()
                .setTitle("**Comandos de VIP**")
                .setThumbnail("https://media.discordapp.net/attachments/900548281866809354/901333116021534740/Kitsune_finished.jpg")
                .setDescription("Bem vindo a aba de ajuda VIP do Bot.\nLembre-se de sempre me colocar acima de todos os cargos, assim, funcionarei melhor e nenhum erro ocorrerá.")
                .addField("**Comandos:**", "**●** *k!vip add (@Fulano) <Adicionar vip>*\n **●** *k!vip remove (@Fulano) <Remover Vip>*\n **●** *k!vip callname (Novo Nome) <Trocar Nome>*\n **●** *k!vip limite (1-99) <Troca o Limite>*\n **●** *k!vip tagname (Nova Tag) <Trocar Tag>*\n **●** *k!vip cortag (#COR) <Troca a Cor>*")
                .addField("**Comandos Moderador:**", "**●** *k!vipadm create (@Fulano) (tempo) <Criar vip>*\n **●** *k!vipadm delete (@Fulano) <Deletar Vip>*\n **●** *k!vipadm deleteguild <Deletar a Config do server>*")
                .setTimestamp()
                .setFooter("Comandos de vip feito em conjunto com Nate")
                .setAuthor(message.author.tag, avatar)
                .setColor("001e36");
            message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 4000
            }));
        }

        if (subCommand == "add") {
            message.delete();
            let user = message.mentions.members.first() || message.guild.members.cache.find(member => (member.nickname || member.user.username).replace(/[^\p{L}]/gu, '').toLowerCase().startsWith(args[0].toLowerCase()))
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const role = message.guild.roles.cache.get(vipData.role);
            if (!user) {
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• ${message.author.tag} | Você precisa citar alguém.**\n **Exemplo:** r!vip add @${message.author.tag}`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }

            user.roles.add(vipData.role).then(() => {
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${user} | Recebeu o cargo <@&${role.id}>**`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            });
        }

        if (subCommand == "remove") {
            message.delete();
            let user = message.mentions.members.first() || message.guild.members.cache.find(member => (member.nickname || member.user.username).replace(/[^\p{L}]/gu, '').toLowerCase().startsWith(args[0].toLowerCase()))
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const role = message.guild.roles.cache.get(vipData.role);
            if (!user) {
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• ${message.author.tag} | Você precisa citar alguém.**\n **Exemplo:** r!vip remove @${message.author.tag}`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }
            user.roles.remove(role).then(() => {
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${user} | Perdeu o cargo <@&${role.id}>**`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            });
        }

        if (subCommand == "callname") {
            message.delete();
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const newName = args.join(" ")
            if (!newName) {
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• ${message.author.tag} | Você precisa especificar um nome para a sua call.**\n **• Exemplo:** r!vip nome Call Bonita`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }

            const channel = message.guild.channels.cache.get(vipData.channel);
            channel.setName(newName)
            const Embed = new Discord.MessageEmbed()
                .setColor("001e36")
                .setDescription(`**• ${message.author.tag} | O Nome da call foi alterado para:**\n *${newName}*`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }

        if (subCommand == "tagname") {
            message.delete();
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const newName = args.join(" ")
            if (!newName) {
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• ${message.author.tag} | Você precisa especificar um nome para a sua tag.**\n **• Exemplo:** r!vip tag Bonita a minha Tag`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }
            const role = message.guild.roles.cache.get(vipData.role);
            role.setName(newName)
            const Embed = new Discord.MessageEmbed()
                .setColor("001e36")
                .setDescription(`**• ${message.author.tag} | O Nome do cargo foi alterado para:**\n <@&${role.id}>, *${newName}*`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }

        if (subCommand == "cortag") {
            message.delete();
            let avatar = message.author.displayAvatarURL({
                format: "png"
            });
            const newName = args.join(" ")
            if (!newName) {
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• ${message.author.tag} | Você precisa especificar uma cor para a sua tag.**\n **• Exemplo:** r!vip tagcor #fcfcfc`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }
            const role = message.guild.roles.cache.get(vipData.role);
            role.setColor(newName)
            const Embed = new Discord.MessageEmbed()
                .setColor("001e36")
                .setDescription(`**• ${message.author.tag} | A cor foi alterada para:**\n **•** <@&${role.id}>, Novo HexCode: **${newName}**\n **• Lembre-se de sempre usar um Hexcode para definir a cor!** \n **•** Caso contrario, sua Tag ficará da sem cor.`)
                .setAuthor(message.author.tag, avatar)
                .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(Embed).then(message => message.delete({
                timeout: 25 * 1000
            }));
        }

        if (subCommand == "limite") {
            message.delete();
            const newLimit = args.join(" ")
            if (!newLimit) {
                let avatar = message.author.displayAvatarURL({
                    format: "png"
                });
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• ${message.author.tag} | Você precisa especificar um limite para a sua call.**\n **• Exemplo:** r!vip limite 69`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            }
            const voiceChannel = message.guild.channels.cache.get(vipData.channel);
            voiceChannel.setUserLimit(newLimit).then(() => {
                let avatar = message.author.displayAvatarURL({
                    format: "png"
                });
                const Embed = new Discord.MessageEmbed()
                    .setColor("001e36")
                    .setDescription(`**• ${message.author.tag} | O Limite foi alterado para:** *${newLimit}*`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                })
                )
            }).catch(err => {
                console.log("Erro setando acima de 99.")
                const Embed = new Discord.MessageEmbed()
                    .setColor("FF0000")
                    .setDescription(`**• Não tem como por o limite acima de 99!\n **• Tente utilizar:** r!vip limite 99 ou 0 (0 = Sem limite)`)
                    .setAuthor(message.author.tag, avatar)
                    .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
                return message.channel.send(Embed).then(message => message.delete({
                    timeout: 25 * 1000
                }));
            });
        };
    }
}