import copy, sys

class Flies():
  def __init__(self, state, bool_symbol):
    self.win = False
    self.state       = state
    self.bool_symbol = bool_symbol # True  --> X,  False --> O
    self.symbol      = 'X' if (self.bool_symbol==True) else 'O' # True  --> X,  False --> O
  def create_max(self):
    # Crear Max
    states = []
    for i in range(len( self.state )):
      for j in range(len( self.state[i] )):
        if (self.state[i][j] == '_'):
          new_state = copy.deepcopy(self.state)
          new_state[i][j] = 'X' if (self.bool_symbol==True) else 'O'
          states.append( States(new_state, self.bool_symbol) )
    return states



class States():
  # Max
  def __init__(self, _max, bool_symbol):
    self.bool_symbol_max = bool_symbol  # True  --> X,  False --> O
    self.symbol_max = 'X' if (self.bool_symbol_max==True) else 'O'
    
    self.bool_symbol_min = not self.bool_symbol_max
    self.symbol_min = 'X' if (self.bool_symbol_min==True) else 'O'
    
    self.max = _max
    self.min = self.create_min()

    self.heuristica = self.get_heuristica()

  def create_min(self):
    # Crear Min
    states = []
    for i in range(len( self.max )):
      for j in range(len( self.max[i] )):
        if (self.max[i][j] == '_'):
          new_state = copy.deepcopy(self.max)
          new_state[i][j] = self.symbol_min
          states.append( new_state )
    return states

  def get_heuristica(self):
    num = sys.maxint
    for _min in self.min:
      count_maxmin = [0,0]
      symbol_maxmin = [self.symbol_max, self.symbol_min]
      for i in range(len(symbol_maxmin)):
        # Diagonales
        if (_min[0][0]=='_' or _min[0][0]==symbol_maxmin[i]) and  (_min[1][1]=='_' or _min[1][1]==symbol_maxmin[i]) and (_min[2][2]=='_' or _min[2][2] == symbol_maxmin[i]):
          count_maxmin[i] += 1
        if (_min[0][2]=='_' or _min[0][2]==symbol_maxmin[i]) and  (_min[1][1]=='_' or _min[1][1]==symbol_maxmin[i]) and (_min[2][0]=='_' or _min[2][0] == symbol_maxmin[i]):
          count_maxmin[i] += 1

        # Filas
        if (_min[0][0]=='_' or _min[0][0]==symbol_maxmin[i]) and  (_min[0][1]=='_' or _min[0][1]==symbol_maxmin[i]) and (_min[0][2]=='_' or _min[0][2] == symbol_maxmin[i]):
          count_maxmin[i] += 1
        if (_min[1][0]=='_' or _min[1][0]==symbol_maxmin[i]) and  (_min[1][1]=='_' or _min[1][1]==symbol_maxmin[i]) and (_min[1][2]=='_' or _min[1][2] == symbol_maxmin[i]):
          count_maxmin[i] += 1
        if (_min[2][0]=='_' or _min[2][0]==symbol_maxmin[i]) and  (_min[2][1]=='_' or _min[2][1]==symbol_maxmin[i]) and (_min[2][2]=='_' or _min[2][2] == symbol_maxmin[i]):
          count_maxmin[i] += 1

        # Columnas
        if (_min[0][0]=='_' or _min[0][0]==symbol_maxmin[i]) and  (_min[1][0]=='_' or _min[1][0]==symbol_maxmin[i]) and (_min[2][0]=='_' or _min[2][0] == symbol_maxmin[i]):
          count_maxmin[i] += 1
        if (_min[0][1]=='_' or _min[0][1]==symbol_maxmin[i]) and  (_min[1][1]=='_' or _min[1][1]==symbol_maxmin[i]) and (_min[2][1]=='_' or _min[2][1] == symbol_maxmin[i]):
          count_maxmin[i] += 1
        if (_min[0][2]=='_' or _min[0][2]==symbol_maxmin[i]) and  (_min[1][2]=='_' or _min[1][2]==symbol_maxmin[i]) and (_min[2][2]=='_' or _min[2][2] == symbol_maxmin[i]):
          count_maxmin[i] += 1

      num = (count_maxmin[0]-count_maxmin[1]) if (count_maxmin[0]-count_maxmin[1] < num) else num
    return num




