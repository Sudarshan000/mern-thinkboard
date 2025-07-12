import mongoose  from "mongoose" 


// first crate a schema
// then create a model

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    { timestamps: true } // createdAt and updatedAt
); 

const Note = mongoose.model("Note", noteSchema);

export default Note;