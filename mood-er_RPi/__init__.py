#!/usr/bin/env python
# -*- coding: utf-8 -*-

from sys import byteorder
from array import array
from struct import pack

import pyaudio
import wave
import requests

from datetime import datetime

SERVER     = 'http://192.168.1.72:8080/upload'
THRESHOLD  = 500
CHUNK_SIZE = 1024
FORMAT     = pyaudio.paInt16
RATE       = 44100


# """
# function "isSilent"
#   Regresa verdadero si se esta por debajo del umbral
# """
def isSilent(sndData):
  return max(sndData) < THRESHOLD


# """ 
# function "normalize"
# """
def normalize(sndData):
  MAXIMUM = 16384
  times = float(MAXIMUM)/max(abs(i) for i in sndData)

  r = array('h')
  for i in sndData:
    r.append(int(i*times))
  return r

# """
# function "trim"
#   Recorta los espacios en blanco de izquierda a derecha 
# """
def trim(sndData):
  def _trim(sndData):
    sndStarted = False
    r = array('h')

    for i in sndData:
      if not sndStarted and abs(i)>THRESHOLD:
        sndStarted = True
        r.append(i)

      elif sndStarted:
        r.append(i)
    return r

  # Izquierda
  sndData = _trim(sndData)

  # Derecha
  sndData.reverse()
  sndData = _trim(sndData)
  sndData.reverse()
  return sndData

# """
# funtion addSilence
#   Añade segundos de silencio al principio y final de 'sndData' 
# """
def addSilence(sndData, seconds):
  r = array('h', [0 for i in xrange(int(seconds*RATE))])
  r.extend(sndData)
  r.extend([0 for i in xrange(int(seconds*RATE))])
  return r


# """
# function record
#   Graba la oracion desde microfono y regresa los datos como un array
#   1. Normaliza el audio,
#   2. recorta el silencio desde el principio y el final,
#   3. y se añaden silencios con 0,5 segundos de sonido.
# """
def record():
  p = pyaudio.PyAudio()
  stream = p.open(
            format            = FORMAT,
            channels          = 1,
            rate              = RATE,
            input             = True,
            output            = True,
            frames_per_buffer = CHUNK_SIZE
          )

  numSilent = 0
  sndStarted = False

  r = array('h')

  while True:
    sndData = array('h', stream.read(CHUNK_SIZE))
    
    if byteorder == 'big':
      sndData.byteswap()
    
    r.extend(sndData)

    silent = isSilent(sndData)

    if silent and sndStarted:
      numSilent += 1
    elif not silent and not sndStarted:
      sndStarted = True

    if sndStarted and numSilent > 30:    break

  sample_width = p.get_sample_size(FORMAT)
  stream.stop_stream()
  stream.close()
  p.terminate()

  r = normalize(r)
  r = trim(r)
  r = addSilence(r, 0.5)
  return sample_width, r

# """
# function recordToFile
#    Guarda en un archivo .wav
# """
def recordToFile(path):
  sample_width, data = record()
  data = pack('<' + ('h'*len(data)), *data)

  wf = wave.open(path, 'wb')
  wf.setnchannels(1)
  wf.setsampwidth(sample_width)
  wf.setframerate(RATE)
  wf.writeframes(data)
  wf.close()

# """
# """
def sendToServer(path):
  res = requests.post(SERVER, files={'pyAudio': open(path, 'rb')})
  print res

def init():
  print 'Esperando detectar voz...'
  fileName = './records/'+ datetime.now().strftime('%Y%m%d-%H%M%S') + '.wav'
  recordToFile(fileName)
  print'Audio guardado en: ', fileName
  sendToServer(fileName)

if __name__ == '__main__':
  print 'Iniciando...'
  while True:
    init()