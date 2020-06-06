Arithmetic Logic Unit - Subject: Computer Architecture Proyect 2017A
=================
**This code is the proyect of the first partial of the Computer Architecture subject, 'Universidad del Caribe'.**


Description:
------------
ALU is the circuit that performs mathematical operations and logical comparisons.

The operation to be performed by the ALU is governed by a series of bits that are sent by the control bus and are wired directly to it.

In this proyect, there are six control bits and the resulting operations based on combinations of these are represented in the following truth table.

ALU Truth Table

[![screen](https://raw.githubusercontent.com/FernandoPrz/2017A-Computer-Architetur/master/readmeMedia/ALUtruthTable.PNG)](https://github.com/FernandoPrz/2017A-Computer-Architetur)

Instruction:
------------
Develop a program with the following characteristics:
- Inputs:
    - x of 10 bits in representation of two's complement.
    - y of 10 bits in representation of two's complement.
    - 6 control bits (see ALU table).
- Output:
    - Result of 10 bits representing two's complement.
- The following registers or flags are used:
    - Negative result
    - Result equal to zero
    - Carry
- The input is through an "input.txt" file, that contains 0's and 1's. - It has the following format:
    - 10 bits x - 10 bits - 6 control bits

Each line is an operation of the ALU.

The file must contain at least one operation and has no operation limit.

The output generates a file "output.txt" with the following format:
10 bits output - negative flag - zero flag - carry flag

Each linea is the output of an operation from the input file.


Sample
--------
```text
The next operation x - y => 236-(-516)
will have the following line in the input file: 00111011001000000000000010
In the output file, it will be: 1011101100100
It means that: -276 negative, not zero, no carry.
```

The execution of the program must be in line of command without the need for interaction user.

It will only run and the program should look for the file "input.txt" in the current directory and write/overwrite the file "output.txt"