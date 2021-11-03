const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()
        const string = args.join(" ")

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Você não está no mesmo canal de voz. Entre no mesmo canal de voz, ou aguarde sua vez.')
            embed.setColor('#cc0000')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 5000 })
            })
                .catch(console.error);
        }

        if (!string) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription(`Digite o URL de uma música ou consulta para pesquisar.`)
            embed.setColor('#cc0000')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
            })
                .catch(console.error);
        }
        try {
            client.distube.play(message, string)
        } catch (e) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription(`Erro: \`${e}\``)
            embed.setColor('#cc0000')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
            })
                .catch(console.error);
        }
    }
}
