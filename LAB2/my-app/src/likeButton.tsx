import React, {useState, useEffect, useContext} from 'react';
import {ThemeContext, themes} from "./themeContext";

export function LikeButton() {
    const [like, setLike] = useState(false);

    useEffect(() => {

    }, [like]);

    const theme = useContext(ThemeContext);

    return (

        <button
            onClick={() => setLike(!like)}
            style={{background: theme.background, color: theme.foreground}}
        >
            {like ? "❤️": "♡"}
        </button>

    );
}

// Wrapper component to provide context
function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };

    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}> Toggle Theme</button>
            <LikeButton/>
        </ThemeContext.Provider>
    );
}

export default ToggleTheme;
