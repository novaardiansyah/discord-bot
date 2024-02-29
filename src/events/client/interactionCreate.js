const fs = require('fs')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client
      const { commandName } = interaction
      const command = commands.get(commandName)
      if (!command) return

      try {
        await command.execute(interaction, client)
      } catch (error) {
        console.log(`Error interaction-create: ${error}`)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
      }
    }
  }
}