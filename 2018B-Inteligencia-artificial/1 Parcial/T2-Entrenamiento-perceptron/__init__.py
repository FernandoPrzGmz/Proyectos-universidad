#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random

from Perceptron import *

dataAND = [
  [[1,1],       1],
  [[1,0],       0],
  [[0,1],       0],
  [[0,0],       0]
]
dataOR = [
  [[1,1],       1],
  [[1,0],       1],
  [[0,1],       1],
  [[0,0],       0]
]
crabData = [
  #FL      RW",     CL,      CW,      BD,     Sex
  # Male
  [[8.1,    6.7,   16.1,    19,        7],       0],    
  [[8.8,    7.7,   18.1,    20.8,    7.4],       0],    
  [[9.2,    7.8,   19,      22.4,    7.7],       0],    
  [[9.6,    7.9,   20.1,    23.1,    8.2],       0],    
  [[9.8,    8,     20.3,    23,      8.2],       0],    
  [[10.8,   9,     23,      26.5,    9.8],       0],   
  [[11.1,   9.9,   23.8,    27.1,    9.8],       0],   
  [[11.6,   9.1,   24.5,    28.4,   10.4],       0],    
  [[11.8,   9.6,   24.2,    27.8,    9.7],       0],   
  [[11.8,   10.5,  25.2,    29.3,   10.3],       0],  
  [[12.2,   10.8,  27.3,    31.6,   10.9],       0],  
  [[12.3,   11,    26.8,    31.5,   11.4],       0],  
  [[12.6,   10,    27.7,    31.7,   11.4],       0],  
  [[12.8,   10.2,  27.2,    31.8,   10.9],       0],  
  [[12.8,   10.9,  27.4,    31.5,     11],       0],  
  [[12.9,   11,    26.8,    30.9,   11.4],       0],  
  [[13.1,   10.6,  28.2,    32.3,     11],       0],  
  [[13.1,   10.9,  28.3,    32.4,   11.2],       0],  
  [[13.3,   11.1,  27.8,    32.3,   11.3],       0],  
  [[13.9,   11.1,  29.2,    33.3,   12.1],       0],  
  [[14.3,   11.6,  31.3,    35.5,   12.7],       0],  
  [[14.6,   11.3,  31.9,    36.4,   13.7],       0],  
  [[15,     10.9,  31.4,    36.4,   13.2],       0],  
  [[15,     11.5,  32.4,    37,     13.4],       0],  
  [[15,     11.9,  32.5,    37.2,   13.6],       0],  
  [[15.2,   12.1,  32.3,    36.7,   13.6],       0],  
  [[15.4,   11.8,  33,      37.5,   13.6],       0],  
  [[15.7,   12.6,  35.8,    40.3,   14.5],       0],  
  [[15.9,   12.7,  34,      38.9,   14.2],       0],  
  [[16.1,   11.6,  33.8,    39,     14.4],       0],  
  [[16.1,   12.8,  34.9,    40.7,   15.7],       0],  
  [[16.2,   13.3,  36,      41.7,   15.4],       0],  
  [[16.3,   12.7,  35.6,    40.9,   14.9],       0],  
  [[16.4,   13,    35.7,    41.8,   15.2],       0],  
  [[16.6,   13.5,  38.1,    43.4,   14.9],       0],  
  [[16.8,   12.8,  36.2,    41.8,   14.9],       0],  
  [[16.9,   13.2,  37.3,    42.7,   15.6],       0],  
  [[17.1,   12.6,  36.4,    42,     15.1],       0],  
  [[17.1,   12.7,  36.7,    41.9,   15.6],       0],  
  [[17.2,   13.5,  37.6,    43.9,   16.1],       0],  
  [[17.7,   13.6,  38.7,    44.5,     16],       0],  #
  [[17.9,   14.1,  39.7,    44.6,   16.8],       0],  
  [[18,     13.7,  39.2,    44.4,   16.2],       0],  
  [[18.8,   15.8,  42.1,    49,     17.8],       0],  
  [[19.3,   13.5,  41.6,    47.4,   17.8],       0],  
  [[19.3,   13.8,  40.9,    46.5,   16.8],       0],  
  [[19.7,   15.3,  41.9,    48.5,   17.8],       0],  
  [[19.8,   14.2,  43.2,    49.7,   18.6],       0],  
  [[19.8,   14.3,  42.4,    48.9,   18.3],       0],  
  [[21.3,   15.7,  47.1,    54.6,     20],       0],
  # Female
  [[7.2,    6.5,   14.7,    17.1,    6.1],       1],    
  [[9,      8.5,   19.3,    22.7,    7.7],       1],    
  [[9.1,    8.1,   18.5,    21.6,    7.7],       1],    
  [[9.1,    8.2,   19.2,    22.2,    7.7],       1],    
  [[9.5,    8.2,   19.6,    22.4,    7.8],       1],    
  [[9.8,    8.9,   20.4,    23.9,    8.8],       1],    
  [[10.1,   9.3,   20.9,    24.4,    8.4],       1],   
  [[10.3,   9.5,   21.3,    24.7,    8.9],       1],   
  [[10.4,   9.7,   21.7,    25.4,    8.3],       1],   
  [[10.8,   9.5,   22.5,    26.3,    9.1],       1],   
  [[11,     9.8,   22.5,    25.7,    8.2],       1],   
  [[11.2,   10,    22.8,    26.9,    9.4],       1],   
  [[11.5,   11,    24.7,    29.2,   10.1],       1],  
  [[11.6,   11,    24.6,    28.5,   10.4],       1],  
  [[11.6,   11.4,  23.7,    27.7,     10],       1],  
  [[11.7,   10.6,  24.9,    28.5,   10.4],       1],  
  [[11.9,   11.4,  26,      30.1,   10.9],       1],  
  [[12,     10.7,  24.6,    28.9,   10.5],       1],  
  [[12,     11.1,  25.4,    29.2,     11],       1],  
  [[12.6,   12.2,  26.1,    31.6,   11.2],       1],  
  [[12.8,   11.7,  27.1,    31.2,   11.9],       1],  
  [[12.8,   12.2,  26.7,    31.1,   11.1],       1],  
  [[12.8,   12.2,  27.9,    31.9,   11.5],       1],  
  [[13,     11.4,  27.3,    31.8,   11.3],       1],  
  [[13.1,   11.5,  27.6,    32.6,   11.1],       1],  
  [[13.2,   12.2,  27.9,    32.1,   11.5],       1],  
  [[13.4,   11.8,  28.4,    32.7,   11.7],       1],  
  [[13.7,   12.5,  28.6,    33.8,   11.9],       1],  
  [[13.9,   13,    30,      34.9,   13.1],       1],  
  [[14.7,   12.5,  30.1,    34.7,   12.5],       1],  
  [[14.9,   13.2,  30.1,    35.6,     12],       1],  
  [[15,     13.8,  31.7,    36.9,     14],       1],  
  [[15,     14.2,  32.8,    37.4,     14],       1],  
  [[15.1,   13.3,  31.8,    36.3,   13.5],       1],  
  [[15.1,   13.5,  31.9,    37,     13.8],       1],  
  [[15.1,   13.8,  31.7,    36.6,     13],       1], #
  [[15.2,   14.3,  33.9,    38.5,   14.7],       1],  
  [[15.3,   14.2,  32.6,    38.3,   13.8],       1],  
  [[15.4,   13.3,  32.4,    37.6,   13.8],       1],  
  [[15.5,   13.8,  33.4,    38.7,   14.7],       1],  
  [[15.6,   13.9,  32.8,    37.9,   13.4],       1],  
  [[15.6,   14.7,  33.9,    39.5,   14.3],       1],  
  [[15.7,   13.9,  33.6,    38.5,   14.1],       1],  
  [[15.8,   15,    34.5,    40.3,   15.3],       1],  
  [[16.2,   15.2,  34.5,    40.1,   13.9],       1],  
  [[16.4,   14,    34.2,    39.8,   15.2],       1],  
  [[16.7,   16.1,  36.6,    41.9,   15.4],       1],  
  [[17.4,   16.9,  38.2,    44.1,   16.6],       1],  
  [[17.5,   16.7,  38.6,    44.5,     17],       1],
  [[19.2,   16.5,  40.9,    47.9,   18.1],       1]
]

