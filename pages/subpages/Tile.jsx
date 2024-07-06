// src/Tile.js
import React from 'react';

const Tile = ({ onClick, top, left }) => {
    const tileStyle = {
        top: `${top}px`,
        left: `${left}%`,
        position: 'absolute',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
    };

    return (
        <img
            src="/pinkblum.png"
            alt="falling tile"
            style={tileStyle}
            onClick={onClick}
        />
    );
};

export default Tile;
