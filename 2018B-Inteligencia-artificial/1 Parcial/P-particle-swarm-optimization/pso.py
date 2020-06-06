#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
import numpy as np
import matplotlib.pyplot as plt

# --- Variables editables ---#
num_particulas   = 50
num_generaciones = 100
num_variables    = 4
# --- ------------------- ---#

# --- Empiezan Funciones --- #
def fitness(x, y):
	return (100 * ((y-(x**2))**2) + ((1-(x**2))**2))
def velocidad(num_particulas, a, mejorParticula, mejorEnjambre, v):
	const = 1.47
	for i in range(num_particulas):
		#Vel x
		v[0][i] = 0.7 * v[0][i] + (mejorParticula[0][i] - a[0][i]) * random.random() * const + (mejorEnjambre[0][0]-a[0][i]) * random.random()*const
		a[0][i] += v[0][i]
		#Vel y
		v[1][i] = 0.7 * v[1][i] + (mejorParticula[1][i] - a[1][i]) * random.random() * const + (mejorEnjambre[0][1]-a[1][i]) * random.random()*const
		a[1][i] += v[1][i]
def bubbleSort(mejorParticula, r, num_particulas):
	for i in range(1, num_particulas):
		for j in range(0, num_particulas-1):
			if (r[j] > r[j+1]):
				# fitness
				tempRes = r[j]
				r[j] 		= r[j+1]
				r[j+1] 	= tempRes
				# x, y
				tempX, 				 					tempY								   = mejorParticula[0][j],   mejorParticula[1][j]
				mejorParticula[0][j],   mejorParticula[1][j] 	 = mejorParticula[0][j+1], mejorParticula[1][j+1]
				mejorParticula[0][j+1], mejorParticula[1][j+1] = tempX, 								 tempY
# --- Termina Funciones --- #

# Inicializar
a, v = np.empty((num_variables, num_particulas)),  np.empty((num_variables, num_particulas))
mejorParticula, mejorEnjambre = np.empty((num_variables, num_particulas)), np.empty((1, 2))
r = np.empty((num_particulas))

# Llenar arreglos
for i in range(0, num_variables):
	for j in range(0, num_particulas):
		mejorParticula[i][j] = random.randint(-20, 20)
		a[i][j], v[i][j] = mejorParticula[i][j], 0

# Llenar r
for i in range(0, num_particulas):
	r[i] = fitness(a[0][i], a[1][i])

bubbleSort(mejorParticula, r, num_particulas)
# Inicializar el mejor global
mejorEnjambre[0][0], mejorEnjambre[0][1] = mejorParticula[0][0], mejorParticula[1][0]


plt.ion()
fig = plt.figure()
ax = fig.add_subplot(111)
ax.grid(True)

# Main
generacion = 0
while(generacion < num_generaciones):
	for i in range(num_particulas):
		# Actualizar el mejor por particula
		if(fitness(a[0][i], a[1][i]) < fitness(mejorParticula[0][i], mejorParticula[1][i])):
			mejorParticula[0][i], mejorParticula[1][i] = a[0][i], a[1][i]
		# Actualizar mejor del enjambre
		if(fitness(mejorParticula[0][i], mejorParticula[1][i]) < fitness(mejorEnjambre[0][0], mejorEnjambre[0][1])):
			mejorEnjambre[0][0], mejorEnjambre[0][1] = mejorParticula[0][i], mejorParticula[1][i]
		# Calcular Velocidad
		velocidad(num_particulas, a, mejorParticula, mejorEnjambre, v)
	generacion += 1
	# Mostrar generaciones en consola
	print "#Generacion: %d -->\t Mejor enjambre: %s" % (generacion, str(mejorEnjambre))

	# Mostrar en matplotlib
	line1, line2 = ax.plot(a[0], a[1], 'k.'), ax.plot(mejorEnjambre[0][0], mejorEnjambre[0][1], 'ro')
	ax.set_xlim(-50, 50)
	ax.set_ylim(-50, 50)
	fig.canvas.draw()
	raw_input('-->')
	ax.clear()
	ax.grid(True)
print "\nMejor del enjambre: ", mejorEnjambre