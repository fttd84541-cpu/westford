const {
    SlashCommandBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("ping")

        .setDescription(
            "Test jestli bot funguje"
        ),



    async execute(interaction){


        await interaction.reply({

            content:
            "🟢 WestFord RP bot funguje!",

            ephemeral:true

        });


    }

};
