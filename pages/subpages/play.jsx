import React, { useState, useEffect, useRef } from 'react';
import Tile from './Tile';
import Script from 'next/script';
import Link from 'next/link';

const Play = () => {
    const [tiles, setTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
    const [gameOver, setGameOver] = useState(false);
    const [username, setUsername] = useState('Anon'); // Add state for username
    const containerRef = useRef(null);
    const scoreRef = useRef(score);

    useEffect(() => {
        // Fetch the Telegram user data and set the username
        const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
        if (user) {
            setUsername(user.username || 'bernardblockchain');
        }

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
                    setGameOver(true);
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

    useEffect(() => {
        scoreRef.current = score; // Keep the score ref updated
    }, [score]);

    useEffect(() => {
        if (gameOver) {
            endGame(scoreRef.current); // Use the most recent score
        }
    }, [gameOver]);

    const addTiles = () => {
        const numTiles = Math.floor(Math.random() * 1) + 1; // Random number between 1 and 1 to reduce tile count
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

    const endGame = async (finalScore) => {
        try {
            const response = await fetch('https://ton-diamonddb.onrender.com/api/ton-diamond/update-score', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username, // Use dynamic username
                    score: finalScore,
                }),
            });
            console.log('username',username)
            console.log('score:', finalScore);
            const data = await response.json();
            if (!response.ok) {
                console.error('Failed to update user score:', data.message);
            } else {
                console.log("Score updated successfully:", data);
            }
        } catch (error) {
            console.error("Failed to update user score:", error);
        }
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
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            <div>{username}</div> {/* Use the username state */}
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
                        <div>
                            <Link href="/">
                                <button
                                    onClick={resetGame}
                                    className="bg-[#1F7DF1] font-semibold text-white px-4 py-2 my-2 rounded"
                                >
                                    Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Play;
