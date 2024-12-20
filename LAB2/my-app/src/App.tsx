import './App.css';

import {Label, Note} from "./types"; // Import the Label type from the appropriate module
import {dummyNotesList} from "./constants"; // Import the dummyNotesList from the appropriate module
import {LikeButton} from "./likeButton";
import React, {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useContext, useState} from "react";
import {ThemeContext, themes} from "./themeContext";

function App() {

    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
    };

    const [createNote, setCreateNote] = useState(initialNote);
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    const [favMap, setFavMap] = useState<any>({});
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", createNote.title);
        console.log("content: ", createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
    };

    const removeNote = (deleteNote: Note) => {
        setNotes(notes.filter(note => note !== deleteNote));
    }

    const updateFav = (title: string) => {
        let tempMap = Object.assign({}, favMap);
        tempMap[title] = !favMap[title];
        setFavMap(tempMap);
    }

    function ToggleTheme({setCurrentTheme}: { setCurrentTheme: any}) {
        const currentTheme = useContext(ThemeContext);

        const toggleTheme = () => {
            setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
        };

        return (
            <ThemeContext.Provider value={currentTheme}>
                <button onClick={toggleTheme}> Toggle Theme</button>
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={currentTheme}>
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

                    <ToggleTheme setCurrentTheme={setCurrentTheme}></ToggleTheme>
                </form>

                <div className="notes-grid">
                    {notes.map((note) => (
                        <div key={note.id} className="note-item"
                             style={{background: currentTheme.background, color: currentTheme.foreground}}>
                            <div className="notes-header">
                                <button onClick={() => updateFav(note.title)}>{favMap[note.title] ? "❤️" : "🤍"}</button>
                                <button onClick={() => removeNote(note)}>x</button>
                            </div>
                            <h2 contentEditable="true"> {note.title} </h2>
                            <p contentEditable="true"> {note.content} </p>
                            <p contentEditable="true"> {note.label} </p>
                        </div>
                    ))}
                </div>

                <div>
                    <p>List of Favorites</p>
                    <div>
                        {Object.keys(favMap).map((title: string) => {
                            if (favMap[title]) {
                                return <p>{title}</p>;
                            }
                            return <></>;
                        })}
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
