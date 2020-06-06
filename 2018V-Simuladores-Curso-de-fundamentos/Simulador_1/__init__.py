#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Actividad #3 - Fundamentos de comunicaciones"""
__author__ = "Fernando Perez Gomez"
import matplotlib.pyplot as plt
import numpy as np
def y1(_n, _m, _t):
    y = 0
    for m in range(_n , _m + 1):
        y += np.sin(2*np.pi*m*_t)
    return y

def y2(_n, _m, _t):
    y = 0
    for m in range(_n , _m + 1):
        y += ((-1)**m) * np.sin(2*np.pi*m*_t)
    return y

def main():
    t = np.arange(-1, 1, 0.01)
    n, _m = 1, [2, 5, 10]

    fy1, axarr_y1 = plt.subplots(len(_m), sharex=True)
    fy2, axarr_y2 = plt.subplots(len(_m), sharex=True)
    fy1.suptitle('y1(t) = sen(2(pi)nt)')
    fy2.suptitle('y2(t) = (-1)^2 sen(2(pi)nt)')
    
    aux = 0
    for m in _m:
        axarr_y1[aux].plot(t, y1(n,m,t))
        axarr_y2[aux].plot(t, y2(n,m,t))
        axarr_y1[aux].grid(True)
        axarr_y2[aux].grid(True)
        aux +=1
    plt.show()

if __name__ == "__main__":
    main()