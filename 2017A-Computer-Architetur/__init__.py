#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__="140300050 Fernando Pérez Gómez y 140300088 Raul Alejandro Andrade Alvarado"
'''
Desarrollado en python 2.7.10 					Actualizado: 18 Febrero 2017
Elaborado para la materia: Arquitectura de Computadoras 1 Parcial

Entradas captadas en linea por linea de 26 digitos del archivo input.txt:
	-> X 10 bits en representacion de complemento a 2
	-> Y 10 bits en representacion de complemento a 2
	-> 6 bits de control de la tabla ALU
Salidas impresas a detalle en consola y una salida output.txt con el resultado de la instruccion
	-> 10 bits resultantes de la operacion de la ALU
	-> 3 bits de banteras si el num es negativo, si el numero es 0 y si hay un bit de acarreo
'''
class ALU():
	def xmasy(self):
		print self.xALU, self.yALU,
		self.carry,self.outALU=0,''
		for i in reversed(range(len(self.xALU))):
			if (int(self.xALU[i])+int(self.yALU[i])+self.carry)==3:	self.outALU,self.carry=('1'+self.outALU),1
			elif (int(self.xALU[i])+int(self.yALU[i])+self.carry)==2: self.outALU,self.carry=('0'+self.outALU),1
			elif (int(self.xALU[i])+int(self.yALU[i])+self.carry)==1: self.outALU,self.carry=('1'+self.outALU),0
			else: self.outALU,self.carry=('0'+self.outALU),0
		print self.outALU+' carry: '+str(self.carry)
	def zx(self):
		print 'zx ',
		self.xALU=''
		for i in self.xx: self.xALU+='0'
		print self.xALU, self.yALU, self.outALU
	def zy(self):
		print 'zy ',
		self.yALU=''
		for i in self.yy: self.yALU+='0'
		print self.xALU, self.yALU, self.outALU
	def nx(self):
		print 'nx ',
		self.xALU=self.compA1(self.xALU)
		print self.xALU, self.yALU, self.outALU
	def ny(self):
		print 'ny ',
		self.yALU=self.compA1(self.yALU)
		print self.xALU, self.yALU, self.outALU
	def no(self):
		print 'no  xxxxxxxxxx xxxxxxxxxx', self.outALU,
		self.outALU=self.compA1(self.outALU)
		print self.outALU
	def f(self):
		if int(self.cc[4]):
			print 'x+y',
			self.xmasy()
		else:
			print 'x&y',
			print self.xALU, self.yALU,
			for i in range(len(self.xx)): self.outALU+=str(int(self.xALU[i]) and int(self.yALU[i]))
			print self.outALU
class objInt(ALU):
	def __init__(self, cadena):
		self.ins=cadena
		self.xx,self.yy=self.ins[0:10],self.ins[10:20] #Binarios captados 10/10
		self.cc=self.ins[20:26]	#Binarios de control 6
		self.xA2,self.yA2=self.compA2(self.xx,False),self.compA2(self.yy,False) #Binario real valores positivos
		self.dxx=self.convertdec(self.xx) 
		self.dyy=self.convertdec(self.yy)
		self.xALU,self.yALU,self.outALU=self.xx,self.yy,'' #Variables y Salida
		self.nega,self.zero,self.carry='0','0','0'
	def imprimir(self):
		print 'DATOS:'
		print '\tINSTRUCCION: ',self.xx,self.yy,self.cc
		print '\tNUMERO DECIMAL X: %d EXT BIN X: %s REAL BIN %s' %(self.dxx, self.xx, self.xA2[1])
		print '\tNUMERO DECIMAL Y: %d EXT BIN Y: %s REAL BIN %s' %(self.dyy, self.yy, self.yA2[1])
		print '\tBITS DE CONTROL: ',self.cc
				#Actualizar banderas
		if self.outALU[0]=='1': self.nega='1'
		else: self.nega='0'
		if int(self.outALU,2)==0: self.zero='1'
		else: self.zero='0'
		print str(len(self.outALU))+"\t\tSALIDA: "+self.outALU+' Negativo: '+self.nega+' Cero: '+self.zero+' Acarreo: '+str(self.carry)
		print "\t\tSAL DEC: ",
		if self.nega=='1':print (-int(self.compA2(self.outALU,False)[1],2))
		else: print int(self.compA2(self.outALU,False)[1],2)
		print 'RESULTADO: ',self.outALU+self.nega+self.zero+str(self.carry)+'\n\n'
	def conBin(self, num):
	    outBin=''
	    while num/2 != 0:
	        outBin=str(num%2)+outBin #ainvertir
	        num=int(num)/2
	    outBin=str(num)+outBin
	    if len(outBin)<10:
	    	for i in range(10-len(outBin)):
	    		outBin='0'+outBin
	    return outBin
	def compA1(self, bits):
		out=""
		for i in bits:
			if i=='0': out+='1'
			else: out+='0'
		return out
	def compA2(self, bits,exp):
		if bits[0]=='1' or exp==True:
			out,notA1='',self.compA1(bits)
			cA1=notA1[::-1] #para invertir la cadena
			carry=1
			for bit in cA1:
				if int(bit)+carry==2:
					out='0'+out
				else:
					out=str(int(bit)+carry)+out
					carry=0
			return False,out
		elif bits[0]=='0':
			return True,bits
	def convertdec(self, bits):
		signo=self.compA2(bits, False)
		if signo[0]: return int(signo[1],2)
		else: return (-int(signo[1],2))
	def operaciones(self):
		for i in range(5): print'-',
		print ' PROCESO EN ALU ',
		for i in range(5): print'-',
		print('\n\tBits control: '), self.cc
		print '\tX\tY'
		print "x/y",self.xx, self.yy
		if self.cc[0]=='1': self.zx()
		if self.cc[1]=='1': self.nx()
		if self.cc[2]=='1': self.zy()
		if self.cc[3]=='1': self.ny()
		self.f() #f
		if self.cc[5]=='1': self.no()
		for i in range(19): print '-',
		print 
def openTXT():
	try: #intentar abrir archivo input
		itxt=open("input.txt",'r')
		txt=itxt.readlines()
		temp,lista='',[]
		for i in range(len(txt)):
			for j in range(len(txt[i])):
				if txt[i][j]=='0' or txt[i][j]=='1':temp+=txt[i][j]
			if temp!='':
				lista.append(temp)
				temp=''
		itxt.close()
		return lista
	except: print "\n---> NO SE ENCUENTRA EL ARCHIVO input.txt"
def writeTXT(instru):
	otxt=open("output.txt",'a')
	otxt.write(instru)
	otxt.close()
def main():
	lista=openTXT()
	if lista!=None:
		for cadena in lista:
			if len(cadena)==26:
				obj=objInt(cadena)
				obj.operaciones()
				obj.imprimir() #Ver datos detallados
				writeTXT(obj.outALU+obj.nega+obj.zero+str(obj.carry)+'\n') #Salida del resultado de la instruccion 10bits re resultado +  de bandera
			else: print "\n\tEL FORMATO NO RESPETA LOS 26 BITS: [%s]\n" %cadena
	else: raw_input("\tEl programa se cerrara")
if __name__=='__main__': main()