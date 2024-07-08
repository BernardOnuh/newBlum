import React, { useState, useEffect, useRef } from 'react';
import Tile from './Tile';

const Play = () => {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
    const [gameOver, setGameOver] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (gameOver) return;

        const gameInterval = setInterval(() => {
            addTiles();
            moveTiles();
        }, 100); // Increase interval to slow down tile generation

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
        const numTiles = Math.floor(Math.random() * 1) + 1; // Random number between 1 and 2 to reduce tile count
        const newTiles = Array.from({ length: numTiles }, () => ({
            id: Math.random(),
            top: 0,
            left: Math.random() * 100, // Random left position between 0 and 100%
            size: Math.random() * 30 + 20, // Random size between 20 and 50
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
        setTiles(prevTiles => prevTiles.filter(tile => tile.id !== id));
        setScore(prevScore => prevScore + 1);
    };

    const endGame = () => {
        setGameOver(true);
    };

    const resetGame = () => {
        setTiles([]);
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
    };

    return (
        <div
            id="game-container"
            ref={containerRef}
            className="relative w-[100vw] h-screen overflow-hidden"
        >
            <div id="score" className="absolute text-black top-1 left-2 text-xl">
                Score: {score}
            </div>
            <div id="timer" className="absolute text-black top-1 right-2 text-xl">
                Time Left: {timeLeft}s
            </div>
            <div id="tiles-container" className="absolute top-0 w-full h-full">
                {tiles.map(tile => (
                    <Tile
                        key={tile.id}
                        onClick={() => handleTileClick(tile.id)}
                        top={tile.top}
                        left={tile.left}
                        size={tile.size}
                    />
                ))}
            </div>
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-black rounded-md border border-[#1F7DF1] p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl mb-4">Game Over!</h2>
                        <p className="mb-4">Your score is {score}</p>
                        <button
                            onClick={resetGame}
                            className="bg-[#1F7DF1] font-semibold text-white px-4 py-2 rounded"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export
