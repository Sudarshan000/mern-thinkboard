import Note from '../models/Note.js';

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});  // Sort by creation date, newest first
    res.status(200).json(notes);
  }
  catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({message: "Note not found"});
    res.status(200).json(note);
  }
  catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({message: "Internal server error"});
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({message: "Title and content are required"});
    }

    const newNote = new Note({
      title,
      content
    });

    await newNote.save();
    res.status(201).json({message: "Note created successfully", note: newNote});
  }
  catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({message: "Internal server error"});
  }
};


export const updateNote = async (req, res) => {
  try{
    const {title, content} = req.body;
    
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

    if (!updatedNote) return res.status(404).json({message: "Note not found"});
    res.status(200).json({message: "Note updated successfully"});
  }
  catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({message: "Internal server error"});
  }
};


export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({message: "Note not found"});
    res.status(200).json({message: "Note deleted successfully"});
  }
  catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({message: "Internal server error"});
  }
};
