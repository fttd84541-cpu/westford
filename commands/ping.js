const { SlashCommandBuilder } = require("discord.js");


module.exports = {

data: new SlashCommandBuilder()
.setName("ping")
.setDescription("Test bota"),


async execute(interaction){

    await interaction.reply("🟢 WestFord RP bot funguje!");

}

};
