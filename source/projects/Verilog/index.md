---
title: 🎉 Verilog Codes
summary: |
    ➔ Developed Verilog HDL code for a 4-bit adder, 4-to-1 multiplexer, AND gate, BUF gate, and an inverter with delay.
date: 2023-04-18
tags:
    - verilog
---
# Verilog Projects

[👉 Developed Verilog HDL code for a 4-bit adder, 4-to-1 multiplexer, AND gate, BUF gate, and an inverter with delay.](https://github.com/sainavaneet/Verilog/)

## System that generates, detects, and corrects Hamming Code

➔ Module implements the Hamming code encoder for each of the 16 input parts.

➔ Module converts a binary input into separate ASCII characters.

[👉 Developed Verilog HDL code for the system that generates, detects, and corrects Hamming Code.](https://github.com/sainavaneet/system-that-generates-detects-and-corrects-Hamming-Code)

Verilog code examples that demonstrate various functionalities and designs. Each module is implemented as a separate Verilog file.



### bintoascii

This module converts a binary input into separate ASCII characters.

#### Inputs

- `binary_input` (112 bits): Binary input data.

#### Outputs

- `part_7790_0` to `part_7790_15` (7 bits each): ASCII characters derived from the binary input.

### bintoascii_tb

This is a testbench module for the `bintoascii` module. It provides stimulus to the module and displays the output ASCII characters.

#### Inputs

- `binary_input` (112 bits): Binary input data.

#### Outputs

- `part_7790_0` to `part_7790_15` (7 bits each): ASCII characters derived from the binary input.

### hamming

This module implements the Hamming code encoder for each of the 16 input parts.

#### Inputs

- `part_7790_0` to `part_7790_15` (7 bits each): Input data for each part.

#### Outputs

- `out_77990_0` to `out_77990_15` (11 bits each): Hamming code output for each part.

