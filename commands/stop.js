const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "stop",
    aliases: ["dc", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()
        const queue = client.distube.getQueue(message)
        const channel = message.member.voice.channel

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

        if(!queue){
        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`Desconectado`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        channel.leave()
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);
        } else {

        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`Desconectado`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        client.distube.stop(message)
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(console.error);
        }
    }
}
