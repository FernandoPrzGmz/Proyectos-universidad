from Tkinter import *
import networkx as nx
import time
global GAME
GAME=True
__authors__="Fernando Perez Gomez"
#---------------Clases dibujo-------------
class dibNodo(object):
	def __init__(self,canvas,x,y,name):
		self.canvas=canvas
		self.name=str(name)
		self.ide=canvas.create_oval(0,0,15,15,fill="White") #dosw primeros borde superior derecho dos ultimos borde inferior derecho 
		self.canvas.move(self.ide,x,y) #x and y dibuja en canvas
class dibLinea(object):
	def __init__(self,canvas,coor):
		self.canvas=canvas
		self.ide=canvas.create_line(coor[0],coor[1],coor[2],coor[3],fill="White")
		canvas.tag_lower(self.ide)
class dibNum(object):
	def __init__(self,canvas,x,y,num):
		self.canvas=canvas
		self.num=num
		self.x=x+7
		self.y=y+7
		self.ide=canvas.create_text(self.x,self.y,text=self.num)#########
class Espacio(object):
	def __init__(self,canvas,tk):
		self.canvas=canvas
		self.tk=tk
		self.num=-1 #para nodos
		self.selcNodos=[] #relacion de lineas
		self.selcRela=[] #Guarda las relaciones a usar
		self.n=[] #Guarda los nodos a usar
		self.aux=[]
		self.time=0
	def dibujar(self,gObNodos,gObLineas,gObNum):
		if self.time==70: #limpiar
			label.config(text="Presiona la flecha izquierda para saber si es un grafo completo")
			label2.config(text="Presione la flecha hacia arriba para saber los vertices de corte")
			for i in range(len(gObNodos)): canvas.itemconfig(gObNodos[i].ide,fill="White")
			self.time=0
		self.time+=1
		canvas.bind('<1>',self.creaNodo)
		canvas.bind('<3>',self.creaLinea)
		canvas.bind_all('<Delete>',self.deleteNodoAnterior)
		canvas.bind_all('<Escape>',self.deleteLineaAnterior)
		canvas.bind_all('<KeyPress-Up>',self.canCortes)
		canvas.bind_all('<KeyPress-Down>',self.canGreedyColoring)
		canvas.bind_all('<KeyPress-Left>',self.canCompleto)
	def creaNodo(self,evt):
		self.num+=1 #se aument a una unidad para nombrar nodos automaticos
		gObNodos.append(dibNodo(canvas,evt.x,evt.y,self.num))
		gObNum.append(dibNum(canvas,evt.x,evt.y,self.num))#########
		self.n.append(gObNodos[self.num].name)
	def deleteNodoAnterior(self,evt):
		canvas.delete(gObNodos[len(gObNodos)-1].ide)
		canvas.delete(gObNum[len(gObNum)-1].ide)
		gObNum[len(gObNum)-1]=None
		gObNodos[len(gObNodos)-1]=None
		self.n[len(gObNodos)-1]=None
		gObNodos.remove(None)
		gObNum.remove(None)
		self.n.remove(None)
		self.num-=1 #se resta una unidad para nombrar  proximos nodos automaticos
	def creaLinea(self,evt):
		for i in range(len(gObNodos)):
			if (((evt.x>=canvas.coords(gObNodos[i].ide)[0])and(evt.x<=canvas.coords(gObNodos[i].ide)[2]))and((evt.y>=canvas.coords(gObNodos[i].ide)[1])and(evt.y<=canvas.coords(gObNodos[i].ide)[3]))): #saber en que nodo estas
				self.selcNodos.append(evt.x)
				self.selcNodos.append(evt.y)
				self.aux.append(gObNodos[i].name)
		if len(self.selcNodos)==4: #se seleccionaron los dos nodos
			gObLineas.append(dibLinea(canvas,self.selcNodos))
			self.selcNodos=[]
			self.selcRela.append(self.aux)
			self.aux=[] #importante
	def deleteLineaAnterior(self,evt):
		canvas.delete(gObLineas[len(gObLineas)-1].ide)
		gObLineas[len(gObLineas)-1]=None
		self.selcRela[len(gObLineas)-1]=None
		gObLineas.remove(None)
		self.selcRela.remove(None)
	def canGreedyColoring(self,evt):
		for i in range(len(gObNodos)): canvas.itemconfig(gObNodos[i].ide,fill="White")
		nodoColor=xDColoring(self.n,self.selcRela)
		for i in nodoColor[0]: canvas.itemconfig(gObNodos[int(i)].ide,fill="Red")
		for i in nodoColor[1]: canvas.itemconfig(gObNodos[int(i)].ide,fill="Blue")
		for i in nodoColor[2]: canvas.itemconfig(gObNodos[int(i)].ide,fill="Yellow")
		for i in nodoColor[3]: canvas.itemconfig(gObNodos[int(i)].ide,fill="Green")
		for i in nodoColor[4]: canvas.itemconfig(gObNodos[int(i)].ide,fill="Orange")
	def canCortes(self,evt):
		self.time=0
		for i in range(len(gObNodos)): canvas.itemconfig(gObNodos[i].ide,fill="White")
		listCorte=xDCortes(self.n,self.selcRela)
		if len(listCorte)>0:
			label2.config(text="Vertices de corte: "+str(listCorte))
			for i in listCorte: canvas.itemconfig(gObNodos[int(i)].ide,fill="Red")
		else: label2.config(text="No existen vertices de corte.")		
	def canCompleto(self,evt):
		self.time=0
		completo=xDCompleto(self.n,self.selcRela)
		if completo: label.config(text="En efecto, este grafo es completo :D")
		else: label.config(text="Este grafo no es completo :(")
	def salir(self):
		print "click Salida"
		global GAME
		GAME=False
