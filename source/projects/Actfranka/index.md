# Action Chunck Transfomer on Franka Robot

<!-- <p align="center">
  <video width="100%" autoplay loop muted controls="false">
    <source src="/_static/videos/demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p> -->



## Abstract 

This project introduces the use of the Action Chunking with Transformers (ACT) technique in single-arm robotic manipulation for vision-guided pick-and-place tasks. ACT employs a Conditional Variational Autoencoder (CVAE) to predict sequences of actions, termed "action chunks," which are groups of actions predicted together to achieve more complex tasks efficiently. Unlike traditional methods that rely solely on joint position data and predict individual actions, our approach integrates visual data to enrich the learning context and enhance execution precision. We acquired the expert data by providing manual demonstrations of the task, allowing the model to learn from real-time, complex action sequences. By predicting these action chunks instead of single actions, the ACT model adapts from dual-arm to single-arm configurations, enhancing control strategies and demonstrating significant improvements in the robot's speed, precision, and reliability. This substantiates the paper's title, "Vision-Guided Imitation Learning Using Action Chunk Transformers," highlighting the critical role of vision in advancing robotic control systems.



```{raw} html
<a href="https://sainavaneet.github.io/ACTfranka.github.io/" target="_blank" class="project-website-button">Project Website</a>
<style>
.project-website-button {
  display: block;
  width: 100%;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  border: 1px solid #000000;
  background: transparent;
  color: #000000;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.project-website-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #000000;
  transition: width 0.3s ease;
}

.project-website-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.project-website-button:hover::after {
  width: 100%;
}

[data-theme="dark"] .project-website-button,
.theme-dark .project-website-button,
.dark .project-website-button {
  border-color: #ffffff;
  color: #ffffff;
}

[data-theme="dark"] .project-website-button::after,
.theme-dark .project-website-button::after,
.dark .project-website-button::after {
  background: #ffffff;
}

[data-theme="dark"] .project-website-button:hover,
.theme-dark .project-website-button:hover,
.dark .project-website-button:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
```