# Compuertas
def entrenando_AND():
  print "\n--> Compuerta AND"
  # tlu = Perceptron(random.random(), [random.random(), random.random()])
  tlu = Perceptron(0.24, [0.5, 0.2])
  tlu.setDataTraining(dataAND)

  print "Antes del entrenamiento"
  print "[1, 1]", tlu.execute([1,1]) # True
  print "[1, 0]", tlu.execute([1,0])
  print "[0, 1]", tlu.execute([0,1])
  print "[0, 0]", tlu.execute([0,0])
  print
  tlu.training()
  print 
  print "Despues del entrenamiento"
  print "[1, 1]", tlu.execute([1,1]) # True
  print "[1, 0]", tlu.execute([1,0])
  print "[0, 1]", tlu.execute([0,1])
  print "[0, 0]", tlu.execute([0,0])
  
  print 
  print "Pesos: ", tlu.weights
  print "umbral: ",tlu.threshold
  print "coeficiente", tlu._lambda

def entrenando_OR():
  print "\n--> Compuerta OR"
  # tlu = Perceptron(random.random(), [random.random(), random.random()])
  tlu = Perceptron(0.24, [0.5, 0.2])
  tlu.setDataTraining(dataOR)

  print "Antes del entrenamiento"
  print "[1, 1]", tlu.execute([1,1]) # True
  print "[1, 0]", tlu.execute([1,0]) # True
  print "[0, 1]", tlu.execute([0,1]) # True
  print "[0, 0]", tlu.execute([0,0]) # False
  tlu.training()
  print 
  print "Despues del entrenamiento"
  print "[1, 1]", tlu.execute([1,1]) # True
  print "[1, 0]", tlu.execute([1,0]) # True
  print "[0, 1]", tlu.execute([0,1]) # True
  print "[0, 0]", tlu.execute([0,0]) # False
  print 
  print "Pesos: ", tlu.weights
  print "umbral: ",tlu.threshold
  print "coeficiente", tlu._lambda


