document.addEventListener('DOMContentLoaded', function() {
    // Only proceed if custom cursor is enabled
    if (!document.body.classList.contains('custom-cursor-enabled')) return;
  
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor cursor--large';
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor cursor--small';
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
  
    let isStuck = false;
    let mouse = { x: -100, y: -100 };
    let scrollHeight = 0;
  
    window.addEventListener('scroll', function() {
      scrollHeight = window.scrollY;
    });
  
    const buttons = document.querySelectorAll("button, a, [data-cursor-effect]");
  
    buttons.forEach((button) => {
      button.addEventListener("pointerenter", handleMouseEnter);
      button.addEventListener("pointerleave", handleMouseLeave);
    });
  
    document.addEventListener("pointermove", updateCursorPosition);
    document.addEventListener("pointerdown", () => {
      gsap.to(cursorInner, { duration: 0.15, scale: 1.5 });
    });
    
    document.addEventListener("pointerup", () => {
      gsap.to(cursorInner, { duration: 0.15, scale: 1 });
    });
  
    function updateCursorPosition(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
  
    function updateCursor() {
      gsap.set(cursorInner, { x: mouse.x, y: mouse.y + scrollHeight });
      
      if (!isStuck) {
        gsap.to(cursorOuter, {
          duration: 0.15,
          x: mouse.x - cursorOuter.offsetWidth/2,
          y: mouse.y + scrollHeight - cursorOuter.offsetHeight/2
        });
      }
      requestAnimationFrame(updateCursor);
    }
  
    function handleMouseEnter(e) {
      isStuck = true;
      const targetBox = e.currentTarget.getBoundingClientRect();
      gsap.to(cursorOuter, {
        duration: 0.2,
        x: targetBox.left,
        y: targetBox.top + scrollHeight,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: 0,
        backgroundColor: "rgba(255, 255, 255, 0.1)"
      });
    }
  
    function handleMouseLeave() {
      isStuck = false;
      gsap.to(cursorOuter, {
        duration: 0.2,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "transparent"
      });
    }
  
    updateCursor();
  });