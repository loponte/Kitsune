module.exports = {
    name: "disconnect",
    aliases: ["leave","dc"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const channel = message.member.voice.channel
        channel.leave()
    }
}
