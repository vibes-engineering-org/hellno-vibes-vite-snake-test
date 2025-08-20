import React, { useState, useEffect, useCallback, useRef } from 'react';

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const GAME_SPEED = 150;

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const generateFood = useCallback((): Position => {
    const gridWidth = Math.floor(canvasSize.width / GRID_SIZE);
    const gridHeight = Math.floor(canvasSize.height / GRID_SIZE);
    
    return {
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    };
  }, [canvasSize]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      const gridWidth = Math.floor(canvasSize.width / GRID_SIZE);
      const gridHeight = Math.floor(canvasSize.height / GRID_SIZE);

      if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
        setGameOver(true);
        return currentSnake;
      }

      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setScore(prev => prev + 10);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, canvasSize, generateFood]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    const minSwipeDistance = 30;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && direction !== 'LEFT') {
          setDirection('RIGHT');
        } else if (deltaX < 0 && direction !== 'RIGHT') {
          setDirection('LEFT');
        }
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && direction !== 'UP') {
          setDirection('DOWN');
        } else if (deltaY < 0 && direction !== 'DOWN') {
          setDirection('UP');
        }
      }
    }
    
    touchStartRef.current = null;
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  }, [direction]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const maxWidth = Math.min(400, window.innerWidth - 40);
      const size = Math.floor(maxWidth / GRID_SIZE) * GRID_SIZE;
      setCanvasSize({ width: size, height: size });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });

    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
  }, [snake, food, canvasSize]);

  return (
    <div className="xp-window" style={{ maxWidth: '450px', margin: '0 auto' }}>
      <div className="xp-titlebar">
        <span>Snake Game</span>
      </div>
      <div className="xp-panel">
        <div className="score-display">Score: {score}</div>
        
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="game-canvas"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: 'none',
            display: 'block',
            margin: '8px auto'
          }}
        />
        
        {!gameStarted && (
          <div style={{ textAlign: 'center', margin: '8px 0' }}>
            <button className="xp-button" onClick={resetGame}>
              Start Game
            </button>
            <div style={{ fontSize: '10px', marginTop: '8px' }}>
              Use arrow keys or swipe to control
            </div>
          </div>
        )}
        
        {gameOver && (
          <div style={{ textAlign: 'center', margin: '8px 0' }}>
            <div style={{ margin: '8px 0', fontWeight: 'bold' }}>Game Over!</div>
            <button className="xp-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
        
        {gameStarted && !gameOver && (
          <div style={{ textAlign: 'center', margin: '8px 0' }}>
            <button className="xp-button" onClick={() => setGameStarted(false)}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;