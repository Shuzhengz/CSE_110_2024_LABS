import React from 'react';

export const themes = {
    light: {
        foreground: '#ff0000',
        background: 'rgba(255,255,255,0)',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

export const ThemeContext = React.createContext(themes.light);
