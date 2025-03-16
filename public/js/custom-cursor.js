document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  
    document.addEventListener('mouseenter', () => {
      cursor.style.display = 'block';
    });
  
    document.addEventListener('mouseleave', () => {
      cursor.style.display = 'none';
    });
  
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.classList.add('grow');
      });
      link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
      });
    });
  });
  