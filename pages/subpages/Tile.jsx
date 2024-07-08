import React from 'react';

const Tile = ({ onClick, top, left, size }) => {
    const tileStyle = {
        top: `${top}px`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
    };

    const handleTouch = (event) => {
        event.preventDefault(); // Prevent default behavior to avoid any potential issues with touch events
        onClick();
    };

    return (
        <img
            src="/diamond.png"
            alt="falling tile"
            style={tileStyle}
            onClick={onClick}
            onTouchStart={handleTouch}
        />
    );
};

export default Tile;
