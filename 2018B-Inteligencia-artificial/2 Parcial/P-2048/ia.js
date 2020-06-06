
const {
  heuristic,
  } = require('./heuristic.js');


class IA {
  genFlie(board){
    // flie contiene todos los movimientos posibles de max sin repetir
    let flie = [];

    // Las jugadas para max siempre van a ser 4 por las direcciones que se puede mover. (Derecha, Izquierda, Arriba, Abajo)
    const movMax = [
      { action: 'up',    value: 0, board: this.moveUp(board),    childrens: [] },
      { action: 'right', value: 0, board: this.moveRight(board), childrens: [] },
      { action: 'down',  value: 0, board: this.moveDown(board),  childrens: [] },
      { action: 'left',  value: 0, board: this.moveLeft(board),  childrens: [] }];
    
    // añadimos los tableros posibles de movimientos sin repetir el original
    movMax.forEach(mov => {
      if(this.boardMoved(board, mov.board.board)){
        flie.push(mov);
      }
    });
    
    // Las jugadas para min seran el numero de casillas vacias multiplicado por 2 (porque puede ponerse aleatoriamente un 2 o un 4)
    flie.forEach(max => {
      // La variable 'auxBoard' guardara la jugada de min añadiendo un 2 o 4 en una celda
      for (let i = 0; i < max.board.board.length; i++) {
        for (let j = 0; j < max.board.board[i].length; j++) {
          if(max.board.board[i][j] === 0){
            [2, 4].forEach(cellValue => {
              // Clonamos el board para no modificar el original
              let auxBoard = max.board.board.map((arr) =>{ return arr.slice(); });
              auxBoard[i][j] = cellValue;
              max.childrens.push({value:0, board: auxBoard});
            });
          }
        }
      }
    });

    return flie;
  }

  minmax(board, score){
    let flie = this.genFlie(board);
    // Obtener valores de la heuristica
    flie.forEach(max =>{
      let bestMin = Number.MAX_SAFE_INTEGER;
      // console.log(max);
      max.childrens.forEach(min => {
        const minValue = heuristic(min.board, score, this.heuristicNumber);
        min.value = minValue;
        // Obtenemos el valor mas bajo de min, o sea la peor jugada para min
        if (minValue < bestMin){ bestMin = minValue; }
      });
      max.value = bestMin;
    });

    // Ordenar los valores de mayor a menor porque quizas la mejor jugada no pueda  realizarse en el tablero
    flie.sort((a,b) => (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0));

    // Obtenemos la mejor jugada que se puede generar y realizar
    for (let i = 0; i < flie.length; i++) {
      if(this.boardMoved(this.state.board, flie[i].board.board)){
        // console.log("Mejor mueve %s tiene un valor de %f", flie[i].action, flie[i].value );
        return flie[i];
      }
    }
  }

}

module.exports = IA;