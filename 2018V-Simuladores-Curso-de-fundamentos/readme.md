# 2018v Simulaciones - Curso _Fundamentos de comunicaciones_
<!-- ctrl+k  v -->
## Descripción:
Este repositorio contiene todas las simulaciones del __curso de verano 2018__ de la materia __Fundamentos de comunicaciones__ impartida por el profesor Julio Cesar Ramirez Pacheco en la Universidad del Caribe.

Tecnologias:
- Lenguaje de programación
    - Python 2.7
- Librerias utilizadas para la simulación
    - Simulador #1 
        - Numpy 1.14.3
        - Matplotlib 2.1.1
    - Simulador #2 
        - Numpy 1.14.3
        - Scipy 1.1.0
    - Simulador #3 
        - Numpy 1.14.3
        - Matplotlib 2.1.1
        - Scipy 1.1.0
    - Simulador #4 
        - Numpy 1.14.3
        - Matplotlib 2.1.1
        - Scipy 1.1.0
<!-- ------------------------ -->
# Simulador #1
Simular las funciones: 

<img src="https://latex.codecogs.com/gif.latex?%5Cbegin%7Bmatrix%7D%20%5C%5C%20y_%7B1%7D%28t%29%3D%20%5Csum_%7Bn%3D1%7D%5E%7Bm%7D%20sin%282%5Cpi%20nt%29%20%5C%5C%20%5C%5C%20y_%7B2%7D%28t%29%3D%20%5Csum_%7Bn%3D1%7D%5E%7Bm%7D%5Cleft%20%28%20-1%20%5Cright%20%29%5E%7Bn%7D%20sin%282%5Cpi%20nt%29%20%5Cend%7Bmatrix%7D" /> 

para m=[2, 5, 10]

## Resultado simulador #1
![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_1/media/result_1.PNG)
<!-- ------------------------ -->

<!-- ------------------------ -->
# Simulador #2
Simular las propiedades de Ortogonalidad de las funciones
<img src="https://latex.codecogs.com/gif.latex?sin%282%5Cpi%20mt%29"/>
y
<img src="https://latex.codecogs.com/gif.latex?cos%282%5Cpi%20mt%29"/>

<img src="https://latex.codecogs.com/gif.latex?Propiedades%3A%20%5Cbegin%7Bmatrix%7D%20%5Cint_%7B-2%7D%5E%7B2%7D%20sin%282%5Cpi%20mt%29sin%282%5Cpi%20nt%29dt%3D%5Cbegin%7BBmatrix%7D%200%20%5Crightarrow%20m%5Cneq%20n%20%5C%5C%20const%20%5Crightarrow%20m%3Dn%20%5Cend%7BBmatrix%7D%20%5C%5C%20%5Cint_%7B-2%7D%5E%7B2%7D%20cos%282%5Cpi%20mt%29cos%282%5Cpi%20nt%29dt%3D%5Cbegin%7BBmatrix%7D%200%20%5Crightarrow%20m%5Cneq%20n%20%5C%5C%20const%20%5Crightarrow%20m%3Dn%20%5Cend%7BBmatrix%7D%20%5C%5C%20%5Cint_%7B-2%7D%5E%7B2%7D%20sin%282%5Cpi%20mt%29cos%282%5Cpi%20nt%29dt%3D0%20%5Cend%7Bmatrix%7D"/>

## Resultado simulador #2
![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_2/media/result_2.PNG)
<!-- ------------------------ -->

# Simulador #3
Simular las series de fourier para:
- Sawtooth Wave
    -  Serie de fourier:  
    <img src="https://latex.codecogs.com/gif.latex?%5Cfrac%7BA%7D%7B2%7D%20-%20%5Cfrac%7BA%7D%7B%5Cpi%7D%20%5Csum_%7Bn%3D1%7D%5E%7B%5Cinfty%20%7D%5Cfrac%7B1%7D%7Bn%7D%20sin%28nw_%7B0%7D%20t%29" /> 
- Square Wave
    -  Serie de fourier:  
    <img src="https://latex.codecogs.com/gif.latex?%5Csum_%7Bn%3D1%7D%5E%7B%5Cinfty%20%7D%5Cfrac%7B4%7D%7Bn%5Cpi%7D%20sin%28nw_0t%29" /> 
- |cos(t)|
    -  Serie de fourier:  
    <img src="https://latex.codecogs.com/gif.latex?%5Cfrac%7B2%7D%7B%5Cpi%20%7D&plus;%20%5Cfrac%7B4%7D%7B%5Cpi%20%7D%20%5Csum_%7Bn%3D1%7D%5E%7B%5Cinfty%20%7D%5Cfrac%7B%28-1%29%5En%20cos%282nx%29%7D%7B1-4n%5E2%7D"/>

