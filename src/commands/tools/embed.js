const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('embed').setDescription('Create your custom embed!'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Custom Embed')
      .setDescription('This is a custom embed created by a user!')
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail('https://cdn.growtopia.tech/items/2480.png')
      .setTimestamp(Date.now())
      .setAuthor({
        url: 'https://youtube.com',
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag
      })
      .setURL('https://google.com')
      .addFields([
        {
          name: 'Field 1',
          value: 'This is a field 1',
          inline: false
        },
        {
          name: 'Field 2',
          value: 'This is a field 2',
          inline: true
        }
      ])

    await interaction.reply({ embeds: [embed] })
  }
}