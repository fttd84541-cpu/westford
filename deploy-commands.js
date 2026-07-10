require("dotenv").config();

const {
    REST,
    Routes
} = require("discord.js");


// Import příkazů

const ping = require("./commands/ping");
const obcanka = require("./commands/ids/obcanka");


// Seznam příkazů

const commands = [

    ping.data.toJSON(),
    obcanka.data.toJSON()

];


// Discord API

const rest = new REST({
    version: "10"
}).setToken(
    process.env.TOKEN
);



async function deployCommands(){

    try {

        console.log("🔄 Nahrávám slash příkazy...");


        await rest.put(

            Routes.applicationGuildCommands(

                process.env.CLIENT_ID,
                process.env.GUILD_ID

            ),

            {
                body: commands
            }

        );


        console.log(
            "✅ Slash příkazy nahrány!"
        );


    }

    catch(error){

        console.error(error);

    }

}


deployCommands();
