---
title: 'Hybrid Model Predictive and Iterative Learning Control for Enhanced Leader-Follower Robotic Tracking'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin

# Author notes (optional)
author_notes:
  - 'Equal contribution'
  - 'Equal contribution'

date: '2013-07-01T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2017-01-01T00:00:00Z'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *KNU-EERC2024*
publication_short: 

abstract: |
    This paper presents a novel hybrid control strategy combining Model Predictive Control (MPC) and Iterative Learning Control (ILC) for leader-follower tracking in mobile robots. The primary objective is to enhance the tracking accuracy and robustness of the follower robot as it trails a leader robot in dynamic environments. 

    The MPC component predicts the future states of the follower robot over a finite horizon and optimizes the control inputs to minimize a cost function that includes positional and orientation errors as well as control efforts. Meanwhile, the ILC component refines the control inputs by learning from errors observed in previous iterations. 

    Implemented within the Robot Operating System (ROS) framework for real-time communication and control, our experimental results demonstrate the efficacy of this hybrid MPC-ILC approach. Significant improvements in tracking accuracy and control efficiency are showcased compared to using MPC or ILC alone. 

    For more detailed information, the complete source code is available at GitHub, highlighting the practical applications and effectiveness of our proposed method in real-world scenarios.

    **Index Terms** — Autonomous Navigation, Control Optimization, Cooperative Robotics, Iterative Learning Control (ILC), Leader-Follower Tracking, Mobile Robots, Model Predictive Control (MPC), Real-Time Control, Robotics, Robot Operating System (ROS).


# Summary. An optional shortened abstract.
# summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

tags:
  - LMPC

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: ''
url_code: 'https://github.com/sainavaneet/MPC-ILC'
url_poster: ''
url_project: ''
url_slides: ''
url_video: 'https://www.youtube.com/watch?v=CdYn9fnHEcE'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
#   focal_point: ''
#   preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---

<!-- {{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}} -->

<!-- {{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}} -->

<!-- Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
