const { MessageEmbed, Discord } = require('discord.js');

module.exports = {
  name: "clear",
  aliases: ["limpar"],
  run: async (client, message, args) => {
    message.delete()
    let embed = new MessageEmbed()

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    if (user.id === '185562772464074753') {
      if (!args[0]) {
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`${message.author}, você deve inserir quantas mensagens deseja apagar no chat.`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#cc0000')
        return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
          .catch(console.error);
      };

      const amount = parseInt(args[0]);

      if (amount > 9999 || amount < 2) {
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`${message.author}, você deve inserir um número de **2** à **9999** para eu limpar em mensagens.`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#cc0000')
        return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
          .catch(console.error);
      }

      const size = Math.ceil(amount / 100);

      if (size === 1) {
        let messages = await message.channel.messages.fetch({ limit: amount });

        const deleted = await message.channel.bulkDelete(messages, true);

        embed.setAuthor('Mensagem de de aviso')
        embed.setDescription(`${message.author}, ${deleted.size < messages.length ? `limpou o chat. Mas **${messages.length - deleted.size}** mensagens não foram apagadas por terem mais de 14 dias desde o envio` : `limpou o chat com sucesso`}`);
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#851d86')
        return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
          .catch(console.error);

      } else {
        let length = 0;

        for (let i = 0; i < size; i++) {
          let messages = await message.channel.messages.fetch({
            limit: i === size.length - 1 ? amount - (pages - 1) * 100 : 100,
          });

          messages = messages.array().filter((x) => x.pinned === false);

          const deleted = await message.channel.bulkDelete(messages, true);

          length += deleted.size;

          if (deleted.size < messages.length) continue;

          embed.setAuthor('Mensagem de de aviso')
          embed.setDescription(`${message.author}, ${deleted.size < messages.length ? `limpou o chat. Mas **${messages.length - deleted.size}** mensagens não foram apagadas por terem mais de 14 dias desde o envio` : `limpou o chat com sucesso`}`);
          embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
          embed.setColor('#851d86')

        }
        await message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
          .catch(console.error);
      }
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      {
        embed.setAuthor('Mensagem de erro')
        embed.setDescription(`${message.author}, você precisa da permissão **MANAGE_MESSAGES** para executar este comando.`)
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#cc0000')
        return message.channel.send(embed).then(msg => {
          msg.delete({ timeout: 10000 })
        })
          .catch(console.error);
      };
    }

    if (!args[0]) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`${message.author}, você deve inserir quantas mensagens deseja apagar no chat.`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    };

    const amount = parseInt(args[0]);

    if (amount > 9999 || amount < 2) {
      embed.setAuthor('Mensagem de erro')
      embed.setDescription(`${message.author}, você deve inserir um número de **2** à **9999** para eu limpar em mensagens.`)
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#cc0000')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }

    const size = Math.ceil(amount / 100);

    if (size === 1) {
      let messages = await message.channel.messages.fetch({ limit: amount });

      const deleted = await message.channel.bulkDelete(messages, true);

      embed.setAuthor('Mensagem de de aviso')
      embed.setDescription(`${message.author}, ${deleted.size < messages.length ? `limpou o chat. Mas **${messages.length - deleted.size}** mensagens não foram apagadas por terem mais de 14 dias desde o envio` : `limpou o chat com sucesso`}`);
      embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
      embed.setColor('#851d86')
      return message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);

    } else {
      let length = 0;

      for (let i = 0; i < size; i++) {
        let messages = await message.channel.messages.fetch({
          limit: i === size.length - 1 ? amount - (pages - 1) * 100 : 100,
        });

        messages = messages.array().filter((x) => x.pinned === false);

        const deleted = await message.channel.bulkDelete(messages, true);

        length += deleted.size;

        if (deleted.size < messages.length) continue;

        embed.setAuthor('Mensagem de de aviso')
        embed.setDescription(`${message.author}, ${deleted.size < messages.length ? `limpou o chat. Mas **${messages.length - deleted.size}** mensagens não foram apagadas por terem mais de 14 dias desde o envio` : `limpou o chat com sucesso`}`);
        embed.setFooter(`requirido por • ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
        embed.setColor('#851d86')

      }
      await message.channel.send(embed).then(msg => {
        msg.delete({ timeout: 10000 })
      })
        .catch(console.error);
    }
  }
};


