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


db.prepare(`
CREATE TABLE IF NOT EXISTS criminal_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT,
    crime TEXT,
    officer TEXT,
    date TEXT
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS economy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT UNIQUE,
    cash INTEGER DEFAULT 500,
    bank INTEGER DEFAULT 5000
)
`).run();


module.exports = db;
