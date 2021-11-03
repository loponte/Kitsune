const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()

        let mode = client.distube.toggleAutoplay(message);

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

        embed.setAuthor('Mensagem de aviso')
        embed.setDescription("Autoplay `" + (mode ? "Ligado" : "Desligado") + "`")
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
        })
            .catch(console.error);

    }
}