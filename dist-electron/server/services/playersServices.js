import db from "../../database/database.js";
export const getPlayers = () => {
    const sql = `SELECT * FROM players`;
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error("Error getting teams: ", err.message);
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
export const createPlayer = (player) => {
    const sql = `
  INSERT INTO players (_id, firstName, lastName, username, avatar, country, steamid, team, extra)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    return new Promise((resolve, reject) => {
        db.run(sql, [
            player._id,
            player.firstName,
            player.lastName,
            player.username,
            player.avatar,
            player.country,
            player.steamid,
            player.team,
            player.extra,
        ], function (err) {
            if (err) {
                console.error("Error inserting player:", err.message);
                reject(err);
            }
            else {
                console.log(`Player ${player.username} created with ID ${player._id}`);
                resolve(player);
            }
        });
    });
};
export const deletePlayer = (id) => {
    const sql = `DELETE FROM players WHERE _id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if (err) {
                console.error("Error deleting player :", err.message);
                reject(err);
            }
            else {
                console.log(`Player deleted`);
                resolve("Player deleted");
            }
        });
    });
};
export const updatePlayer = (id, player) => {
    const sql = `UPDATE players SET firstName = ?, lastName = ?, username = ?, avatar = ?, country = ?, steamid = ?, team = ?, extra = ? WHERE _id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [
            player.firstName,
            player.lastName,
            player.username,
            player.avatar,
            player.country,
            player.steamid,
            player.team,
            player.extra,
            id,
        ], function (err) {
            if (err) {
                console.error("Error updating player :", err.message);
                reject(err);
            }
            else {
                console.log(`Player updated with id: ${id}`);
                resolve(`Player updated with id: ${id}`);
            }
        });
    });
};
export const getPlayerBySteamId = (steamid) => {
    const sql = `SELECT * FROM players WHERE steamid = ?`;
    return new Promise((resolve, reject) => {
        db.get(sql, [steamid], function (err, row) {
            if (err) {
                console.error("Error finding finding:", err.message);
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
};
