const { Discord } = require("discord.js");
const discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const lyricsFinder = require('lyrics-finder');

module.exports = {
    name: 'lyrics',
    aliases: [''],
    category: 'Music',
    utilisation: '{prefix}loop',

    run: async (client, message, args) => {
      let embed = new MessageEmbed()
      let songName = '';
      let pages = [];
      let currentPage = 0;

      const messageFilter = m => m.author.id === message.author.id;
      const reactionFilter = (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && (message.author.id === user.id)

      embed.setDescription('Porfavor, agora escreva o nome da musica.')
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      embed.setColor('#851d86')
      message.channel.send(embed)
      await message.channel.awaitMessages(messageFilter, {max: 1, time: 15000}).then(async collected => {
        songName = collected.first().content;
        await finder (songName, message, pages)
      })

      const lyricsEmbed = await message.channel.send(`paginas: ${currentPage+1}/${pages.length}`, pages[currentPage])
      await lyricsEmbed.react('⬅');
      await lyricsEmbed.react('➡');

      const collector = lyricsEmbed.createReactionCollector(reactionFilter);

      collector.on('collect', (reaction, user) => {
        if(reaction.emoji.name === '➡'){
          if(currentPage < pages.length-1){
            currentPage+=1;
            lyricsEmbed.edit(`paginas: ${currentPage+1}/${pages.length}`, pages[currentPage]);
          }
        }else if(reaction.emoji.name === '⬅'){
          if(currentPage !== 0){
            currentPage -= 1;
            lyricsEmbed.edit(`paginas: ${currentPage+1}/${pages.length}`, pages[currentPage]);
          }
        }
        reaction.users.remove(user);
      })

      async function finder(songName,message,pages){
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
      /*
            const queue = client.player.getQueue(message);
            let embed = new MessageEmbed();
        if (!queue) {
            embed.setAuthor('Mensagem de erro')
            embed.setDescription('Não tem nenhuma musica na fila.')
            embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
            embed.setColor('#cc0000')
            return message.channel.send(embed)
        }
        
        let lyrics = null;
        const track = client.player.nowPlaying(message);

        message.send.channel(track.title);

      lyrics = await lyricsFinder(track.title, "");

    let lyricsEmbed = new MessageEmbed()
      .setDescription(lyrics)
      .setColor("#851d86")
      .setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
        */