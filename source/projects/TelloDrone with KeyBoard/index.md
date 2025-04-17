---
title: TelloDrone with Keyboard and Object Detection
summary: |
  ➔ Control a Tello drone using your keyboard and perform object detection
  using a pre-trained model.
date: 2022-08-23
tags:
  - drone
links:
  - icon_pack: fab
    icon: github
    name: 👉 Code
    url: 'https://github.com/sainavaneet/TelloDrone-with-KeyBoard-and-Objectdetection'
---

# TelloDrone with Keyboard and Object Detection

This project demonstrates how to control a Tello drone using your keyboard and perform real-time object detection using a pre-trained model. The drone's movements are controlled via arrow keys and specific hotkeys for takeoff, landing, and flips. Object detection is performed on the live video stream from the drone's camera.


- [Source code](https://github.com/sainavaneet/TelloDrone-with-KeyBoard-and-Objectdetection.git)

## Prerequisites

- Python 3.x
- `getter` module
- `djitellopy`
- `pygame`
- `opencv-python` (`cv2`)
- `cvzone`

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sainavaneet/TelloDrone-with-KeyBoard-and-Objectdetection.git
cd TelloDrone-with-KeyBoard-and-Objectdetection
pip install getter djitellopy pygame opencv-python cvzone
```

## Usage

### 1. Connect and Initialize the Drone

```python
import getter as kg
from djitellopy import tello
from time import sleep

kg.init()

drone = tello.Tello()
drone.connect()
```

### 2. Define Keyboard Input Function

```python
def getKeyboardInput(isFlying):
    # Custom key-to-movement logic
    return [lr, fb, ud, yw, isFlying]
```

### 3. Main Control Loop

```python
while True:
    inputs = getKeyboardInput(isFlying)
    isFlying = inputs[4]
    drone.send_rc_control(inputs[0], inputs[1], inputs[2], inputs[3])
    sleep(0.01)
```

### 4. Object Detection from Drone Feed

```python
thres = 0.50
nmsThres = 0.2

# Load model and class names

while True:
    # Capture frame
    # Run detection
    # Annotate and display frame
    # Accept keyboard input for control
```

## Videos

### 🎯 Object Detection Demo

```{raw} html
<iframe width="746" height="420"
    src="https://www.youtube.com/embed/FL7ku3DEp7o"
    title="Tello Drone Object Detection"
    frameborder="0"
    allowfullscreen>
</iframe>
```

### 🕹️ Keyboard Control Demo

```{raw} html
<iframe width="746" height="420"
    src="https://www.youtube.com/embed/IpdcT8TlTOE"
    title="Tello Drone Keyboard Control"
    frameborder="0"
    allowfullscreen>
</iframe>
```

## Contributing

Contributions are welcome! If you find issues or want to enhance this project, feel free to open an issue or submit a pull request.

- **Tello SDK:** [DJITelloPy](https://github.com/damiafuentes/DJITelloPy)  
- **Object Detection Model:** [TensorFlow Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md)

