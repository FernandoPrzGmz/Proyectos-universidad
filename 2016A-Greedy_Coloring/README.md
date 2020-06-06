Final Proyect - Subject: Discrete Mathematics 2016A
=================
**This code is the final proyect of the subject "Discrete Mathematics", 'Universidad del Caribe'.**
This program was made in Python 2.7.10

Objective:
------------
Develop a graphical application that allows to review the following concepts:
- Graph
- Nodes of cut or Point of articulation
- Greedy Coloring.

How to use that?
------------
When you execute the code, one black screen is open where you can interact graphically with it. You can draw a graph anywhere you want only within the black window. And finally, if you want exit you can click the "Exit" button or with the traditional mode.

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/1.PNG)]()

**Nodes**

You can create an infinite number of nodes with the left mouse click inside the black screen. When you have clicked, automatically the program will detect an event and paint a circle in the position where you clicked and name nodes. Automatically a node object will be created and the list of nodes will be updated (but it still hasn't relation).

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/2.PNG)]()

**Remove Nodes**

You can delete the last created node by pressing the [SUPR] key on the keyboard. This action will allow you to reverse the nodes, very similar with Ctrl + Z

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/3.PNG)]()
[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/4.PNG)]()

**Edges**

Once you have the necessary nodes, you can continue with the relations that you graph will have. To do this, justh right click the mouse on each node you want to relate. It is importat you click inside the node, otherwise, the program will not accept the relationship since you have clicked on an empty part of the screen.

Until you have clicked on the second node where you want to relate, at that moment, a line will be created between the nodes that you select and the relations to the graph will be added.

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/5.PNG)]()

**Remove Edges**

You can delete the last created edge by pressing the [ESC] key on the keyboard. This action will allow you to reverse the nodes, very similar with Ctrl + Z

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/6.PNG)]()

Functions:
--------------
**Complete Graph**
-----------
The program allows to indentify if the introduced graph is a complete graph. To access this option you must press the left arrow of the keyboard.

For this example we observe that the graph is not complete.

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/7.PNG)]()

**A graph is complete if there is an edge (u,v) for all nodes u!=v**
We observe that the introduced graph is complete by definition.

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/8.PNG)]()

**Cutting Nodes**
-----------
Another function of the program is to indentify the cutting nodes. To acces this option you must press the up arrow of the keyboard.

Visually, the cutting nodes of red color will be colored and it will be shown on the upper bar.

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/9.PNG)]()

**Defining a cutting node is that nodes that if removed from the graph together with its edges, increases the number of related components of a graph.**
**A node is cutting if there is a subtree with roots in such a way that there is no trailing edge to its parent.**

To find it, I use the DFS algorithm that tracks the highest level that edges can reach.

**Greedy Coloring**
-----------
To access this option you must press the down arrow of the keyboard.

It is desired to color the nodes of a graph in such away that there are not two adjancent nodes of the same color. The goal is to add a color to each of the vertices so that the adjacent nodes are assigned different colors.

[![screen](https://raw.githubusercontent.com/FernandoPrz/2016A-Greedy_Coloring/master/readmeMedia/10.PNG)]()