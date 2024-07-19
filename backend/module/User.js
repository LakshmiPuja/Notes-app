const db = require("../config/db");

class User {
    static async create(username, password) {
        const createdAt = new Date();
        const [result] = await db.execute('INSERT INTO user (username, password, created_at) VALUES (?, ?, ?)', [username, password, createdAt]);
        return result.insertId;
    }

    static async findByUserName(username) {
        const [user] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);
        return user[0];
    }
}

module.exports = User;
