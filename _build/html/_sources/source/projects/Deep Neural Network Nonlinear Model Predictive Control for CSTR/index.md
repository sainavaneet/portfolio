---
title: Deep Neural Network Nonlinear Model Predictive Control for CSTR
summary: |
        The Continuous Stirred Tank Reactor (CSTR) is a fundamental model in chemical en-
        gineering, representing a reactor where the contents are well-mixed, ensuring uniform
        composition and temperature throughout. This report delves into the mathematical
        modeling of a CSTR, its simulation, and control using a Nonlinear Model Predictive
        Control (NMPC) strategy integrated with a neural network for predictive behavior.

date: 2024-01-09


tags:
  - Deep Neural Network
  - CSTR


links:
  - icon_pack: fab
    icon: github
    name: 👉 Code
    url: 'https://github.com/sainavaneet/CSTR'

---
# Deep Neural Network Nonlinear Model Predictive Control for CSTR


## Introduction

The Continuous Stirred Tank Reactor (CSTR) is a fundamental model in chemical engineering, representing a reactor where the contents are well-mixed, ensuring uniform composition and temperature throughout. This report delves into the mathematical modeling of a CSTR, its simulation, and control using a Nonlinear Model Predictive Control (NMPC) strategy integrated with a neural network for predictive behavior.


## CSTR Model

The CSTR dynamics are governed by the mass and energy balance equations, capturing the reaction kinetics, heat transfer, and fluid mixing. The model is described by the following differential equations:

{{< math >}}$$
\frac{dC}{dt} = \frac{F}{V}(C_{in} - C) - k(T)C
$${{< /math >}}

{{< math >}}$$
\frac{dT}{dt} = \frac{F}{V}(T_{in} - T) + \frac{-\Delta H}{\rho C_p}k(T)C + \frac{Q}{\rho C_p V}
$${{< /math >}}

where {{< math >}}$C${{< /math >}} and {{< math >}}$T${{< /math >}} denote the concentration and temperature in the reactor, {{< math >}}$F${{< /math >}} the flow rate, {{< math >}}$V${{< /math >}} the volume, {{< math >}}$C_{in}${{< /math >}} and {{< math >}}$T_{in}${{< /math >}} the inlet concentration and temperature, {{< math >}}$k(T)${{< /math >}} the temperature-dependent reaction rate, {{< math >}}$\Delta H${{< /math >}} the heat of reaction, {{< math >}}$\rho${{< /math >}} the density, {{< math >}}$C_p${{< /math >}} the heat capacity, and {{< math >}}$Q${{< /math >}} the heat input or removal.

The rate of reaction for species A is described as:

{{< math >}}$$
-r_A = k(T)C_A = k_0 e^{\left( \frac{-E}{RT} \right)}C_A
$${{< /math >}}

where {{< math >}}$C_A${{< /math >}} is the concentration of species A, {{< math >}}$k(T)${{< /math >}} is the temperature-dependent reaction rate constant, {{< math >}}$k_0${{< /math >}} is the pre-exponential factor or frequency factor, {{< math >}}$E${{< /math >}} is the activation energy, {{< math >}}$R${{< /math >}} is the universal gas constant, {{< math >}}$T${{< /math >}} is the temperature, and {{< math >}}$r_A${{< /math >}} is the reaction rate for species A.


## Parameters

| Parameter | Value |
|-----------|-------|
| Initial Flow Rate | {{< math >}}$F_0 = 0.1 \text{ m}^3/\text{min}${{< /math >}} |
| Initial Temperature | {{< math >}}$T_0 = 350.0 \text{ K}${{< /math >}} |
| Initial Concentration | {{< math >}}$c_0 = 1.0 \text{ kmol/m}^3${{< /math >}} |
| Reactor Radius | {{< math >}}$r = 0.219 \text{ m}${{< /math >}} |
| Reaction Rate Constant | {{< math >}}$k_0 = 7.2 \times 10^{10} \text{ 1/min}${{< /math >}} |
| Activation Energy/Gas Constant | {{< math >}}$E_b/R = 8750 \text{ K}${{< /math >}} |
| Overall Heat Transfer Coefficient | {{< math >}}$U = 54.94 \text{ kJ}/(\text{min} \cdot \text{m}^2 \cdot \text{K})${{< /math >}} |
| Density | {{< math >}}$\rho = 1000 \text{ kg/m}^3${{< /math >}} |
| Specific Heat Capacity | {{< math >}}$C_p = 0.239 \text{ kJ}/(\text{kg} \cdot \text{K})${{< /math >}} |
| Heat of Reaction | {{< math >}}$\Delta H = -5 \times 10^4 \text{ kJ/kmol}${{< /math >}} |
| Small Value (Avoid Division by Zero) | {{< math >}}$\varepsilon = 1 \times 10^{-5} \text{ m}${{< /math >}} |
| Mass Fractions | {{< math >}}$x_s = [0.878, 324.5, 0.659]${{< /math >}} |
| Input Parameters | {{< math >}}$u_s = [300, 0.1]${{< /math >}} |


