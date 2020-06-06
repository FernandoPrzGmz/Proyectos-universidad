#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random

class Perceptron():
  def __init__(self, threshold, weights):
    self.threshold   = threshold
    self.weights     = weights
    self.dataTrainig = []
    self._lambda     = 0.2
    self.itmax       = 10000
  
  def execute(self, S):
    """
      execute()
      Funcion para ejecutar el perceptron mediante entradas
      [x1, x2,..., xn]
    """
    total = 0
    for i in range(len(self.weights)):
      total += S[i] * self.weights[i]
    return total >= self.threshold
  
  # ########################################################
  def training(self):
    """ 
      training()
      Algoritmo para el entrenamiento de perceptron
    """
    print "*** Entrenando ***"
    for i in range(self.itmax):
      for sn in self.dataTrainig:       
        aux = sn[1] - self.signFuction(sn)
        for i in range(len(sn[0])):
          self.weights[i] += self._lambda * aux * sn[0][i]

  def signFuction(self, sn):
    """
      signFunction()
      Funcion que ayuda para el entrenamiento
    """
    fTotal = 0
    # sumatoria Xi * W
    for i in range(len(sn[0])):
      fTotal += sn[0][i] * self.weights[i]
    # sumatoria ((Xi*W) - umbral)
    if fTotal - self.threshold >= 0: return 1
    else: return 0
  
  def setDataTraining(self, data):
    """
      setDataTraining()
      Funcion para cargar los datos
      Debe seguir este formato
      [
        [[x1,x2,x3,...,xn], y],
        ...
        [[x1,x2,x3,...,xn], y]
      ]
    """
    self.dataTrainig = data
