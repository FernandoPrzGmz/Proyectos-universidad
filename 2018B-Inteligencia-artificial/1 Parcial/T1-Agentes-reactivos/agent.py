#!/usr/bin/env python
# -*- coding: utf-8 -*-
class Agent():
  def __init__(self, xx, yy, space):
    self.xx, self.yy = xx, yy
    self.steps = 0
    self.space = space
    self.perception()
  
  def perception(self):
    self.s1 = self.space[self.yy-1][self.xx-1]
    self.s2 = self.space[self.yy-1][self.xx  ]
    self.s3 = self.space[self.yy-1][self.xx+1]
    self.s4 = self.space[self.yy  ][self.xx+1]
    self.s5 = self.space[self.yy+1][self.xx+1]
    self.s6 = self.space[self.yy+1][self.xx  ]
    self.s7 = self.space[self.yy+1][self.xx-1]
    self.s8 = self.space[self.yy  ][self.xx-1]
  
  def move(self, mx, my):
    self.info()
    self.xx    += mx
    self.yy    += my
    self.steps += 1
    self.perception()
    
  def info(self):
    print "Agente:\n\t%d-%d-%d\n\t%d-%s-%d\n\t%d-%d-%d" %(self.s1, self.s2, self.s3, self.s8, 'A', self.s4, self.s7, self.s6, self.s5)
    print "Movimientos: %d\nCoordenadas-> [X: %d - Y: %d]" %(self.steps,self.xx, self.yy)