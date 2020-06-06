#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

class Space():
  def __init__(self, space):
    self.space = space
  
  def draw_map(self, agentObj):
    os.system("cls")
    for yy in range(len(self.space)):
      print "%d\t"%(yy),
      for xx in range(len(self.space[yy])):
        if (xx == agentObj.xx) and (yy == agentObj.yy): print "A", # Agente
        elif self.space[yy][xx] == 1:                   print "X", # Obstaculo
        elif self.space[yy][xx] == 0:                   print " ", # Espacio libre
        else:                                           print "?", #Cosa incorrecta
      print ""