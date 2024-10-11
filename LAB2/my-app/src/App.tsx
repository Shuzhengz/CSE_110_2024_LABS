import './App.css';

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { LikeButton } from "./likeButton";
import {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react";

const fav: string[] = [];

function App() {

    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
    };

    const [createNote, setCreateNote] = useState(initialNote);

    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", createNote.title);
        console.log("content: ", createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
    };

    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

    function removeNote() {
        alert('remove');
    }

    return (
        <div className='app-container'>
            <form className="note-form" onSubmit={createNoteHandler}>
                <div>
                    <input
                        placeholder="Note Title"
                        onChange={(event) =>
                            setCreateNote({...createNote, title: event.target.value})}
                        required>
                    </input>
                </div>

                <div>
      	<textarea
            onChange={(event) =>
                setCreateNote({...createNote, content: event.target.value})}
            required>
      	</textarea>
                </div>

                <div>
                    <select
                        onChange={(event) =>
                            setCreateNote({...createNote, label: event.target.value as Label})}
                        required>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>

                <div>
                    <button type="submit">Create Note</button>
                </div>
            </form>

            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="note-item"
                    >
                        <div className="notes-header">
                            <LikeButton></LikeButton>
                            <button onClick={removeNote}>x</button>
                        </div>
                        <h2 contentEditable="true"> {note.title} </h2>
                        <p contentEditable="true"> {note.content} </p>
                        <p contentEditable="true"> {note.label} </p>
                    </div>
                ))}
            </div>

            <div>
                <p>List of Favorites</p>

            </div>
        </div>);
}

export default App;
