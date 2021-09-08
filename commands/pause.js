const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Você não está no mesmo canal de voz. Entre no mesmo canal de voz, ou aguarde sua vez.')
            embed.setColor('#cc0000')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 5000 })
              })
              .catch(console.error);
        }

        const queue = client.distube.getQueue(message)
        if (!queue) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription(`Não há nada na fila agora!`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        }
        if (queue.pause) {
            embed.setAuthor('Mensagem de aviso')
            embed.setDescription("Musica retomada")
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            client.distube.resume(message)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        }
            embed.setAuthor('Mensagem de aviso')
            embed.setDescription("Musica pausada")
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#851d86')
            client.distube.pause(message)
            message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
    }
}