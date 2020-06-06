import sys, copy, collections

class Obj (): # 9!/2
  
  def __init__(self, start=None, goal=None):
    self.start     = start or [ ['1','2','3'], ['0','4','6'], ['7','5','8'] ]
    self.goal      = goal  or [ ['1','2','3'], ['4','5','6'], ['7','8','0'] ]
    self.str_start = self.to_str(self.start)
    self.str_goal  = self.to_str(self.goal)
    self.graph = {}

  def to_str(self, element=None):
    # Convertir a str una matriz de 3x3 entrante
    str_element = ''
    for item in element:
      for num in item:
        str_element += num 
    return str_element
      
  def to_array(self, element=None):
    if len(element)==9:
      return [ list(element[0:3]), list(element[3:6]), list(element[6:9]) ]
    else:
      print "El numero de caracteres debe ser 9" 
  
  def error(self, state, goal):
    # Funcion que apoya  la distancia de manhattan
    err = 0
    for i in range(len(state)):
      if state[i] != goal[i]: 
        err += 1
    return err

  def moves(self, m_input=None):
    # Genera una array con las matrices posibles para movimiento
    steps = []        # Estas variables contienen los nuevos tableros
    i, j = None, None # Coordenadas donde se encuentra el campo vacio '-'
    # Nuevos tableros del 8-puzzle posibles
    list_up    = copy.deepcopy(m_input)
    list_down  = copy.deepcopy(m_input)
    list_left  = copy.deepcopy(m_input)
    list_right = copy.deepcopy(m_input)

    # Obtener las coordenadas donde se encuentra el espacio vacio
    for x in range(len(m_input)):
      if '-' in m_input[x]:
        i, j = x, m_input[x].index('-')

    # Generar los movimientos
    if (i==0 and j==0):
      list_up, list_left = None, None
      list_down[i+1][j],  list_down[i][j]  = m_input[i][j], m_input[i+1][j] # '-' hacia abajo
      list_right[i][j+1], list_right[i][j] = m_input[i][j], m_input[i][j+1] # '-' hacia la derecha
    elif (i==0 and j==1):
      list_up = None
      list_down[i+1][j],  list_down[i][j]  = m_input[i][j], m_input[i+1][j] # '-' hacia abajo
      list_left[i][j-1],  list_left[i][j]  = m_input[i][j], m_input[i][j-1] # '-' hacia la izquierda
      list_right[i][j+1], list_right[i][j] = m_input[i][j], m_input[i][j+1] # '-' hacia la derecha
    elif (i==0 and j==2):
      list_up, list_right = None, None
      list_down[i+1][j],  list_down[i][j]  = m_input[i][j], m_input[i+1][j] # '-' hacia abajo
      list_left[i][j-1],  list_left[i][j]  = m_input[i][j], m_input[i][j-1] # '-' hacia la izquierda
    elif (i==1 and j==0):
      list_left  = None
      list_down[i+1][j],  list_down[i][j]  = m_input[i][j], m_input[i+1][j] # '-' hacia abajo
      list_up[i-1][j],    list_up[i][j]    = m_input[i][j], m_input[i-1][j] # '-' hacia arriba
      list_right[i][j+1], list_right[i][j] = m_input[i][j], m_input[i][j+1] # '-' hacia la derecha
    elif (i==1 and j==1):
      list_down[i+1][j],  list_down[i][j]  = m_input[i][j], m_input[i+1][j] # '-' hacia abajo
      list_up[i-1][j],    list_up[i][j]    = m_input[i][j], m_input[i-1][j] # '-' hacia arriba
      list_left[i][j-1],  list_left[i][j]  = m_input[i][j], m_input[i][j-1] # '-' hacia la izquierda
      list_right[i][j+1], list_right[i][j] = m_input[i][j], m_input[i][j+1] # '-' hacia la derecha
    elif (i==1 and j==2):
      list_right = None
      list_down[i+1][j],  list_down[i][j]  = m_input[i][j], m_input[i+1][j] # '-' hacia abajo
      list_up[i-1][j],    list_up[i][j]    = m_input[i][j], m_input[i-1][j] # '-' hacia arriba
      list_left[i][j-1],  list_left[i][j]  = m_input[i][j], m_input[i][j-1] # '-' hacia la izquierda
    elif (i==2 and j==0):
      list_down, list_left  = None, None
      list_up[i-1][j],    list_up[i][j]    = m_input[i][j], m_input[i-1][j] # '-' hacia arriba
      list_right[i][j+1], list_right[i][j] = m_input[i][j], m_input[i][j+1] # '-' hacia la derecha
    elif (i==2 and j==1):
      list_down  = None
      list_up[i-1][j],    list_up[i][j]    = m_input[i][j], m_input[i-1][j] # '-' hacia arriba
      list_left[i][j-1],  list_left[i][j]  = m_input[i][j], m_input[i][j-1] # '-' hacia la izquierda
      list_right[i][j+1], list_right[i][j] = m_input[i][j], m_input[i][j+1] # '-' hacia la derecha
    elif (i==2 and j==2):
      list_down, list_right  = None, None
      list_up[i-1][j],    list_up[i][j]    = m_input[i][j], m_input[i-1][j] # '-' hacia arriba
      list_left[i][j-1],  list_left[i][j]  = m_input[i][j], m_input[i][j-1] # '-' hacia la izquierda

    # Guardar los movimientos
    if list_up    != None: steps.append(copy.deepcopy(list_up))   
    if list_down  != None: steps.append(copy.deepcopy(list_down)) 
    if list_left  != None: steps.append(copy.deepcopy(list_left)) 
    if list_right != None: steps.append(copy.deepcopy(list_right))

    return steps

  def addGraph(self, key, new_steps):
    nodes=[]
    # Si no existe previamente la llave, se registran los datos
    if not self.graph.has_key(key):
      for step in new_steps:
        nodes.append(self.to_str(step))
      self.graph[key] = nodes

  # TODO: La funcion tree no genera el arbol correctamente
  # Por ello se recurrio a definir un arbol sencillo de forma manual
  def tree(self):
    niveles = 3 
    estado = [ self.start]
    sub_estados = []
    for niv in range(niveles+1):
      for est in estado:
        sub_est = self.moves(est)
        self.addGraph(key=self.to_str(est), new_steps=sub_est)
      estado = copy.deepcopy(sub_est)

  # Algoritmo de busqueda en anchura
  def bfs(self):
    # Mantener un registro de los nodos explorados
    explored = []
    queue = collections.deque([self.str_start])

    # Si el E0 == ET
    if self.str_start == self.str_goal:
      return "El estado inicial es el estado objetivo"

    # Manterse en bucle hasta que todos los caminos posibles hayan sido revisados
    while queue:
      # Pop el primer camino de la cola
      path = queue.popleft()
      # Consigue el ultimo nodo de la ruta.
      node = path
      if node not in explored:
        if type(node) == str:    neighbours = self.graph[node]
        elif type(node) == list: neighbours = self.graph[node[-1]]
        
        if type(node)==str: print "El nodo: ", node,
        else: print "El nodo: ", node[-1],
        print 'tiene como vecinos:', neighbours

        # Ir a travs de todos los nodos vecinos, construir un nuevo camino y empujarlo en la cola
        for neighbour in neighbours:
          if neighbour not in explored:
            print "\tVisitando: ", neighbour
            
            if type(path) ==str:     new_path = [path]
            elif type(path) == list: new_path = list(path)

            new_path.append(neighbour)
            queue.append(new_path)
            # Retorna la ruta si el vecino es objetivo.
            if neighbour == self.str_goal:
              return new_path
          explored.append(node)
    return "No se encontro"
  # Algoritmo de busqueda en profundidad
  def dfs(self):
    stack = [[self.str_start]]
    while stack:
      path = stack.pop()
      node = path[-1]
      for next in self.graph[node] - set(path):
        #  Si se encuentra una ruta correcta se retorna
        if next == self.str_goal:
          yield path + [next]
        # Si no se escribe un nuevo camino y se sigue el ciclo
        else:
          stack.append(path + [next])
      print 'Revisando:', node
  # Algoritmo por heuristica
  def manhattan(self):
    # Mantener un registro de los nodos explorados
    explored = []
    queue = collections.deque([self.str_start])

    # Si el E0 == ET
    if self.str_start == self.str_goal:
      return "El estado inicial es el estado objetivo"
    # Manterse en bucle hasta que todos los caminos posibles hayan sido revisados
    while queue:
      # Pop el primer camino de la cola
      path = queue.popleft()
      # Consigue el ultimo nodo de la ruta.
      node = path
      if node not in explored:
        if type(node) == str:    neighbours = self.graph[node]
        elif type(node) == list: neighbours = self.graph[node[-1]]

        heu = [sys.maxint, '']
        # Ir a travs de todos los nodos vecinos, construir un nuevo camino y empujarlo en la cola
        for neighbour in neighbours:
          err = self.error(neighbour, self.str_goal)
          # print neighbour, err
          if err < heu[0]:
            heu = [err, neighbour]
          
        if type(node)==str: print "El nodo: ", node,
        else: print "El nodo: ", node[-1],
        print 'tiene como vecinos:', neighbours,
        print 'pero el mejor es: %s con un error de: %d.\n'%(heu[1],heu[0])

        neighbour = heu[1]
        if neighbour not in explored:
          
          if type(path) == str:    new_path = [path]
          elif type(path) == list: new_path = list(path)
          new_path.append(neighbour)
          queue.append(new_path)
          # Retorna la ruta si el vecino es objetivo.
          if neighbour == self.str_goal:
            return new_path
        explored.append(node)
    return "No se encontro"
