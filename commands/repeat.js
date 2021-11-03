const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "repeat",
    aliases: ["loop", "rp"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()

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

        const queue = client.distube.getQueue(message)
        if (!queue) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription(`Não há nada na fila agora!`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
            })
                .catch(console.error);
        }
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = client.distube.setRepeatMode(message, mode)
        mode = mode ? mode === 2 ? "Loop Desativado" : "Loop Ativado" : "Off"
        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`Modo de repetição definido para \`${mode}\``)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
        })
            .catch(console.error);
    }
}
