const db  = require('../config/db');

class Note{

    static async create(userId,title,content,backgroundColor,tags,reminder,isArchive,isTrashed){
        const createdAt = new Date();
        const updatedAt = new Date();
        const tagStrings = tags.join(",");
        const[result] = await db.execute(
            'INSERT INTO notes(user_id,title,content,background_color,tags,reminder,is_archived,is_trashed,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [userId,title,content,backgroundColor,tagStrings,reminder,isArchive,isTrashed,createdAt,updatedAt]);
            return result.insertId;
    }
    static async findAll(userId){
        const[notes] = await db.execute(
            'SELECT * FROM notes WHERE user_id=?',[userId]);
            return notes;
    }

    static async update(noteId, title, content, backgroundColor, tags, reminder, isArchived, isTrashed) {
        const updatedAt = new Date();
        
        // Handle undefined values and replace with null
        const params = [
            title || null,
            content || null,
            backgroundColor || null,
            tags || null, 
            reminder || null,
            isArchived ,
            isTrashed ,
            updatedAt
        ];

        const [result] = await db.execute(
            'UPDATE notes SET title=?, content=?, background_color=?, tags=?, reminder=?, is_archived=?, is_trashed=?, updated_at=? WHERE id=?',
            [...params, noteId]
        );

        return result;
    }

    static async archive(noteId,userId){
        const updatedAt = new Date();
        await  db.execute(
            'UPDATE notes SET is_archived=1,updated_at=? WHERE id=? AND user_id=?',[updatedAt,noteId,userId]);
    }
    static async trash(noteId,userId){
        const updatedAt = new Date();
        await  db.execute(
            'UPDATE notes SET is_trashed=1,updated_at=? WHERE id=? AND user_id=?',[updatedAt,noteId,userId]);
    }
    static async findArchived(userId){
        const [result] = await db.execute(
            'SELECT * FROM notes WHERE user_id=? AND is_archived=1',[userId]);
            return result;
    }
    static async findTrashed(userId){
        const [result] = await db.execute(
            'SELECT * FROM notes WHERE user_id=? AND is_trashed=1',[userId]);
            return result;
    }

}
module.exports = Note;