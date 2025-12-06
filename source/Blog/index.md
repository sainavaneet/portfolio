# 📝 Blog

```{raw} html
<div class="blogs-advanced-container">
  <div class="blogs-background-pattern"></div>
  <div class="blogs-grid-advanced">
    <article class="blog-card-advanced" data-index="0">
      <div class="blog-card-gradient"></div>
      <a href="./Actfranka/index.html" class="blog-card-link-advanced">
        <div class="blog-card-image-placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div class="blog-card-icon">🤖</div>
        </div>
        <div class="blog-card-content-advanced">
          <div class="blog-card-meta">
            <span class="blog-card-category">Robotics</span>
            <span class="blog-card-read-time">5 min read</span>
          </div>
          <h3 class="blog-card-title-advanced">Vision Guided Imitation Learning using Action Chunk Transformer</h3>
          <p class="blog-card-description-advanced">Action Chunking with Transformers (ACT) technique in single-arm robotic manipulation for vision-guided pick-and-place tasks</p>
          <div class="blog-card-footer">
            <span class="blog-card-read-more">Read Article</span>
            <span class="blog-card-arrow-advanced">→</span>
          </div>
        </div>
      </a>
    </article>
    
    <article class="blog-card-advanced" data-index="1">
      <div class="blog-card-gradient"></div>
      <a href="./go2_robot_isaacsim/index.html" class="blog-card-link-advanced">
        <div class="blog-card-image-placeholder" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <div class="blog-card-icon">🐾</div>
        </div>
        <div class="blog-card-content-advanced">
          <div class="blog-card-meta">
            <span class="blog-card-category">Simulation</span>
            <span class="blog-card-read-time">8 min read</span>
          </div>
          <h3 class="blog-card-title-advanced">Go2 Robot in Isaac Sim (Omniverse)</h3>
          <p class="blog-card-description-advanced">Bringing the Go2 robot into Isaac Sim using the go2_omniverse repository</p>
          <div class="blog-card-footer">
            <span class="blog-card-read-more">Read Article</span>
            <span class="blog-card-arrow-advanced">→</span>
          </div>
        </div>
      </a>
    </article>
    
    <article class="blog-card-advanced" data-index="2">
      <div class="blog-card-gradient"></div>
      <a href="./isaacsim/index.html" class="blog-card-link-advanced">
        <div class="blog-card-image-placeholder" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <div class="blog-card-icon">⚙️</div>
        </div>
        <div class="blog-card-content-advanced">
          <div class="blog-card-meta">
            <span class="blog-card-category">Tutorial</span>
            <span class="blog-card-read-time">12 min read</span>
          </div>
          <h3 class="blog-card-title-advanced">Isaac Sim Installation</h3>
          <p class="blog-card-description-advanced">Step-by-step guide for installing Isaac Sim 2023.1.1 on Ubuntu with Docker and NVIDIA GPU support</p>
          <div class="blog-card-footer">
            <span class="blog-card-read-more">Read Article</span>
            <span class="blog-card-arrow-advanced">→</span>
          </div>
        </div>
      </a>
    </article>
    
    <article class="blog-card-advanced" data-index="3">
      <div class="blog-card-gradient"></div>
      <a href="./Vision-Language-Action-Transformer/index.html" class="blog-card-link-advanced">
        <div class="blog-card-image-placeholder" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
          <div class="blog-card-icon">🧠</div>
        </div>
        <div class="blog-card-content-advanced">
          <div class="blog-card-meta">
            <span class="blog-card-category">AI/ML</span>
            <span class="blog-card-read-time">Coming Soon</span>
          </div>
          <h3 class="blog-card-title-advanced">Vision-Language-Action Transformer</h3>
          <p class="blog-card-description-advanced">Content coming soon...</p>
          <div class="blog-card-footer">
            <span class="blog-card-read-more">Read Article</span>
            <span class="blog-card-arrow-advanced">→</span>
          </div>
        </div>
      </a>
    </article>
    
    <article class="blog-card-advanced" data-index="4">
      <div class="blog-card-gradient"></div>
      <a href="./Bluetooth/index.html" class="blog-card-link-advanced">
        <div class="blog-card-image-placeholder" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);">
          <div class="blog-card-icon">📡</div>
        </div>
        <div class="blog-card-content-advanced">
          <div class="blog-card-meta">
            <span class="blog-card-category">Technology</span>
            <span class="blog-card-read-time">3 min read</span>
          </div>
          <h3 class="blog-card-title-advanced">Bluetooth</h3>
          <p class="blog-card-description-advanced">Blog post about Bluetooth technology</p>
          <div class="blog-card-footer">
            <span class="blog-card-read-more">Read Article</span>
            <span class="blog-card-arrow-advanced">→</span>
          </div>
        </div>
      </a>
    </article>
  </div>
</div>

<style>
/* Advanced Blog Grid with Glassmorphism and 3D Effects */
.blogs-advanced-container {
  max-width: 1400px;
  margin: 4rem auto;
  padding: 0 24px;
  position: relative;
  min-height: 100vh;
}

.blogs-background-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(250, 112, 154, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.blogs-grid-advanced {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.blog-card-advanced {
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.blog-card-advanced[data-index="0"] { animation-delay: 0.1s; }
.blog-card-advanced[data-index="1"] { animation-delay: 0.2s; }
.blog-card-advanced[data-index="2"] { animation-delay: 0.3s; }
.blog-card-advanced[data-index="3"] { animation-delay: 0.4s; }
.blog-card-advanced[data-index="4"] { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.blog-card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.blog-card-advanced:hover .blog-card-gradient {
  opacity: 1;
}

.blog-card-advanced:hover {
  transform: translateY(-12px) rotateX(2deg) rotateY(-2deg);
  box-shadow: 
    0 24px 64px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.5);
}

.blog-card-link-advanced {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
  position: relative;
  z-index: 2;
}

.blog-card-image-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.blog-card-image-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.blog-card-advanced:hover .blog-card-image-placeholder {
  transform: scale(1.05);
}

.blog-card-advanced:hover .blog-card-image-placeholder::before {
  opacity: 1;
}

.blog-card-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.blog-card-advanced:hover .blog-card-icon {
  transform: scale(1.1) rotate(5deg);
}

.blog-card-content-advanced {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.blog-card-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.blog-card-read-time {
  font-size: 0.75rem;
  color: #888;
  font-weight: 500;
}

.blog-card-title-advanced {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  color: #1a1a1a;
  line-height: 1.3;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.blog-card-advanced:hover .blog-card-title-advanced {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-card-description-advanced {
  font-size: 0.95rem;
  font-weight: 400;
  margin: 0;
  color: #666;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.blog-card-read-more {
  font-size: 0.9rem;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.blog-card-advanced:hover .blog-card-read-more {
  color: #764ba2;
  transform: translateX(4px);
}

.blog-card-arrow-advanced {
  font-size: 1.5rem;
  color: #667eea;
  transform: translateX(-8px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: inline-block;
}

.blog-card-advanced:hover .blog-card-arrow-advanced {
  transform: translateX(4px);
  color: #764ba2;
}

/* Dark Mode Support */
[data-theme="dark"] .blog-card-advanced,
.theme-dark .blog-card-advanced,
.dark .blog-card-advanced {
  background: rgba(30, 30, 30, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .blog-card-advanced:hover,
.theme-dark .blog-card-advanced:hover,
.dark .blog-card-advanced:hover {
  box-shadow: 
    0 24px 64px rgba(0, 0, 0, 0.6),
    0 8px 16px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .blog-card-content-advanced,
.theme-dark .blog-card-content-advanced,
.dark .blog-card-content-advanced {
  background: rgba(30, 30, 30, 0.9);
}

[data-theme="dark"] .blog-card-title-advanced,
.theme-dark .blog-card-title-advanced,
.dark .blog-card-title-advanced {
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-theme="dark"] .blog-card-advanced:hover .blog-card-title-advanced,
.theme-dark .blog-card-advanced:hover .blog-card-title-advanced,
.dark .blog-card-advanced:hover .blog-card-title-advanced {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

[data-theme="dark"] .blog-card-description-advanced,
.theme-dark .blog-card-description-advanced,
.dark .blog-card-description-advanced {
  color: #b3b3b3;
}

[data-theme="dark"] .blog-card-read-time,
.theme-dark .blog-card-read-time,
.dark .blog-card-read-time {
  color: #888;
}

[data-theme="dark"] .blog-card-category,
.theme-dark .blog-card-category,
.dark .blog-card-category {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
  color: #8b5cf6;
  border-color: rgba(139, 92, 246, 0.3);
}

[data-theme="dark"] .blog-card-read-more,
.theme-dark .blog-card-read-more,
.dark .blog-card-read-more {
  color: #8b5cf6;
}

[data-theme="dark"] .blog-card-advanced:hover .blog-card-read-more,
.theme-dark .blog-card-advanced:hover .blog-card-read-more,
.dark .blog-card-advanced:hover .blog-card-read-more {
  color: #ec4899;
}

[data-theme="dark"] .blog-card-arrow-advanced,
.theme-dark .blog-card-arrow-advanced,
.dark .blog-card-arrow-advanced {
  color: #8b5cf6;
}

[data-theme="dark"] .blog-card-advanced:hover .blog-card-arrow-advanced,
.theme-dark .blog-card-advanced:hover .blog-card-arrow-advanced,
.dark .blog-card-advanced:hover .blog-card-arrow-advanced {
  color: #ec4899;
}

[data-theme="dark"] .blog-card-footer,
.theme-dark .blog-card-footer,
.dark .blog-card-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .blogs-grid-advanced {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .blogs-advanced-container {
    padding: 0 16px;
    margin: 2rem auto;
  }
  
  .blogs-grid-advanced {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .blog-card-content-advanced {
    padding: 1.5rem;
  }
  
  .blog-card-title-advanced {
    font-size: 1.2rem;
  }
  
  .blog-card-description-advanced {
    font-size: 0.9rem;
  }
  
  .blog-card-advanced:hover {
    transform: translateY(-6px);
  }
}

@media (max-width: 480px) {
  .blog-card-content-advanced {
    padding: 1.25rem;
  }
  
  .blog-card-title-advanced {
    font-size: 1.1rem;
  }
  
  .blog-card-image-placeholder {
    height: 160px;
  }
  
  .blog-card-icon {
    font-size: 3rem;
  }
}
</style>
```
