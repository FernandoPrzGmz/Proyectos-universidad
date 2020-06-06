const delay = require('delay');
const IA = require('./ia.js');

class Game extends IA{
  constructor(heuristic) {
    super();
    this.state = {
      board: [[0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]],
      board2: null,
      score: 0,
      gameOver: false,
      message: null,
    };
    this.heuristicNumber = heuristic || "h1";
    this.initBoard();
  }
  // Se crea el tablero inicial con dos numeros random
  initBoard() {
    let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    board = this.placeRandom(this.placeRandom(board));
    this.state.score = 0;

    // this.setState({board, score: 0, gameOver: false, message: null});
    this.state.board = board;
    this.state.gameOver = false;
    // this.str(this.state.board, this.state.score);
  }
  getBlankCoordinates(board) {
    const blankCoordinates = [];
    
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {blankCoordinates.push([r, c])}
      }
    }
            
    return blankCoordinates;
  }
  randomStartingNumber() {
    const startingNumbers = [2,4];
    const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }
  // Coloca unnumero random en una coordenada vacia
  placeRandom(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = this.randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }
  // Compara dos tableros para verificar si se realizo algun cambio
  boardMoved(original, updated) {
    return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
  }
  // Se mueve el tablero dependiendo de la direccion (up, down, right, left) y checa si aun podemos movernos en el tablero 
  move(direction) {
    if (!this.state.gameOver) {
      if (direction === 'up') {
        const movedUp = this.moveUp(this.state.board);
        if (this.boardMoved(this.state.board, movedUp.board)) {
          const upWithRandom = this.placeRandom(movedUp.board);
          
          if (this.checkForGameOver(upWithRandom)) {
            // this.setState({board: upWithRandom, gameOver: true, message: 'Game over!'});
            this.state.board    = upWithRandom;
            this.state.gameOver = true;
          } else {
            // this.setState({board: upWithRandom, score: this.state.score += movedUp.score});  
            this.state.board = upWithRandom;
            this.state.score += movedUp.score;
          }
        }
      } else if (direction === 'right') {
        const movedRight = this.moveRight(this.state.board);
        if (this.boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = this.placeRandom(movedRight.board);
          
          if (this.checkForGameOver(rightWithRandom)) {
            // this.setState({board: rightWithRandom, gameOver: true, message: 'Game over!'});
            this.state.board    = rightWithRandom;
            this.state.gameOver = true;
          } else {
            // this.setState({board: rightWithRandom, score: this.state.score += movedRight.score});  
            this.state.board = rightWithRandom;
            this.state.score += movedRight.score;
          }
        }
      } else if (direction === 'down') {
        const movedDown = this.moveDown(this.state.board);
        if (this.boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = this.placeRandom(movedDown.board);
          
          if (this.checkForGameOver(downWithRandom)) {
            // this.setState({board: downWithRandom, gameOver: true, message: 'Game over!'});
            this.state.board    = downWithRandom;
            this.state.gameOver = true;
          } else {
            // this.setState({board: downWithRandom, score: this.state.score += movedDown.score});
            this.state.board = downWithRandom;
            this.state.score += movedDown.score;
          }
        }
      } else if (direction === 'left') {
        const movedLeft = this.moveLeft(this.state.board);
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.placeRandom(movedLeft.board);
          
          if (this.checkForGameOver(leftWithRandom)) {
            // this.setState({board: leftWithRandom, gameOver: true, message: 'Game over!'});  
            this.state.board    = leftWithRandom;
            this.state.gameOver = true;
          } else {
            // this.setState({board: leftWithRandom, score: this.state.score += movedLeft.score});
            this.state.board = leftWithRandom;
            this.state.score += movedLeft.score;
          }
        }
      }
      // this.setState({ board2: this.state.board });
      this.state.board2 = this.state.board;

      
    }  
    else {
      // this.setState({message: 'Game over. Please start a new game.'});
    }
  }
  moveUp(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];
      for (let c = 0; c < rotatedRight[r].length; c++) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = this.rotateLeft(board);

    return {board, score};
  }
  moveRight(inputBoard) {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];      
      for (let c = 0; c < inputBoard[r].length; c++) {
        let current = inputBoard[r][c];
        (current === 0) ? row.unshift(current) : row.push(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = board[r].length - 1; c >= 0; c--) {
        if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c - 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
          board[r][c] = board[r][c - 1];
          board[r][c - 1] = 0;
        }
      }
    }

    return {board, score};
  }
  moveDown(inputBoard) {
    let rotatedRight = this.rotateRight(inputBoard);
    let board = [];
    let score = 0;

    for (let r = 0; r < rotatedRight.length; r++) {
      let row = [];      
      for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
        let current = rotatedRight[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }

    // Rotate board back upright
    board = this.rotateLeft(board);

    return {board, score};
  }
  moveLeft(inputBoard) {
    let board = [];
    let score = 0;

    for (let r = 0; r < inputBoard.length; r++) {
      let row = [];      
      for (let c = inputBoard[r].length - 1; c >= 0; c--) {
        let current = inputBoard[r][c];
        (current === 0) ? row.push(current) : row.unshift(current);
      }
      board.push(row);
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
          board[r][c] = board[r][c] * 2;
          board[r][c + 1] = 0;
          score += board[r][c];
        } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
          board[r][c] = board[r][c + 1];
          board[r][c + 1] = 0;
        }
      }
    }
    
    return {board, score};
  }
  rotateRight(matrix) {
    let result = [];
	
  	for (let c = 0; c < matrix.length; c++) {
	  	let row = [];
	  	for (let r = matrix.length - 1; r >= 0; r--) {
			  row.push(matrix[r][c]);
		  }
      result.push(row);
	  }
	
	  return result;
  }
  rotateLeft(matrix) {
  	let result = [];

    for (let c = matrix.length - 1; c >= 0; c--) {
      let row = [];
      for (let r = matrix.length - 1; r >= 0; r--) {
        row.unshift(matrix[r][c]);
      }
      result.push(row);
    }

    return result;
  }
  // Ver si podemos hacer movimientos o si ya no se puede mover
  checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, this.moveUp(board).board),
      this.boardMoved(board, this.moveRight(board).board),
      this.boardMoved(board, this.moveDown(board).board),
      this.boardMoved(board, this.moveLeft(board).board)
    ];
    return (moves.includes(true)) ? false : true;
  }

  // 
  str(board, score){
    console.log("Puntuacion: [%d]", score);
    board.forEach(row => {
      console.log(row);
    });

  }

  async play(time){
    let aux = 0;
    while(!this.state.gameOver){
      console.log("---------------------------");
      console.log("Con la heuristica: %s", this.heuristicNumber);
      const bestAction = this.minmax(this.state.board, this.state.score);
      console.log("Mejor opcion, mover: ", bestAction.action);
      this.str(this.state.board, this.state.score);
      if(bestAction == undefined){
        console.log("undefined");
        this.move('up');
      } else {
        this.move(bestAction.action);
      }
      aux++
      await delay(time || 1000);
    }
  }

}

module.exports = Game;