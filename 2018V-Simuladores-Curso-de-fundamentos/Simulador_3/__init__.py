#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" Series de Fourier """
__author__="Fernando Perez"
from numpy import linspace, piecewise, pi, sin, cos, absolute
from scipy import signal
import matplotlib.pyplot as plt
# ##############################################
def SawtoothWave(t):
	return signal.sawtooth(2*pi*t) + 1
def SawtoothWave_Fourier(t, n):
	y=0.
	for k in range(1, n):
		y += ((sin(k*2*pi*t))/(k*pi))
	return (1/2.) - y
def show_SawtoothWave(t, _N):
	# Señal original
	plt.figure("Sawtooth wave - %s"%(__author__),  figsize=(4, 2))
	plt.axhline(0,color="black")
	plt.axvline(0,color="black")
	plt.plot(t, SawtoothWave(t), linewidth = 1)
	# Señal con serie de fourier para distintas n
	for _n in _N:
		plt.figure("Sawtooth wave n= %d - %s"%(_n, __author__), figsize=(4, 2))
		plt.axhline(0,color="black")
		plt.axvline(0,color="black")
		plt.plot(t, SawtoothWave_Fourier(t, _n), 'r', linewidth = 1)
# ###############################################
def SquareWave(t):
	return signal.square(2*pi*t)
def SquareWave_Fourier(t, n):
	y2=0.
	for k in range(1, n):
		if (k%2 == 1):
			y2 += (4 * sin(pi*k*t))/(k*pi)
	return y2
def show_SquareWave(t, n):
	# Señal original
	plt.figure("Square wave - %s"%(__author__), figsize=(4, 2))
	plt.axhline(0,color="black")
	plt.axvline(0,color="black")
	plt.plot(t, SquareWave(t), linewidth = 1)
	# Señal con serie de fourier para distintas n
	for _n in n:
		plt.figure("Square wave n= %d - %s"%(_n, __author__), figsize=(4, 2))
		plt.axhline(0,color="black")
		plt.axvline(0,color="black")
		plt.plot(t, SquareWave_Fourier(t, _n),'r', linewidth=1)
# ###############################################
def CosWare(t):
	return absolute(cos(t))
def CosWare_Fourier(t, n):
	y=0.
	for k in range(1, n):
		y += (4/pi) * ((pow(-1, k) * cos(2*k*t))/(1 - 4*pow(k,2)))
	return (2/pi) + y
def show_CosWare(t, n):
	# Señal original
	plt.figure("Cos wave - %s"%(__author__),  figsize=(4, 2))
	plt.axhline(0,color="black")
	plt.axvline(0,color="black")
	plt.plot(t, CosWare(t), linewidth = 1)
	# Señal con serie de fourier para distintas n
	for _n in n:
		plt.figure("Cos wave n= %d - %s"%(_n, __author__), figsize=(4, 2))
		plt.axhline(0,color="black")
		plt.axvline(0,color="black")
		plt.plot(t, CosWare_Fourier(t, _n), 'r', linewidth = 1)
def main():
	##########################################################################################
	## Datos para modificar
	_N = [2, 5, 10]
	show_all  = True #Esta variable te permitira o no ver todas ventanas de los 3 ejercicios
	show_ware = 1 # Esta variable muestra la funcion con el numero asignado
	##########################################################################################
	_t = linspace(-2, 4, 1000)
	
	if (show_ware==1 or show_all):
		show_SawtoothWave(_t, _N)
	if (show_ware==2 or show_all):
		show_SquareWave(_t, _N)
	if (show_ware==3 or show_all):
		show_CosWare(_t, _N)
	plt.show()

main()