## Nonlinear Model Predictive Control Implementation

Nonlinear Model Predictive Control (NMPC) is a sophisticated control strategy used to manage complex dynamical systems. It involves optimizing control inputs over a defined prediction horizon, aiming to minimize deviations from desired setpoints while adhering to operational constraints. NMPC is particularly effective for systems with nonlinear dynamics, as it can account for these nonlinearities in both the system model and the control strategy.

In our implementation, NMPC is integrated with a neural network that predicts future system states. This integration enhances the controller's ability to handle complex, nonlinear system behaviors. The core of NMPC involves solving an optimization problem at each control step, formulated as follows:

### NMPC Parameters

- **Prediction Horizon and Time Step**:

  {{< math >}}$$ N = 15, \quad dt = 0.25\;\text{seconds}, \quad Tf = 3.75\;\text{seconds} $${{< /math >}}

- **Cost Function**:

  The overall objective of NMPC is defined by the cost function {{< math >}}$ J ${{< /math >}}, a sum of the stage costs over the prediction horizon and a terminal cost at the end of the horizon. The cost function is given by:

  {{< math >}}$$
  J = \sum_{k=t}^{t+N-1} L(x_k, u_k) + M(x_{t+N})
  $${{< /math >}}

  where:

  - {{< math >}}$ L(x_k, u_k) ${{< /math >}} is the stage cost function at each time step {{< math >}}$ k ${{< /math >}}.
  - {{< math >}}$ M(x_{t+N}) ${{< /math >}} is the terminal cost function at the end of the horizon.

  The stage cost {{< math >}}$ L ${{< /math >}} and terminal cost {{< math >}}$ M ${{< /math >}} are defined as:

  {{< math >}}$$
  L(x_k, u_k) = (x_k - x_{\text{ref},k})^\top Q (x_k - x_{\text{ref},k}) + (u_k - u_{\text{ref},k})^\top R (u_k - u_{\text{ref},k})
  $${{< /math >}}

  {{< math >}}$$
  M(x_{t+N}) = (x_{t+N} - x_{\text{ref},t+N})^\top P (x_{t+N} - x_{\text{ref},t+N})
  $${{< /math >}}

  The weight matrices {{< math >}}$ Q, R, P ${{< /math >}} are given by:

  {{< math >}}$$
  Q = \text{diag}(1.0 / \textbf{xs}^2)
  $${{< /math >}}

  {{< math >}}$$
  R = \text{diag}(1.0 / \textbf{us}^2)
  $${{< /math >}}

  {{< math >}}$$
  P = \begin{bmatrix}
  5.92981953e-01 & -8.40033347e-04 & -1.54536980e-02 \\
  -8.40033347e-04 & 7.75225208e-06 & 2.30677411e-05 \\
  -1.54536980e-02 & 2.30677411e-05 & 2.59450075e00
  \end{bmatrix}
  $${{< /math >}}

- **Control Constraints**:

  {{< math >}}$$
  \textbf{umin} = \begin{bmatrix} 0.95 \\ 0.85 \end{bmatrix} \times \textbf{us}
  $${{< /math >}}

  {{< math >}}$$
  \textbf{umax} = \begin{bmatrix} 1.05 \\ 1.15 \end{bmatrix} \times \textbf{us}
  $${{< /math >}}

### ACADOS OCP Solver Configuration

- **Solver Type**:
  - SQP (Sequential Quadratic Programming) or SQP-RTI (Real-Time Iteration).

- **Integrator Type**:
  - "IRK" (Implicit Runge-Kutta) for nonlinear MPC.

- **QP Solver and Condensing**:
  - "PARTIAL_CONDENSING_HPIPM", with condensing intervals equal to {{< math >}}$ N ${{< /math >}}.

- **Regularization**:

  {{< math >}}$$
  \text{Levenberg-Marquardt} = 1e-5
  $${{< /math >}}

### ACADOS Integrator Configuration

- **Integrator Options**:
  - Type: "ERK" (Explicit Runge-Kutta).
  - Stages and Steps: 4 stages, 100 steps.
  - Sensitivity Propagation: Configurable.

This NMPC setup optimizes control actions over the specified prediction horizon, minimizing a quadratic cost function subject to dynamic constraints and control bounds. The ACADOS framework provides efficient solving capabilities for the nonlinear optimal control problem.

