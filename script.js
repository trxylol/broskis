function typeWriter(element, text, speed = 100) {
  let i = 0;
  let isDeleting = false;
  element.textContent = '';
  
  function animate() {
    if (!isDeleting && i < text.length) {
      // Typing
      element.textContent += text.charAt(i);
      i++;
      setTimeout(animate, speed);
    } else if (!isDeleting && i === text.length) {
      // Pause at the end before deleting
      isDeleting = true;
      setTimeout(animate, speed * 3);
    } else if (isDeleting && i > 0) {
      // Deleting
      i--;
      element.textContent = text.substring(0, i);
      setTimeout(animate, speed / 2);
    } else if (isDeleting && i === 0) {
      // Reset to start typing again
      isDeleting = false;
      setTimeout(animate, speed * 2);
    }
  }
  
  animate();
}

// Add mouse movement tracking with corrected rotation
document.addEventListener('mousemove', (e) => {
  const box = document.querySelector('.smokey-box');
  const rect = box.getBoundingClientRect();
  const boxCenterX = rect.left + rect.width / 2;
  const boxCenterY = rect.top + rect.height / 2;
  
  // Calculate the angle between mouse and box center
  const deltaX = e.clientX - boxCenterX;
  const deltaY = e.clientY - boxCenterY;
  
  // Calculate rotation angles (limited to ±20 degrees)
  // Removed the negative multiplier to correct the rotation direction
  const rotateX = Math.min(Math.max(-20, (deltaY / window.innerHeight) * 40), 20);
  const rotateY = Math.min(Math.max(-20, (deltaX / window.innerWidth) * 40), 20);
  
  // Apply smooth rotation transform
  box.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset rotation when mouse leaves the window
document.addEventListener('mouseleave', () => {
  const box = document.querySelector('.smokey-box');
  box.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// Start the typewriter effect when the page loads
window.addEventListener('load', () => {
  const element = document.getElementById('typewriter');
  typeWriter(element, 'legalmoneyglitch', 150);
});

// Add wallpaper switching functionality
let isDefaultWallpaper = true;
const defaultWallpaper = 'https://i.pinimg.com/736x/83/7a/7a/837a7a0107b17b8448d4ab14277cc016.jpg';
const alternateWallpaper = 'https://i.pinimg.com/736x/27/26/17/272617a40f7531fd0d70c4c4df351f7d.jpg';

// Add audio functionality
const audio = new Audio('');
audio.loop = true;
let isPlaying = false;

document.querySelector('.start-button').addEventListener('click', () => {
  const body = document.body;
  isDefaultWallpaper = !isDefaultWallpaper;
  
  // Add fade transition
  body.style.opacity = '0';
  
  setTimeout(() => {
    body.style.backgroundImage = `url('${isDefaultWallpaper ? defaultWallpaper : alternateWallpaper}')`;
    body.style.opacity = '1';
  }, 300);

  // Toggle music
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
});
