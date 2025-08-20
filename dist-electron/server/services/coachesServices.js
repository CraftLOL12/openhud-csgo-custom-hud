import db from "../../database/database.js";
export const getCoaches = () => {
    const sql = `SELECT * FROM coaches`;
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error("Error getting coaches: ", err.message);
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
};
export const createCoach = (steamid) => {
    const sql = `
  INSERT INTO coaches (steamid)
  VALUES (?)
`;
    return new Promise((resolve, reject) => {
        db.run(sql, [steamid], function (err) {
            if (err) {
                console.error("Error inserting coach:", err.message);
                reject(err);
            }
            else {
                resolve(steamid);
            }
        });
    });
};
export const deleteCoach = (steamid) => {
    const sql = `DELETE FROM coaches WHERE steamid = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [steamid], function (err) {
            if (err) {
                console.error("Error deleting coach :", err.message);
                reject(err);
            }
            else {
                resolve("Coach deleted");
            }
        });
    });
};
