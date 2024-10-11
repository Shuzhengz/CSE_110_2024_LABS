import './App.css';

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { LikeButton } from "./likeButton";
import {useState} from "react";

const fav = [{}]

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

    return (
        <div className='app-container'>
            <form className="note-form" onSubmit={createNoteHandler}>
                <div>
                    <input
                        placeholder="Note Title"
                        onChange={(event) =>
                            setCreateNote({ ...createNote, title: event.target.value })}
                        required>
                    </input>
                </div>

                <div>
      	<textarea
            onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
            required>
      	</textarea>
                </div>

                <div>
                    <select
                        onChange={(event) =>
                            setCreateNote({ ...createNote, label: event.target.value as Label})}
                        required>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>

                <div><button type="submit">Create Note</button></div>
            </form>

            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="note-item"
                    >
                        <div className="notes-header">
                            <LikeButton/>
                            <button>x</button>
                        </div>
                        <h2> {note.title} </h2>
                        <p> {note.content} </p>
                        <p> {note.label} </p>
                    </div>
                ))}
            </div>
        </div>  );
}

export default App;
