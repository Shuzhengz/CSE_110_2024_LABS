import React, {useContext, useState} from "react";
import {dummyNotesList} from "./constants";
import {Label, Note} from "./types";
import {ThemeContext, themes} from "./themeContext";

export const StickyNotes = () => {
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

    const selectsNote = (note: Note) => {
        setSelectedNote(note);
        console.log(selectedNote);
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
            placeholder="Note Content"
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
                        <div key={note.id} className="note-item" onClick={() => selectsNote(note)}
                             style={{background: currentTheme.background, color: currentTheme.foreground}}
                             data-testid={note.id}>
                            <div className="notes-header">
                                <button onClick={() => updateFav(note.title)}>{favMap[note.title] ? "❤️" : "🤍"}</button>
                                <button onClick={() => removeNote(note)} data-testid={"x" + note.id}>x</button>
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