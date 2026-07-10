require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");

require("./database/database");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


client.commands = new Collection();


const ping = require("./commands/ping");
client.commands.set(ping.data.name, ping);


client.once("ready", () => {
    console.log(`WestFord RP bot online jako ${client.user.tag}`);
});


client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await command.execute(interaction);

});


client.login(process.env.TOKEN);
