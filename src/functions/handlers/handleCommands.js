const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync('./src/commands')
    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'))

      const { commands, commandArray } = client
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`)
        commands.set(command.data.name, command)
        commandArray.push(command.data.toJSON())
        console.log(`Command: ${command.data.name} has been passed through the handler`)
      }
    }

    const clientId = '1212610911819403304' // * Bot user_id
    const guildId = '1202824685067436043' // * Server_id

    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN)
    try {
      console.log('Started refreshing application (/) commands.')

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: client.commandArray })

      console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
      console.log(`Error handle-commands: ${error}`)
    }
  }
}