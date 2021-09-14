const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "jump",
    aliases: [""],
    run: async (client, message, args) => {
        message.delete()

        let embed = new MessageEmbed()
        embed.setAuthor('Mensagem de aviso')
        embed.setDescription(`Pulando para a musica ${args[0]}`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#851d86')

        if (!args[0]) {
            embed.setAuthor('Mensagem de aviso')
            embed.setDescription(`Insira um numero invalido.`)
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
            embed.setColor('#851d86')
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
            })
                .catch(console.error);
        }

        client.distube.jump(message, parseInt(args[0]))
        message.channel.send(embed).then(msg => {
            msg.delete({ timeout: 10000 })
        })
            .catch(console.error);
    }
}