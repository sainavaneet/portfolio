---
title: 🎉 Drone Control with Keyboard
summary: |
    Developed a code to control a drone using a keyboard. It can
    perform actions such as takeoff, landing, and controlling the
    drone's movements using the arrow keys and other designated keys.

date: 2023-03-23


tags:
  - drone


links:
  - icon_pack: fab
    icon: github
    name: 👉 Code
    url: 'https://github.com/sainavaneet/Drone-Control-with-keyboard/'

---

# Drone Control with Keyboard

Developed a code to control a drone using a keyboard. It can
perform actions such as takeoff, landing, and controlling the
drone's movements using the arrow keys and other designated keys.

{{< youtube -XZIpyt2KPE >}}

## Prerequisites

Before running the code, make sure you have the following dependencies installed:

- Python 3.x
- Olympe
- pynput

You can install the required Python packages using pip:

```
pip install olympe pynput
```

## Usage

1. Connect to the drone's Wi-Fi network.

2. Update the `DRONE_IP` variable in the code to match the IP address of your drone. By default, it is set to `10.202.0.1`.

3. Run the script by executing the following command:

```
python script.py
```

4. The script will establish a connection with the drone and wait for your input.

5. Use the following keys to control the drone:

   - **t**: Takeoff
   - **l**: Landing
   - **a**: Move left
   - **d**: Move right
   - **w**: Move forward
   - **s**: Move backward
   - **up arrow**: Increase altitude
   - **down arrow**: Decrease altitude
   - **left arrow**: Rotate left
   - **right arrow**: Rotate right
   - **esc**: Quit the script

6. Press the corresponding keys to control the drone's movements. The drone will respond accordingly.

7. To quit the script, press the **esc** key.

**Note:** Make sure to fly the drone in a safe environment and comply with all local regulations and laws regarding drone usage.


## Acknowledgments

- The Olympe library: https://developer.parrot.com/docs/olympe/
- The pynput library: https://pynput.readthedocs.io/
