#!/usr/bin/env python
# -*- coding: utf-8 -*-

class TLU():
  def __init__(self, threshold, weights):
    self.threshold = threshold
    self.weights   = weights
    
  def execute(self, S):
    total = 0
    for i in range(len(self.weights)):
      if(S[i] == 1):
        total += self.weights[i]
    return total >= self.threshold
