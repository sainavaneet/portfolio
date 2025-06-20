# Action Chunck Transfomer on Franka Robot

<p align="center">
  <video width="100%" autoplay loop muted controls="false">
    <source src="/_static/videos/demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>



## Abstract 

This project introduces the use of the Action Chunking with Transformers (ACT) technique in single-arm robotic manipulation for vision-guided pick-and-place tasks. ACT employs a Conditional Variational Autoencoder (CVAE) to predict sequences of actions, termed "action chunks," which are groups of actions predicted together to achieve more complex tasks efficiently. Unlike traditional methods that rely solely on joint position data and predict individual actions, our approach integrates visual data to enrich the learning context and enhance execution precision. We acquired the expert data by providing manual demonstrations of the task, allowing the model to learn from real-time, complex action sequences. By predicting these action chunks instead of single actions, the ACT model adapts from dual-arm to single-arm configurations, enhancing control strategies and demonstrating significant improvements in the robot's speed, precision, and reliability. This substantiates the paper's title, "Vision-Guided Imitation Learning Using Action Chunk Transformers," highlighting the critical role of vision in advancing robotic control systems.



<p align="center"><a href="https://sainavaneet.github.io/ACTfranka.github.io/" target="_blank" style="border: 2px solid #0066cc; background-color: transparent; color: #0066cc; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; margin: 2px; cursor: pointer; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: all 0.3s ease; animation: pulse 2s infinite;" onmouseover="this.style.transform='scale(1.1)'; this.style.backgroundColor='#0066cc'; this.style.color='white';" onmouseout="this.style.transform='scale(1)'; this.style.backgroundColor='transparent'; this.style.color='#0066cc';">🌐 Project Website</a></p>

<style>
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>

