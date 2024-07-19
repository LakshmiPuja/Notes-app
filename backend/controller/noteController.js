const Note = require('../module/Note');

const createNote= async (req,res)=>{
    const{title,content,backgroundColor,tags,reminder,isArchived,isTrashed} = req.body;
    try{
        console.log(req.body);
        const newNote = await Note.create(req.user.userId,title,content,backgroundColor,tags,reminder,isArchived,isTrashed);
        res.status(201).json({newNote});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error creating note" });
    }
};

const getNotes = async (req,res)=>{
    try{
        const notes = await Note.findAll(req.user.userId);
        res.status(200).json({notes});
    }catch(err){
        res.status(500).json({message:"Error fetching notes"});
    }
};
const updateNote = async(req,res)=>{
    const{noteId} = req.params;
    const {title,content,backgroundColor,tags,reminder,isArchived,isTrashed} = req.body;
    try{
        console.log(req.body);
        await Note.update(noteId,title,content,backgroundColor,tags,reminder,isArchived,isTrashed);
        res.status(200).json({message:"Note updated successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error updating note"});
    }
};

const archiveNote = async (req,res)=>{
    const{noteId} = req.params;
    try{
        console.log(noteId);
        await Note.archive(noteId,req.user.userId);
        res.status(200).json({message:'Note archived successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error archiving note"});
    }
};
const trashNote = async (req,res)=>{
    const {noteId} = req.params;
    try{
        console.log(noteId);
        await Note.trash(noteId,req.user.userId);
        res.status(200).json({message:'Note trashed successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error trashing note"});
    }
};

const getArchiveNotes = async (req,res)=>{
    try{
        const notes = await Note.findArchived(req.user.userId);
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: 'Error fetching archived notes'});
    }
};

const getTrashedNotes = async (req,res)=>{
    try{
        const notes = await Note.findTrashed(req.user.userId);
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: 'Error fetching trashed notes'});
    }
};

module.exports={
    createNote,
    getNotes,
    updateNote,
    archiveNote,
    trashNote,
    getArchiveNotes,
    getTrashedNotes
}
