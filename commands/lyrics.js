const { Discord } = require("discord.js");
const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const lyricsFinder = require('lyrics-finder');

module.exports = {
  name: 'lyrics',
  aliases: [''],
  category: 'Music',
  utilisation: '{prefix}loop',

  run: async (client, message, args) => {

    const serverQueue = client.distube.getQueue(message)

    let embed = new MessageEmbed()

    let songName = '';
    let pages = [];
    let currentPage = 0;

    if (!serverQueue) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`Não há nada na fila agora!`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }

    const reactionFilter = (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && (message.author.id === user.id)

    songName = serverQueue.songs[0].name;
    await finder(songName, message, pages)

    const lyricsEmbed = await message.channel.send(`paginas: ${currentPage + 1}/${pages.length}`, pages[currentPage])
    await lyricsEmbed.react('⬅');
    await lyricsEmbed.react('➡');

    const collector = lyricsEmbed.createReactionCollector(reactionFilter);

    collector.on('collect', (reaction, user) => {
      if (reaction.emoji.name === '➡') {
        if (currentPage < pages.length - 1) {
          currentPage += 1;
          lyricsEmbed.edit(`paginas: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
        }
      } else if (reaction.emoji.name === '⬅') {
        if (currentPage !== 0) {
          currentPage -= 1;
          lyricsEmbed.edit(`paginas: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
        }
      }
      reaction.users.remove(user);
    })

    async function finder(songName, message, pages) {
      let fullLyrics = await lyricsFinder(songName) || 'Não encontrado!';

      for (let i = 0; i < fullLyrics.length; i += 2048) {
        const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048));
        const msg = new MessageEmbed()
        msg.setDescription(lyric)
        msg.setColor('#851d86')
        pages.push(msg);
      }
    }
  }
}