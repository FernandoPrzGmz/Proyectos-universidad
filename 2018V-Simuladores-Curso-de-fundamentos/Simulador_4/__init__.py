#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__="Fernando Perez"
from numpy import cos, linspace, piecewise, pi
from matplotlib.widgets import CheckButtons
from scipy import signal
import matplotlib.pyplot as plt

T = 1/(200.0)

def f(t):
    ft = 0
    for j in range(-1, 1):
        ft += cos(400*pi*j*t)
    return ft
def g(t):
    gt = 0
    square = lambda t: piecewise(t, [abs(t)<0.5, abs(t)==0.5], [1,0.5])
    for j in range(-20,21):
        gt += square(400*(t-T*j))
    return gt
def signal_filter(_signal):
    b, a = signal.butter(5, T)
    return signal.filtfilt(b, a, _signal) 
def main():
    fmax = 0.1
    t = linspace(-fmax, fmax, num=20000)
    # Signals
    ft = f(t)               # Input   
    gt = g(t)               # Tren de pulsos cuadrada
    fg = f(t)*g(t)          # Señal muestreada
    sf = signal_filter(fg)  # Señal recuperada con filtro
    # Se dibujan en la ventana
    fig, ax = plt.subplots(figsize=(13, 6))
    l0, = ax.plot(t, ft,
        visible = True,
        lw      = 1,
        color   = 'green',
        label   = 'f(t)',
        dashes  = [6, 2])
    l1, = ax.plot(t, gt,
        visible = False,
        lw      = 1,
        color   = 'red',
        label   = 'g(t)',
        dashes  = [6, 2])
    l2, = ax.plot(t, fg,
        visible = False,
        lw      = 1,
        color   = 'blue',
        label   = 'f(t)*g(t)')
    l3, = ax.plot(t, sf,
        visible = True,
        lw      = 1,
        color   = 'blue',
        label   = 'Senial filtrada')
    lines = [l0, l1, l2, l3]
    # configuracion de la figura 
    fig.canvas.set_window_title("Teorema de muestreo - %s"%(__author__))
    plt.subplots_adjust(left=0.2)
    plt.ylim(-4, 5)
    plt.xlim(-fmax, fmax)
    plt.axhline(0, color="black")
    plt.axvline(0, color="black")
    # Se crean los chebkbuttons para las señales lines[]
    rax = plt.axes([0.05, 0.4, 0.1, 0.15])
    labels = [str(line.get_label()) for line in lines]
    visibility = [line.get_visible() for line in lines]
    check = CheckButtons(rax, labels, visibility)

    def func(label):
        index = labels.index(label)
        lines[index].set_visible(not lines[index].get_visible())
        plt.draw()
    check.on_clicked(func)
    plt.show()

if __name__ == "__main__":
    main()