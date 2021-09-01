const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "join",
    aliases: [""],
    inVoiceChannel: true,
    run: (client, message, args) => {
        message.delete()
        let embed = new MessageEmbed()
        const channel = message.member.voice.channel
        channel.join()

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Estou sendo usada, aguarde sua vez.')
            embed.setColor('#cc0000')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 5000 })
              })
              .catch(console.error);
        }

        embed.setAuthor('Mensagem de aviso')
        embed.setDescription('Entrei em seu canal de voz.')
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#851d86')
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 5000 })
        })
        .catch(console.error);
    }
}