## Neural Network Integration in NMPC for CSTR

### Data Preparation
The foundation of a robust neural network model lies in the quality and quantity of the data used for training. In the case of a Continuous Stirred Tank Reactor (CSTR), data can be sourced from historical operational records, simulations, or experimental setups. Key variables such as reactant concentrations, temperature, inflow rates, and heat inputs are recorded. This dataset is then divided into features (inputs) and targets (outputs), which the neural network will learn to map. The input and output datasets obtained from the NMPC controller are used as the historical dataset for neural network training.

### Neural Network Architecture
The architecture of the neural network is designed to effectively capture the complex dynamics of the CSTR. A typical architecture includes:

- **Input Layer**: Accepts the current state of the CSTR, such as temperature, concentration, and control inputs. Mathematically, if the input vector is {{< math >}}$ \mathbf{x} ${{< /math >}}, then the input layer can be represented as {{< math >}}$ \mathbf{a}_0 = \mathbf{x} ${{< /math >}}.

- **Hidden Layers**: Multiple layers with a sufficient number of neurons to enable the network to learn complex patterns. If {{< math >}}$ \mathbf{a}_{i-1} ${{< /math >}} is the output of the previous layer, the output of the {{< math >}}$ i ${{< /math >}}-th layer can be represented as:

  {{< math >}}$$
  \mathbf{a}_i = \text{ReLU}(\mathbf{W}_i \mathbf{a}_{i-1} + \mathbf{b}_i)
  $${{< /math >}}

  where {{< math >}}$ \mathbf{W}_i ${{< /math >}} and {{< math >}}$ \mathbf{b}_i ${{< /math >}} are the weights and biases of the {{< math >}}$ i ${{< /math >}}-th layer, and ReLU (Rectified Linear Unit) introduces non-linearity.

- **Output Layer**: Predicts the future states of the CSTR, crucial for the NMPC controller. The output {{< math >}}$ \mathbf{y} ${{< /math >}} is expressed as:

  {{< math >}}$$
  \mathbf{y} = \mathbf{W}_{\text{output}} \mathbf{a}_{\text{last}} + \mathbf{b}_{\text{output}}
  $${{< /math >}}

  where {{< math >}}$ \mathbf{a}_{\text{last}} ${{< /math >}} is the output of the last hidden layer.

### Training Process
The training process involves several steps:

![Block diagram of DNN-NMPC](images/clipboard-image-1704789215.png)


1. **Data Scaling**: Input ({{< math >}}$ \mathbf{X} ${{< /math >}}) and output ({{< math >}}$ \mathbf{Y} ${{< /math >}}) data are scaled to improve training efficiency and stability. Standardization is expressed as:

  {{< math >}}$$
  \mathbf{X}_{\text{scaled}} = \frac{\mathbf{X} - \mu_{\mathbf{X}}}{\sigma_{\mathbf{X}}}
  $${{< /math >}}

  where {{< math >}}$ \mu_{\mathbf{X}} ${{< /math >}} and {{< math >}}$ \sigma_{\mathbf{X}} ${{< /math >}} are the mean and standard deviation of the input data, respectively.

2. **Loss Function**: Mean Squared Error (MSE) quantifies the difference between network predictions ({{< math >}}$ \mathbf{\hat{Y}} ${{< /math >}}) and actual data ({{< math >}}$ \mathbf{Y} ${{< /math >}}):

  {{< math >}}$$
  \text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (\mathbf{\hat{Y}}_i - \mathbf{Y}_i)^2
  $${{< /math >}}

  where {{< math >}}$ n ${{< /math >}} is the number of data points.

3. **Optimizer**: Algorithms like Adam or SGD (Stochastic Gradient Descent) adjust the network weights to minimize the loss function. The weight update can be expressed as:

  {{< math >}}$$
  \mathbf{W}_{\text{new}} = \mathbf{W}_{\text{old}} - \alpha \nabla \text{MSE}
  $${{< /math >}}

  where {{< math >}}$ \alpha ${{< /math >}} is the learning rate, and {{< math >}}$ \nabla \text{MSE} ${{< /math >}} is the gradient of the MSE.

4. **Validation**: A portion of the dataset not used in training validates the model’s performance and prevents overfitting.


## Results

![Loss](images/loss.png)

![CSTR simulation result](images/dnn.png)

## Conclusion
The CSTR model, integrated with a neural network and controlled via NMPC, represents a sophisticated approach to managing complex chemical reactions. This integration allows for efficient, real-time adjustments to reactor operating conditions, ensuring optimal performance under varying conditions.

