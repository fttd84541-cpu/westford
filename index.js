require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");


// Spuštění databáze
require("./database/database");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


// Kolekce příkazů
client.commands = new Collection();


// Načtení příkazů

const ping = require("./commands/ping");
client.commands.set(
    ping.data.name,
    ping
);


const obcanka = require("./commands/ids/obcanka");
client.commands.set(
    obcanka.data.name,
    obcanka
);


// Bot online

client.once("ready", () => {

    console.log(
        `✅ WestFord RP bot online jako ${client.user.tag}`
    );

});


// Slash command handler

client.on(
    "interactionCreate",
    async interaction => {


    if(!interaction.isChatInputCommand())
        return;


    const command =
    client.commands.get(
        interaction.commandName
    );


    if(!command)
        return;


    try {

        await command.execute(interaction);

    }

    catch(error){

        console.error(error);


        if(interaction.replied){

            await interaction.followUp({
                content:
                "❌ Nastala chyba.",
                ephemeral:true
            });

        }

        else{

            await interaction.reply({
                content:
                "❌ Nastala chyba.",
                ephemeral:true
            });

        }

    }


});


// Přihlášení bota

client.login(
    process.env.TOKEN
);
