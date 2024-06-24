import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const Game = () => {
    const navigate = useNavigate();
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState(generateFood());
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) navigate('/');
    }, []);

    function generateFood() {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    }

    const moveSnake = useCallback(() => {
        if (gameOver || !gameStarted) return;

        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        head.x += direction.x;
        head.y += direction.y;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setGameOver(true);
            return;
        }

        if (head.x === food.x && head.y === food.y) {
            setFood(generateFood());
            setScore(score + 1);
        } else {
            newSnake.pop();
        }

        newSnake.unshift(head);
        setSnake(newSnake);
    }, [snake, direction, food, gameOver, score, gameStarted]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameStarted) return;

            switch (e.key) {
                case 'ArrowUp':
                    setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameStarted]);

    useEffect(() => {
        const gameLoop = setInterval(moveSnake, 100);
        return () => clearInterval(gameLoop);
    }, [moveSnake]);

    const startGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setGameOver(false);
        setScore(0);
        setGameStarted(true);
    };

    const addScore = async () => {
        try {
            const response = await axios.post('http://localhost:5000/snake-game/score', { score }, {
                headers: {
                    Authorization: `Bearer ${userInfo?.token}`
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!gameOver) return;
        addScore();
    }, [gameOver]);

    const renderGrid = () => {
        const grid = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                const isFood = food.x === x && food.y === y;
                const cellClass = isSnake ? 'snake' : isFood ? 'food' : '';
                grid.push(
                    <div key={`${x}-${y}`} className={`cell ${cellClass}`}></div>
                );
            }
        }
        return grid;
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <h2>Snake Game</h2>
                <div className="score">Score: {score}</div>
            </div>
            <div className="game-grid" style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            }}>
                {renderGrid()}
            </div>
            <div className="game-controls">
                {!gameStarted && !gameOver && (
                    <button className="btn btn-primary btn-lg" onClick={startGame}>Start Game</button>
                )}
                {gameOver && (
                    <div>
                        <h3>Game Over!</h3>
                        <button className="btn btn-primary btn-lg" onClick={startGame}>Play Again</button>
                    </div>
                )}
            </div>
            <div className="game-instructions">
                <h4>How to Play:</h4>
                <p>Use arrow keys to control the snake. Eat the food to grow and earn points. Don't hit the walls or yourself!</p>
            </div>
        </div>
    );
};

export default Game;