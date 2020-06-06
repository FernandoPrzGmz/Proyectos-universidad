import sys, random
from flies import Flies
class Player(Flies):
  def __str__(self):
    aux = ''
    for fila in self.state:
      aux += str(fila)+'\n'
    return aux
  
  def move_IA_maxmin(self):
    if self.winner(): return None
    else: 
      new_states = self.create_max()
      
      index = 0
      aux = -sys.maxint
      for i in range(len(new_states)):
        if (new_states[i].heuristica > aux):
          aux = new_states[i].heuristica
          index = i
      self.winner()
      print self
      print "El jugador '%s' esta usando IA maxmin"%(self.symbol)
      try:
        return new_states[index].max
      except: pass



  def move_random(self):
    if self.winner(): return None
    else: 
      new_states = self.create_max()
      index_random = random.randint(0, (len(new_states)-1))
      self.winner()
      print self
      print "El jugador '%s' esta usando Random"%(self.symbol)
      return new_states[index_random].max
  def winner(self):
    # Diagonales
    if (self.state[0][0]==self.symbol) and  (self.state[1][1]==self.symbol) and (self.state[2][2]==self.symbol):
      self.win = True
      return True
    if (self.state[0][2]==self.symbol) and  (self.state[1][1]==self.symbol) and (self.state[2][0]==self.symbol):
      self.win = True
      return True

    # Filas
    if (self.state[0][0]==self.symbol) and  (self.state[0][1]==self.symbol) and (self.state[0][2]==self.symbol):
      self.win = True
      return True
    if (self.state[1][0]==self.symbol) and  (self.state[1][1]==self.symbol) and (self.state[1][2]==self.symbol):
      self.win = True
      return True
    if (self.state[2][0]==self.symbol) and  (self.state[2][1]==self.symbol) and (self.state[2][2]==self.symbol):
      self.win = True
      return True

    # Columnas
    if (self.state[0][0]==self.symbol) and  (self.state[1][0]==self.symbol) and (self.state[2][0]==self.symbol):
      self.win = True
      return True
    if (self.state[0][1]==self.symbol) and  (self.state[1][1]==self.symbol) and (self.state[2][1]==self.symbol):
      self.win = True
      return True
    if (self.state[0][2]==self.symbol) and  (self.state[1][2]==self.symbol) and (self.state[2][2]==self.symbol):
      self.win = True
      return True
