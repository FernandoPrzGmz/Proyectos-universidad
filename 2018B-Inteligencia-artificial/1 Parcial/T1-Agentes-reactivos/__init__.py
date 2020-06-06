#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "140300050 Fernando Perez Gomez"
import time

from agent import *
from space import *
from tlu import *

""" VARIABLES MODIFICABLES
  Variable SPEED  => velocidad del movimiento
  Variable MOVE:
    true  -> mover
    false -> mover siguiendo las paredes
"""
SPEED = .3
MOVE  = True

def move(TLU, AGENT):
  if   not TLU.execute([AGENT.s2]): AGENT.move(0,-1) # Norte
  elif not TLU.execute([AGENT.s4]): AGENT.move(1,0)  # Este
  elif not TLU.execute([AGENT.s6]): AGENT.move(0,1)  # Sur
  elif not TLU.execute([AGENT.s8]): AGENT.move(-1,0) # Oeste
def move_walls(TLU, AGENT):
  if   TLU.execute([ AGENT.s2, AGENT.s3, AGENT.s4, AGENT.s5 ]):    AGENT.move(1,0)  # Este
  elif TLU.execute([ AGENT.s4, AGENT.s5, AGENT.s6, AGENT.s7 ]):    AGENT.move(0,1)  # Sur
  elif TLU.execute([ AGENT.s6, AGENT.s7, AGENT.s8, AGENT.s1 ]):    AGENT.move(-1,0) # Oeste
  elif TLU.execute([ AGENT.s8, AGENT.s1, AGENT.s2, AGENT.s3 ]):    AGENT.move(0,-1) # Norte
  else:                                                             AGENT.move(0,-1) # Norte

MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1],
  [1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1],
  [1,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

def main():
  SPACE = Space(MAP)
  AGENT = Agent(6, 2, SPACE.space)

  while True:
    time.sleep(SPEED)
    SPACE.draw_map(AGENT)
    print "Alumno: ",__author__
    
    if MOVE: move(TLU(0.5,[1]), AGENT)
    else:    move_walls(TLU(0.5,[1,1,-2,-2]), AGENT)

if __name__ == '__main__':
	main()