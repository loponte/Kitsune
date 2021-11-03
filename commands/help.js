const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: [""],
  run: (client, message, args) => {
    message.delete()

    const ajuda = new Discord.MessageEmbed()
      .setColor("#851d86")
      .setTitle("Sistema de Ajuda")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setDescription("Reaja de acordo com o que esta procurando!\nLembre-se de sempre me colocar acima de todos os cargos, assim, funcionarei melhor e nenhum erro ocorrerá.\n\n🛎 - Informações\n\n🛠 - Administrativos\n\n🎪 - Diversão\n\n🔮 - Eventos\n\n🎵 - Musicas")
      .addFields({ name: '***Quer entrar no meu servidor e receber todas as atualizações?***', value: "[Clique Aqui](https://discord.com/invite/vgBKHfc7Yk)", incline: true })
      .setTimestamp()
      .setFooter(`Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({ Size: 32 }))

    message.channel.send(ajuda).then(msg => {
      msg.react('🛎').then(r => {
        msg.react('🛠').then(r => {
          msg.react('🎪').then(r => {
            msg.react('🔮').then(r => {
              msg.react('🎵').then(r => {

              })
            })
          })
        })
      })

      const infosFilter = (reaction, user) => reaction.emoji.name === '🛎' && user.id === message.author.id;
      const admFilter = (reaction, user) => reaction.emoji.name === '🛠' && user.id === message.author.id;
      const funFilter = (reaction, user) => reaction.emoji.name === '🎪' && user.id === message.author.id;
      const eventFilter = (reaction, user) => reaction.emoji.name === '🔮' && user.id === message.author.id;
      const musicFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;

      const infos = msg.createReactionCollector(infosFilter);
      const adm = msg.createReactionCollector(admFilter);
      const fun = msg.createReactionCollector(funFilter);
      const event = msg.createReactionCollector(eventFilter);
      const music = msg.createReactionCollector(musicFilter);

      infos.on('collect', r2 => {

        ajuda.setTitle("**Comandos informativos!**")
        ajuda.setDescription("***k!vip help*** **-** *Mostra todas as informações para criar e administrar um vip!*\n\n***k!info*** **-** *Mostra as informações do server!*\n\n***k!ping*** **-** *Mostra a latência do bot com o servidor!*\n\n***k!convite*** **-** *Para me convidar para seu server!*\n\n***k!avatar*** **-** *Para mostrar seu avatar ou k!avatar [pessoa] para mostrar o avatar de alguem!*")
        msg.edit(ajuda)

      })

      adm.on('collect', r2 => {

        ajuda.setTitle("**Comandos Administrativos!**")
        ajuda.setDescription("***k!vipadm create <@user> <tempo>*** **-** *Para criar um vip!*\n\n***k!vipadm delete <@user>*** **-** *Para deletar um vip!*\n\n***k!vipadm deleteguild*** **-** *Para deletar a config do server!*\n\n***k!mute <@user> <tempo> <motivo>*** **-** *Para mutar um membro!*\n\n***k!unmute <@user>*** **-** *Para desmutar um membro!*\n\n***k!ban <@user> <motivo>*** **-** *Para banir um membro!*\n\n***k!unban <@id>*** **-** *Para desbanir um membro!*\n\n***k!kick <@user> <motivo>*** **-** *Para expulsar um membro!*\n\n***k!clear*** **-** *Para excluir mensagens!*\n\n***k!lock*** **-** *Para lockar um chat!*\n\n***k!lockdown*** **-** *Para lockar todos os chats!*")
        msg.edit(ajuda)
      })

      fun.on('collect', r2 => {
        ajuda.setTitle("**Comandos de Diversão**")
        ajuda.setDescription("***k!kiss*** **-** *Para beijar o seu amor!*\n\n***k!hug*** **-** *Para abraçar e distribuir carinho!*\n\n***k!tapa*** **-** *Para estapear ou socar aquele que te incomoda!*\n\n***k!carinho*** **-** *para fazer carinho em alguem*\n\n***k!ship*** **-** *Para ver a % de amor!*\n\n***k!say + mensagem*** **-** *Para você fala pelo bot!*")
        msg.edit(ajuda)
      })

      event.on('collect', r2 => {

        ajuda.setTitle("**Sistema de Evento!**")
        ajuda.setDescription("***k!addbemvindo <#id chat de boas-vindas>*** **-** *Para adicionar o chat que irá receber as pessoas*\n\n***k!removerbemvindo*** **-** *Para remover mensagem de boas-vindas, caso queira adicionar outra mensagem, ou, simplesmente tirar!*\n\n*Kitsune também tem um sistema de anti-convite para que ninguém consiga divulgar no seu servidor!* (temporariamente indisponivel!)")
        msg.edit(ajuda)
      })

      music.on('collect', r2 => {

        ajuda.setTitle("**Sistema de musica!**")
        ajuda.setDescription("***k!join, k!play, k!resume, k!lyrics, k!volume, k!skip, k!clearqueue, k!disconnect, k!jump, k!pause, k!autoplay, k!queue, k!repeat*** **-** *para saber tudo sobre o sistema de musica!*\n\n***k!filter*** **-** *para adicionar um filtro. Exemplo: k!filter 3d*\n\n***Filtros existentes:***\n*3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverse, surround, phaser, tremolo, earwax.*")
        msg.edit(ajuda)
      })
    })
  }
}