// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import Tile from './Tile';

const Play = () => {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
    const [gameOver, setGameOver] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (gameOver) return;

        const gameInterval = setInterval(() => {
            addTiles();
            moveTiles();
        }, 50);

        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(gameInterval);
                    clearInterval(timerInterval);
                    endGame();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
        };
    }, [gameOver]);

    const addTiles = () => {
        const numTiles = Math.floor(Math.random() * 1) + 1; // Random number between 3 and 5
        const newTiles = Array.from({ length: numTiles }, () => ({
            id: Math.random(),
            top: 0,
            left: Math.random() * 300 // Random left position between 0 and 100%
        }));
        setTiles(prevTiles => [...newTiles, ...prevTiles]);
    };

    const moveTiles = () => {
        const containerHeight = containerRef.current.clientHeight;
        setTiles(prevTiles => {
            const updatedTiles = prevTiles.map(tile => ({
                ...tile,
                top: tile.top + 15
            })).filter(tile => tile.top < containerHeight);

            return updatedTiles;
        });
    };

    const handleTileClick = (id) => {
        setScore(score + 1);
        setTiles(tiles.filter(tile => tile.id !== id));
    };

    const endGame = () => {
        setGameOver(true);
    };

    const resetGame = () => {
        setTiles([]);
        setScore(0);
        setTimeLeft(60);
        setGameOver(false);
    };

    return (
        <div
            id="game-container"
            ref={containerRef}
            className="relative w-[100vw] h-screen overflow-hidden "
        >
            <div id="score" className="absolute top-1 left-2 text-xl">
                Score: {score}
            </div>
            <div id="timer" className="absolute top-1 right-2 text-xl">
                Time Left: {timeLeft}s
            </div>
            <div id="tiles-container" className="absolute top-0 w-full h-full">
                {tiles.map(tile => (
                    <Tile
                        key={tile.id}
                        onClick={() => handleTileClick(tile.id)}
                        top={tile.top}
                        left={tile.left}
                    />
                ))}
            </div>
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-black rounded-md border border-[#ff6ec7] p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl mb-4">Game Over!</h2>
                        <p className="mb-4">Your score is {score}</p>
                        <button
                            onClick={resetGame}
                            className="bg-[#ff6ec7] font-semibold text-black px-4 py-2 rounded"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Play;
