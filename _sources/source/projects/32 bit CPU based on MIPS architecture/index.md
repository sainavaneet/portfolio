# 32 bit CPU based on MIPS architecture

Implementation of a 32-bit MIPS Processor using Verilog HDL. The processor is capable of executing various MIPS instructions and includes key components such as the Instruction Memory, Register File, ALU, Data Memory, and Control Unit.


- [Source Code](https://github.com/sainavaneet/32-bit-CPU-based-on-MIPS-architecture)

## Instruction Set

The MIPS Processor supports the following instructions:

1. `ADD rd, rs, rt`: Reg[rd] = Reg[rs] + Reg[rt]
2. `BNE rs, rt, imm16`: Branch if (Reg[rs] != Reg[rt])
3. `J target`: Jump to the specified target address
4. `JR rs`: Jump to the address stored in Reg[rs]
5. `LW rt, imm16(rs)`: Load data from memory to Reg[rt]
6. `SLT rd, rs, rt`: Set Reg[rd] to 1 if (Reg[rs] < Reg[rt]), otherwise 0
7. `SUB rd, rs, rt`: Reg[rd] = Reg[rs] - Reg[rt]
8. `SW rt, imm16(rs)`: Store data from Reg[rt] to memory
9. `XORI rt, rs, imm16`: Reg[rt] = Reg[rs] XOR Zero_ext(Imm16)

## Architecture

The MIPS Processor follows a 5-stage pipeline architecture, consisting of the following stages:

1. Instruction Fetch (IF)
2. Instruction Decode (ID)
3. Execute (EX)
4. Memory Access (MEM)
5. Write Back (WB)

Each stage has its own set of registers and performs specific operations to execute the instructions.

## Modules

The design of the MIPS Processor includes the following modules:

1. **InstructionMem**: Stores and retrieves instructions based on the provided address.
2. **RegFile**: 32-register file module with read and write operations.
3. **Add**: 32-bit adder module.
4. **ALU**: 32-bit Arithmetic Logic Unit module for performing arithmetic and logical operations.
5. **DataMem**: Data memory module for storing and retrieving 32-bit data values.
6. **Control Unit**: Generates control signals for different stages of the processor pipeline.
7. **ForwardingUnit**: Solves data hazards in the pipelined processor by forwarding correct data to the ALU input.
8. **mux3x32to32**: 3x32 to 32 multiplexer module.
9. **mips_32**: The main module that integrates all the components and implements the 32-bit MIPS Processor.

## Testing

A testbench has been created to verify the functionality of the MIPS Processor. It includes test stimuli and checks the behavior of the processor by observing memory addresses and fetched instructions.

## Usage

To use the MIPS Processor, you can instantiate the `mips_32` module in your Verilog design and provide appropriate inputs. Make sure to adhere to the instruction set and connect any required peripherals or memory modules.

