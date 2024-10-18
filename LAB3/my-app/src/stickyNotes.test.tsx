import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import {ToDoList} from "./toDoList";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });

    test("creates many new s", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note 1" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content 1" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note 1");
        const newNoteContent = screen.getByText("Note content 1");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note 2" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content 2" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle2 = screen.getByText("New Note 2");
        const newNoteContent2 = screen.getByText("Note content 2");

        expect(newNoteTitle2).toBeInTheDocument();
        expect(newNoteContent2).toBeInTheDocument();

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note 3" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content 3" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle3 = screen.getByText("New Note 3");
        const newNoteContent3 = screen.getByText("Note content 3");

        expect(newNoteTitle3).toBeInTheDocument();
        expect(newNoteContent3).toBeInTheDocument();
    });
});

describe("Update StickyNote", () => {
    test("edits first node", () => {
        render(<StickyNotes />);

        const testNoteTitle = screen.getByText("test note 1 title");
        const testNoteContent = screen.getByText("test note 1 content");

        expect(testNoteTitle).toBeInTheDocument();
        expect(testNoteContent).toBeInTheDocument();

        fireEvent.change(testNoteTitle, { target: { innerHTML: "Note 1" } });
        fireEvent.change(testNoteContent, { target: { innerHTML: "Note 1 Content" } });

        const newNoteTitle = screen.getByText("Note 1");
        const newNoteContent = screen.getByText("Note 1 Content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

describe("remove StickyNote", () => {
    test("deletes first note", () => {
        render(<StickyNotes />);

        const testNoteTitle = screen.getByText("test note 1 title");
        const testNoteContent = screen.getByText("test note 1 content");

        expect(testNoteTitle).toBeInTheDocument();
        expect(testNoteContent).toBeInTheDocument();

        const testNote1Delete = screen.getByTestId("x" + 1);
        fireEvent.click(testNote1Delete);

        const testNoteTitle2 = screen.queryByText("test note 1 title")
        const testNoteContent2 = screen.queryByText("test note 1 content");

        expect(testNoteTitle2).toBeNull();
        expect(testNoteContent2).toBeNull();
    });
});

describe("list items displayed", () => {
    test("displays items", () => {
        render(<ToDoList />);

        const item1 = screen.getByText("Apples");
        const item2 = screen.getByText("Bananas");

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
    });
});

describe("checks todolist display", () => {
    test("displays and checks items", () => {
        render(<ToDoList />);

        const item1 = screen.getByTestId("Apples");
        const item2 = screen.getByTestId("Bananas");
        const title0 = screen.getByText("Items bought: 0");

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
        expect(title0).toBeInTheDocument();

        fireEvent.click(item1);

        const title1 = screen.getByText("Items bought: 1");
        expect(title1).toBeInTheDocument();
    });
});
