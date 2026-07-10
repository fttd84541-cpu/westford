const Database = require("better-sqlite3");

const db = new Database("westford.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT UNIQUE,
    rp_name TEXT,
    money INTEGER DEFAULT 0,
    bank INTEGER DEFAULT 0
)
`).run();


db.prepare(`
CREATE TABLE IF NOT EXISTS identities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT,
    first_name TEXT,
    last_name TEXT,
    birth_date TEXT,
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


module.exports = db;