# Cangrejos
def cangrejos():
  print "\n--> Cangrejos"
  tlu = Perceptron(random.random(), [
    random.random(),
    random.random(),
    random.random(),
    random.random(),
    random.random()
    ])

  print "Con los datos:"
  print "Pesos: ", tlu.weights
  print "Umbral: ",tlu.threshold
  print "Coeficiente", tlu._lambda
  print "Resultado:"
  print "\t-->Female" if tlu.execute([17.7,   13.6,  38.7,    44.5,     16]) else "\t-->Male"
  print "\t-->Female" if tlu.execute([15.1,   13.8,  31.7,    36.6,     13]) else "\t-->Male"

  tlu.setDataTraining(crabData)
  tlu.training()
  print 
  print "Con los datos:"
  print "Pesos: ", tlu.weights
  print "Umbral: ",tlu.threshold
  print "Coeficiente", tlu._lambda
  print "Resultado:"
  print "\t-->Female" if tlu.execute([17.7,   13.6,  38.7,    44.5,     16]) else "\t-->Male" # Debe ser Male
  print "\t-->Female" if tlu.execute([15.1,   13.8,  31.7,    36.6,     13]) else "\t-->Male" # Debe ser Female

def cangrejosAll():
  print "\n--> Cangrejos"
  tlu = Perceptron(random.random(), [
    random.random(),
    random.random(),
    random.random(),
    random.random(),
    random.random()
    ])
  tlu.loops = 100000
  tlu.setDataTraining(crabData)
  tlu.training()

  for i in range(len(crabData)):
    print i,
    print "\t-->Female" if tlu.execute(crabData[i][0]) else "\t-->Male"
  print "Con los datos:"
  print "Pesos: ", tlu.weights
  print "Umbral: ",tlu.threshold
  print "Coeficiente", tlu._lambda

# entrenando_AND()
# entrenando_OR()

cangrejos()
# cangrejosAll()