const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args, queue) => {
         message.delete()
        let embed = new MessageEmbed()
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`Você não está em um canal de voz!`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
        embed.setColor('#cc0000')
        if (!message.member.voice.channel) {
            return message.channel.send(embed).then(msg => {
              msg.delete({ timeout: 10000 })
            })
            .catch(console.error);
            }

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
            embed.setDescription(`Você não está no mesmo canal de voz!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        }

        const serverQueue = client.distube.getQueue(message);

        if (!client.distube.getQueue(message)) {
            embed.setDescription(`Nenhuma música tocando no momento!`)
            return message.channel.send(embed).then(msg => {
                msg.delete({ timeout: 10000 })
              })
              .catch(console.error);
        }

        let currentPage = 0;
        let embeds = embedGenerator(serverQueue)
        const queueEmbed = await message.channel.send(`*paginas: ${currentPage+1}/${embeds.length}*`, embeds[currentPage])
        await queueEmbed.react('⬅');
        await queueEmbed.react('➡');

        const reactionFilter = (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && (message.author.id === user.id)
        const collector = queueEmbed.createReactionCollector(reactionFilter);

        collector.on('collect', (reaction, user) => {
            if(reaction.emoji.name === '➡'){
              if(currentPage < embeds.length-1){
                currentPage+=1;
                queueEmbed.edit(`*paginas: ${currentPage+1}/${embeds.length}*`, embeds[currentPage]);
              }
            }else if(reaction.emoji.name === '⬅'){
              if(currentPage !== 0){
                currentPage -= 1;
                queueEmbed.edit(`*paginas: ${currentPage+1}/${embeds.length}*`, embeds[currentPage]);
              }
            }
            reaction.users.remove(user);
          })

          function embedGenerator(serverQueue){
              const embeds = [];
              let songs = 10;
              for (let i = 1; i < serverQueue.songs.length; i += 10) {
                  const current = serverQueue.songs.slice(i, songs)
                  songs += 10;
                  let j = i;
                  const info = current.map(song => `${++j}. [${song.title}](${song.url})`).join('\n')
                  const msg = new Discord.MessageEmbed()
                  .setDescription(`Tocando Agora: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n ${info}`)
                  .setColor('#851d86')
                  .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
                  embeds.push(msg)
              }
              return embeds;
          }
                  
            }
}
