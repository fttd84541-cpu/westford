const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const db = require("../../database/database");


module.exports = {

data: new SlashCommandBuilder()

.setName("obcanka")

.setDescription("Systém občanských průkazů")


.addSubcommand(sub =>
    sub
    .setName("vytvor")
    .setDescription("Vytvoří občanský průkaz")

    .addStringOption(option =>
        option
        .setName("jmeno")
        .setDescription("Jméno")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("prijmeni")
        .setDescription("Příjmení")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("datum")
        .setDescription("Datum narození")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("narodnost")
        .setDescription("Státní příslušnost")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("rodnecislo")
        .setDescription("Rodné číslo")
        .setRequired(true)
    )
)



.addSubcommand(sub =>
    sub
    .setName("ukaz")
    .setDescription("Zobrazí občanský průkaz")
),



async execute(interaction){


const user = interaction.user.id;

const sub =
interaction.options.getSubcommand();



if(sub === "vytvor"){


const existuje =
db.prepare(
"SELECT * FROM identities WHERE discord_id = ?"
)
.get(user);



if(existuje){

return interaction.reply({

content:
"❌ Občanský průkaz už máš vytvořený.",

ephemeral:true

});

}



const jmeno =
interaction.options.getString("jmeno");

const prijmeni =
interaction.options.getString("prijmeni");

const datum =
interaction.options.getString("datum");

const narodnost =
interaction.options.getString("narodnost");

const rodnecislo =
interaction.options.getString("rodnecislo");



const cisloPrukazu =
"WF-" + Math.floor(
100000 + Math.random() * 900000
);



db.prepare(`

INSERT INTO identities

(
discord_id,
first_name,
last_name,
birth_date,
nationality,
birth_number,
card_number
)

VALUES (?,?,?,?,?,?,?)

`).run(

user,
jmeno,
prijmeni,
datum,
narodnost,
rodnecislo,
cisloPrukazu

);



await interaction.reply({

content:
"✅ Občanský průkaz byl vydán.",

ephemeral:true

});


}





if(sub === "ukaz"){



const data =
db.prepare(
"SELECT * FROM identities WHERE discord_id = ?"
)
.get(user);



if(!data){

return interaction.reply({

content:
"❌ Nemáš občanský průkaz.",

ephemeral:true

});

}



const embed =
new EmbedBuilder()

.setTitle(
"🇺🇸 WESTFORD RP - IDENTIFICATION CARD"
)

.addFields(

{
name:"👤 Jméno",
value:
`${data.first_name} ${data.last_name}`
},

{
name:"🎂 Datum narození",
value:data.birth_date
},

{
name:"🌎 Státní příslušnost",
value:data.nationality
},

{
name:"🔢 Rodné číslo",
value:data.birth_number
},

{
name:"🆔 Číslo průkazu",
value:data.card_number
},

{
name:"🚗 Řidičský průkaz",
value:data.license
},

{
name:"🔫 Zbrojní průkaz",
value:data.weapon_license
}

)

.setFooter({

text:
"WestFord Government"

});



await interaction.reply({

embeds:[
embed
]

});



}


}

};