## Resultado simulador #3
Resultado - Sawtooth Wave

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_3/media/SawtoothWave.png)

Resultado - Square Wave

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_3/media/SquareWave.png)

Resultado - |cos(t)|

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_3/media/CosWave.png)

_DESMOS - Herramienta adicional de apoyo para graficar las funciones._ Sitio: https://www.desmos.com/calculator
<!-- ------------------------ -->
# Simulador #4

La simulación es sobre el teorema de muestreo y consiste en los siguientes pasos:

1.- Primeramente se generará una señal periódica
<img src="https://latex.codecogs.com/gif.latex?f%28t%29%20%3D%20%5Csum_%7Bj%3D-1%7D%5E%7B1%7D%20cos%28400%5Cpi%20jt%29"/>
y se graficará de tal manera que se puedan apreciar varios periodos de esta señal.

2.- El siguiente paso consiste en generar y graficar un tren de pulsos cuadrados los cuales se utilizarán posteriormente para muestrear la señal del punto anterior. El tren de impulsos se generara de acuerdo a:
<img src="https://latex.codecogs.com/gif.latex?g%28t%29%20%3D%20%5Csum_%7B-%5Cinfty%7D%5E%7B%5Cinfty%7D%20%5Cprod%20%28400%5Bt-Tj%5D%29"/>
donde T es el periodo de muestreo. El valor de T se obtendrá de acuerdo  a la relación
<img src="https://latex.codecogs.com/gif.latex?T%20%5Cleq%20%5Cfrac%7B1%7D%7B2f_%7Bmax%7D%7D"/>

3.- Hallar el muestreo de la señal y graficarla (esto es equivalente a graficar)
<img src="https://latex.codecogs.com/gif.latex?f_s%20%28t%29%20%3D%20f%28t%29*g%28t%29"/>

4.- Recuperar la señal original de la señal muestreada utilizando un filtro paso bajo o un filtro pasabanda y graficar tanto la señal original como la señal recuperada del filtro.

## Resultado simulador #4
1.- Para el primer paso debemos generar una señal periódica 
<img src="https://latex.codecogs.com/gif.latex?f%28t%29%20%3D%20%5Csum_%7Bj%3D-1%7D%5E%7B1%7D%20cos%28400%5Cpi%20jt%29"/>

``` python
# Esta función recibe  el parámetro 't' que previamente fue definida con la instrucción
# t = linspace(-fmax, fmax, num=20000)

def f(t):
    ft = 0
    for j in range(-1, 1):
        ft += cos(400*pi*j*t)
return ft
```
El resultado de la señal es la siguiente:

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_4/media/result_ft.PNG)

2.- Para la segunda instrucción, debemos generar el tren de pulsos cuadrados de acuerdo a:
<img src="https://latex.codecogs.com/gif.latex?g%28t%29%20%3D%20%5Csum_%7B-%5Cinfty%7D%5E%7B%5Cinfty%7D%20%5Cprod%20%28400%5Bt-Tj%5D%29"/>

``` python
# Esta función recibe  el parámetro 't' que previamente fue definida con la instrucción
# t = linspace(-fmax, fmax, num=20000)

def g(t):
    gt = 0
    square = lambda t: piecewise(t, [abs(t)<0.5, abs(t)==0.5], [1,0.5])
    for j in range(-20,21):
        gt += square(400*(t-T*j))
return gt
```
El resultado de la señal es la siguiente:

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_4/media/result_gt.PNG)

3.- La instrucción número 3 nos habla de hallar el muestreo de la señal y graficarla (esto es equivalente a graficar)
<img src="https://latex.codecogs.com/gif.latex?f_s%20%28t%29%20%3D%20f%28t%29*g%28t%29"/>

Por lo tanto, debemos multiplicar el resultado de las funciones f(t) g(t) y obtendremos como resultado: 

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_4/media/result_fs.PNG)

4.- Por último para recuperar la señal original de la señal muestreada debemos utilizar un filtro paso bajo o un filtro pasabanda.
``` python
# Esta función recibe  el parámetro '_signal' que es la señal muestreada o mejor dicho f(t)*g(t)

def signal_filter(_signal):
    b, a = signal.butter(5, T)
return signal.filtfilt(b, a, _signal) 
```
Obteniendo como resultado:

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_4/media/result_filter.PNG)

En la siguiente imagen podemos visualizar las dos señales,  donde la señal con una línea punteada es la señal original f(t) y la sobrante es la señal recuperada con el filtro.

![screen](https://raw.githubusercontent.com/FernandoPrz/2018V-Simuladores-Curso-de-fundamentos/master/Simulador_4/media/result_ft_and_filter.PNG)
<!-- ------------------------ -->