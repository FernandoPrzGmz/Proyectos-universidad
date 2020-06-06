import copy, random
from player import Player

def f1(board, p1, p2):
  # Juego donde los dos agentes p1 y p2 usan el algoritmo minmax
  while True:
    m1 = p1.move_IA_maxmin()
    if m1 == None or p1.win or p2.win: break
    else: p2.state = copy.deepcopy( m1 )
    
    m2 = p2.move_IA_maxmin()
    if m2 == None or p1.win or p2.win: break
    else: p1.state = copy.deepcopy( m2 )

def f2(board, p1, p2):
  # Juego donde el agentes p1 usa siempre el algoritmo minmax y p2 usa el agente 50/50
  while True:
    # p1 siempre usara IA
    m1 = p1.move_IA_maxmin()
    if m1 == None or p1.win or p2.win: break
    else: p2.state = copy.deepcopy( m1 )
    
    # p2 usara de vez en cuando IA
    if random.randint(0,1):
      m2 = p2.move_random()
      if m2 == None or p1.win or p2.win: break
      else: p1.state = copy.deepcopy( m2 )
    else:
      m2 = p2.move_IA_maxmin()
      if m2 == None or p1.win or p2.win: break
      else: p1.state = copy.deepcopy( m2 )

board  = [
  ['_','_','_'],
  ['_','_','_'],
  ['_','_','_']]

# f1(board, p1=Player(board, True), p2=Player(board, False))
f2(board, p1=Player(board, True), p2=Player(board, False))