const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: [""],
  run: (client, message, args) => {
    message.delete()

const ajuda = new Discord.MessageEmbed()
.setColor("#851d86")
.setTitle("Sistema de Ajuda")
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
.setDescription("Reaja de acordo com o que esta procurando!\n🛎 - Informações\n\n🛠 - Administrativos\n\n🎪 - Diversão\n\n🔮 - Eventos\n\n🎵 - Musicas")
.addFields({ name: '***Quer me adicionar no seu servidor?***', value: "[Clique Aqui](https://discord.com/api/oauth2/authorize?client_id=735241944757829792&permissions=8&scope=bot)", incline: true})
.setTimestamp()
.setFooter(`Comando solicitado por ${message.member.displayName}`, message.author.displayAvatarURL({Size: 32}))

message.channel.send(ajuda).then(msg => {
  msg.react('🛎').then(r => {
    msg.react('🛠').then(r => {
      msg.react('🎪').then(r => {
        msg.react('🔮').then(r => {
          msg.react('🎵').then(r =>{

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
  ajuda.setDescription("***k!info*** **-** *Mostra as informações do server!*\n\n***k!ping*** **-** *Mostra a latência do bot com o servidor!*\n\n***k!convite*** **-** *Para entrar no servidor de suporte!*\n\n***k!avatar*** **-** *Para mostrar seu avatar ou k!avatar [pessoa] para mostrar o avatar de alguem!*" )
  msg.edit(ajuda)

})

adm.on('collect', r2 => {

  ajuda.setTitle("**Comandos Administrativos!**")
  ajuda.setDescription("***k!mute <@user> <tempo> <motivo>*** **-** *Para mutar um membro!* :x:\n\n***k!unmute <@user>*** **-** *Para desmutar um membro!* :x:\n\n***k!ban <@user> <motivo>*** **-** *Para banir um membro!* :x:\n\n***k!unban <@id>*** **-** *Para desbanir um membro!* :ballot_box_with_check:\n\n***k!kick <@user> <motivo>*** **-** *Para expulsar um membro!* :boot:\n\n***k!clear*** **-** *Para excluir mensagens!* :broom:\n\n***k!lock*** **-** *Para lockar um chat!*")
  msg.edit(ajuda)
})

fun.on('collect', r2 => {
  ajuda.setTitle("**Comandos de Diversão**")
  ajuda.setDescription("***k!kiss*** **-** *Para beijar o seu amor! ❣*\n\n***k!hug*** **-** *Para abraçar e distribuir carinho! 💞*\n\n***k!tapa*** **-** *Para estapear ou socar aquele que te incomoda!* :raised_hand:\n\n***k!carinho*** **-** *para fazer carinho em alguem* ❣\n\n***k!ship*** **-** *Para ver a % de amor! 💕*\n\n***k!say + mensagem*** **-** *Para você fala pelo bot!* :incoming_envelope:")
  msg.edit(ajuda)
})

event.on('collect', r2 => {

  ajuda.setTitle("**Sistema de Evento!**")
  ajuda.setDescription("***k!addbemvindo <#id chat de boas-vindas>*** **-** *Para adicionar o chat que irá receber as pessoas* :inbox_tray:\n\n***k!removerbemvindo*** **-** *Para remover mensagem de boas-vindas, caso queira adicionar outra mensagem, ou, simplesmente tirar!* :inbox_tray:\n\n*Kitsune também tem um sistema de anti-convite para que ninguém consiga divulgar no seu servidor!* (temporariamente indisponivel!) :wink:")
  msg.edit(ajuda)
      })

music.on('collect', r2 => {

  ajuda.setTitle("**Sistema de musica!**")
  ajuda.setDescription("***k!join, k!play, k!resume, k!lyrics, k!volume, k!skip, k!stop, k!pause, k!autoplay, k!queue, k!repeat*** **-** *para saber tudo sobre o sistema de musica!* 🎵\n\n***k!filter*** **-** *para adicionar um filtro. Exemplo: k!filter 3d* 🎵\n\n***Filtros existentes:***\n*3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverse, surround, phaser, tremolo, earwax.* 🎵")
  msg.edit(ajuda)
      })
    })
  }
}

  /* let helpArray = message.content.split(" ");
  let helpArgs = helpArray.slice(1);

  if(helpArgs[0] === 'gaming') {
    return message.reply("Isso é uma informação de Gaming.")
  }

  if(!helpArgs[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Precisa de ajuda? Irei te ajudar!')
    .setDescription('***Aqui vai uma lista do que você pode fazer com o bot:***')
    .addFields({ name: '***Prefix:***', value: '```L!```', incline: true})
    .addFields({ name: '***Comandos de Diversão:***', value: '```olah | olam | say + frase | kiss | hug | tapa | kill```', incline: true})
    .addFields({ name: '***Os comandos de informações são:***', value: '```ping | info | avatar | convite```', incline: true})
    .addFields({ name: '***Os comando de ADM são:***', value: '```clear | addbemvindo | addsaida | kick <@user> <motivo> | ban <@user> <motivo> | unban <ID>```', incline: true})
    .addFields({ name: '***Quer me adicionar no seu servidor?***', value: "[Clique Aqui](https://discord.com/api/oauth2/authorize?client_id=735241944757829792&permissions=8&scope=bot)", incline: true})
    .setColor('RANDOM')
    .setFooter(`Comando enviado por: ${message.author.username}`, client.user.displayAvatarURL());

    message.channel.send(embed);
  } */