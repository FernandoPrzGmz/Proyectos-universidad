const graphlib = require('graphlib');

const {
  heuristic,
  } = require('./heuristic.js');

const fs = require('fs');

function saveFile(str){
  fs.writeFile("./graph.json", str, (err) =>{
    if (err) { return console.log(err); }
    console.log("The file was saved!");
  });
}

class IA {
  minmax(graph){

  }

  genGraph(board){
    // console.log("--->");
    let graph = new graphlib.Graph();
    graph.setNode('origin', { level:"-", action: '', value: 0, board, });
    // console.log(graphlib.json.write(graph));
    
    this.genFlie(graph, 'origin', board, 0)
    const graphSinks =  graph.sinks();

    for (let i = 1; i < this.depthLevel+1; i++) {
      const graphSinks =  graph.sinks();

      graphSinks.forEach(nodeMin => {
        const nodeData = graph.node(nodeMin);
        this.genFlie(graph, nodeMin, nodeData.board, i)
      });
    }
    saveFile(JSON.stringify(graphlib.json.write(graph), null, 2));

    // console.log("--> origin"); 
    // console.log('father', graph.predecessors('origin')); 
    // console.log('children', graph.successors('origin'));


    // console.log('father', graph.predecessors('max-0-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,0]]')); 
    // console.log("--> max-0-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,0]]"); 
    // console.log('children', graph.successors('max-0-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,0]]'));
    
    // console.log('father', graph.predecessors('min-0-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,4]]')); 
    // console.log('-->min-0-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,4]]'); 
    // console.log('children', graph.successors('min-0-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,4]]'));
    
    // console.log('father', graph.predecessors('max-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,4,0,0]]')); 
    // console.log("-->max-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,4,0,0]]"); 
    // console.log('children', graph.successors('max-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,4,0,0]]'));

    // console.log('father', graph.predecessors('min-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,4,0,4]]')); 
    // console.log("-->min-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,4,0,4]]"); 
    // console.log('children', graph.successors('min-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,4,0,4]]'));
    
    // console.log('father', graph.predecessors('max-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,4]]')); 
    // console.log(graph.node('max-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,4]]'));
    // console.log('children', graph.successors('max-1-[[0,0,0,0],[0,0,0,0],[0,0,0,0],[8,0,0,4]]'));
  }
  genFlie(graph, root, board, level){
    // Añadimos max
    const max = this.genMax(board, level);
    max.forEach(ele => {
      graph.setNode('max-'+level+'-'+JSON.stringify(ele.board.board), ele);
      graph.setEdge(root, 'max-'+level+'-'+JSON.stringify(ele.board.board));
    });
    
    // Añadimos min
    graph.successors(root).forEach(father => {
      const min = this.genMin(graph.node(father).board.board, level);
      min.forEach(ele => {
        graph.setNode('min-'+level+'-'+JSON.stringify(ele.board), ele);
        graph.setEdge(father, 'min-'+level+'-'+JSON.stringify(ele.board));
      });
    });
  }
  genMax(board, level){
    // Las jugadas para max siempre van a ser 4 por las direcciones que se puede mover. (Derecha, Izquierda, Arriba, Abajo)
    const movMax = [
      { level, type: 'max', action: 'up',    value: 0, board: this.moveUp(board),    },
      { level, type: 'max', action: 'right', value: 0, board: this.moveRight(board), },
      { level, type: 'max', action: 'down',  value: 0, board: this.moveDown(board),  },
      { level, type: 'max', action: 'left',  value: 0, board: this.moveLeft(board),  }];
  
    // flie contiene todos los movimientos posibles de max sin repetir
    let maxArray = [];
    // añadimos los tableros posibles de movimientos sin repetir el original
    movMax.forEach(mov => {
      if(this.boardMoved(board, mov.board.board)){
        maxArray.push(mov);
      }
    });
    return maxArray;
  }
  genMin(board, level){
    let minArray = [];

    // La variable 'auxBoard' guardara la jugada de min añadiendo un 2 o 4 en una celda
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if(board[i][j] === 0){
          [2, 4].forEach(cellValue => {
            // Clonamos el board para no modificar el original
            let auxBoard = board.map((arr) =>{ return arr.slice(); });
            auxBoard[i][j] = cellValue;
            minArray.push({level, type:'min', value:0, board: auxBoard});
          });
        }
      }
    }
    return minArray;
  }

}

module.exports = IA;