function heuristicData(board, score){
  const monotonicTable = [
    [7,6,5,4],
    [6,5,4,3],
    [5,4,3,2],
    [4,3,2,1]];

  let data = {
    score      : score,
    emptyCells : 0,
    similarity : 0,
    monotonic  : 0,
    maxCell    : 0
  }
  
  // Similarity
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      
      if(board[i][j] !== 0){
        let neighbours = 0,  sim = 0; // ex. |4−4| / 3
        
        for(let x = i-1; x < i+2; x++){
          for(let y = j-1; y < j+2; y++){
            try {
              if(board[x][y] !== 0 && board[x][y] !== undefined){
                neighbours++;
                sim += Math.abs(board[i][j] - board[x][y]);
              }
            } catch (err) {}
          }
        }
        data.similarity += (sim/neighbours);  // ex. (|4−4|+ |4−2|+ |4−4|) / 3
      }

      // Empty Cells
      if(board[i][j] === 0){ data.emptyCells++; }
      
      // Monotonic 
      data.monotonic += (board[i][j] * monotonicTable[i][j]);
      
      // Max
      if(board[i][j] > data.maxCell){ data.maxCell = board[i][j]; }

    }

  }
  return data;
  
}

function heuristicOne(data){
  return data.score + data.monotonic - data.similarity + Math.log(data.score) * data.emptyCells;
}

function heuristicTwo(data){
  return data.monotonic - data.similarity + Math.log(data.score) * data.emptyCells;
}

function heuristicThree(data){
  return data.score - data.similarity + Math.log(data.score) * data.emptyCells;
}

function heuristicFour(data){
  return data.score + (data.emptyCells * Math.log2(data.maxCell)) + data.monotonic;
}

module.exports = {
  heuristic: (board, score, heuristic) =>{
    switch (heuristic) {
      case "h1": return heuristicOne(heuristicData(board, score));
      case "h2": return heuristicTwo(heuristicData(board, score));  
      case "h3": return heuristicThree(heuristicData(board, score));
      case "h4": return heuristicFour(heuristicData(board, score)); 
      default:   return heuristicOne(heuristicData(board, score));
    }
  }

}