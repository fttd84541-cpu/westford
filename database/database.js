const Database = require("better-sqlite3");

const db = new Database("westford.db");


db.prepare(`
CREATE TABLE IF NOT EXISTS identities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    birth_date TEXT,
    nationality TEXT,
    birth_number TEXT,
    card_number TEXT,
    license TEXT DEFAULT 'Ne',
    weapon_license TEXT DEFAULT 'Ne'
)
`).run();


module.exports = db;