#----------------Clases logicas------------
class Grafo(object):
	def __init__(self):	self.relaciones={}
	def __str__(self): return str(self.relaciones)
	def agregar(self,elem): self.relaciones.update({elem:[]})
	def rUnilateral(self,origen,destino): self.relaciones[origen].append(destino)
	def relacion(self,elem1,elem2):
		self.rUnilateral(elem1,elem2)
		self.rUnilateral(elem2,elem1)
class Nodo(object):
	def __init__(self,name,color):
		self.nombre=name
		self.color=color

def crearVida(grafo,nodos,n,rela):
	for i in range(len(n)): grafo.agregar(n[i])
	for i in range(len(rela)): grafo.relacion(rela[i][0],rela[i][1])
	for i in range(len(n)):
		nodos.append(Nodo(n[i],100))
		nodos[i].nombre=n[i]
def algoDFS(g, eInicial,nodos,n,eRecorridos=[]):
	if eInicial in eRecorridos: return
	eRecorridos.append(eInicial) 
	greedyColoring(g.relaciones[eInicial],nodos,n.index(eInicial),n)
	for vecino in g.relaciones[eInicial]: algoDFS(g,vecino,nodos,n,eRecorridos)
def greedyColoring(nRelacion,nodos,indice,n):
	colVecino,colores=[],[0,1,2,3,4,5]
	for i in nRelacion:	colVecino.append(nodos[n.index(i)].color)
	for c in colores:	#<----
		if not c in colVecino:
			menorColor=c
			break
	nodos[indice].color=menorColor #<----
def xDColoring(n,rela):
	grafo=Grafo()
	nodos=[] #lista de objetos de nodos
	cFinal=[[],[],[],[],[]]
	crearVida(grafo,nodos,n,rela)
	algoDFS(grafo,n[0],nodos,n)
	for i in range(len(n)): #impresion en consola
		if nodos[i].color==0: cFinal[0].append(nodos[i].nombre)
		elif nodos[i].color==1: cFinal[1].append(nodos[i].nombre)
		elif nodos[i].color==2:	cFinal[2].append(nodos[i].nombre)
		elif nodos[i].color==3:	cFinal[3].append(nodos[i].nombre)
		elif nodos[i].color==4:	cFinal[4].append(nodos[i].nombre)
	return cFinal
def xDCortes(n,rela):
	g=nx.Graph()
	g.add_nodes_from(n)
	g.add_edges_from(rela)
	return list(nx.articulation_points(g))
def xDCompleto(n,rela):
	grafo=Grafo()
	completo=True
	for i in range(len(n)): grafo.agregar(n[i])
	for i in range(len(rela)): grafo.relacion(rela[i][0],rela[i][1])
	for i in range(len(n)): #comparativa
		for j in range(len(n)):
			if (n[i]!=n[j]) and (not(n[j] in grafo.relaciones[n[i]])): completo=False
	return completo

#----------MAIN-------------------
gObNodos=[] #Lista objetos dibnodo
gObLineas=[] #Lista objetos diblinea
gObNum=[]
n,rela=[],[]

tk2=Tk()
tk2.title(__authors__)
tk2.wm_attributes("-topmost",1)#ventana por encima de otras
tk2.resizable(0,0) #la ventana no se podra cambiar de tamanio
label=Label(tk2,text="Presiona la flecha izquierda para saber si es un grafo completo")
label.pack()
label2=Label(tk2,text="Presione la flecha hacia arriba para saber los vertices de corte")
label2.pack()
canvas=Canvas(tk2,width=800,height=600,bd=0,highlightthickness=0) #sin bordes
canvas.pack()
canvas.config(bg="Black")
gEspacio=Espacio(canvas,tk2)
menubar=Menu(tk2)
menubar.add_command(label="Exit",command=gEspacio.salir)
tk2.config(menu=menubar)
#-------Loop principal-------------
while GAME:
	gEspacio.dibujar(gObNodos,gObLineas,gObNum)
	tk2.update_idletasks()
	tk2.update()
	time.sleep(.1)