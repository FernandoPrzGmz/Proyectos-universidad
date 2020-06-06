__author__ = "Fernando Perez Gomez"
from scipy.integrate import quad
from numpy import sin, cos, pi

m, n = 3, 4

def SinxSin(t): 
    # sin(2pi*mt) * sin(2pi*nt) = zero
    return sin(2*pi*m*t) * sin(2*pi*n*t)
def _SinxSin(t): 
    # sin(2pi*mt) * sin(2pi*mt) = const
    return sin(2*pi*m*t) * sin(2*pi*m*t)
def CosxCos(t):
    # cos(2pi*mt) * cos(2pi*nt) = zero
    return cos(2*pi*m*t) * cos(2*pi*n*t)
def _CosxCos(t): 
    # cos(2pi*mt) * cos(2pi*mt)  = const
    return cos(2*pi*m*t) * cos(2*pi*m*t)
def SinxCos(t):
    # sin(2pi*mt) * cos(2pi*nt) = zero
    return sin(2*pi*m*t) * cos(2*pi*n*t)
def _SinxCos(t): 
    # sin(2pi*mt) * cos(2pi*mt) = zero
    return sin(2*pi*m*t) * cos(2*pi*m*t)

def main():
    print __author__
    data = (
        ["sin(2pi*mt) * sin(2pi*nt) = zero",    SinxSin],
        ["sin(2pi*mt) * sin(2pi*mt) = const",   _SinxSin],
        ["cos(2pi*mt) * cos(2pi*nt) = zero",    CosxCos],
        ["cos(2pi*mt) * cos(2pi*mt) = const",   _CosxCos],
        ["sin(2pi*mt) * cos(2pi*nt) = zero",    SinxCos],
        ["sin(2pi*mt) * cos(2pi*mt) = zero",    _SinxCos]
    )
    for row in data:
        ans, err = quad(row[1], -2, 2)
        print ("%s\t--> %f") %(row[0], ans)

if __name__ == "__main__":
    main()