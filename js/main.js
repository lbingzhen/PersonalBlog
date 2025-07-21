
// frontend_developer_portfolio/frontend/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // 项目卡片点击事件处理
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length > 0) {
    projectCards.forEach(card => {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('href').split('=')[1];
        localStorage.setItem('currentProjectId', projectId);
        window.location.href = `project-details.html?id=${projectId}`;
      });
    });
  }

  // 社交链接点击事件
  const socialLinks = document.querySelectorAll('footer a');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      alert(`即将跳转到${this.textContent}\n功能正在开发中...`);
    });
  });

  // 技能进度条动画
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  skillProgressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });

  // 初始化粒子效果
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4facfe" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { 
          enable: true, 
          distance: 150, 
          color: "#4facfe", 
          opacity: 0.4, 
          width: 1,
          warp: true 
        },
        move: { 
          enable: true, 
          speed: 2, 
          direction: "none", 
          random: true, 
          straight: false, 
          out_mode: "out",
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { 
            enable: true, 
            mode: "repulse",
            distance: 100
          },
          onclick: { 
            enable: true, 
            mode: "push" 
          }
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          }
        }
      }
    });

    // 鼠标移动避让效果
    const canvas = document.querySelector('#particles-js canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (window.pJSDom && window.pJSDom.length > 0) {
          const pJS = window.pJSDom[0].pJS;
          if (pJS && pJS.particles && pJS.particles.array) {
            pJS.particles.array.forEach(particle => {
              const dx = particle.x - mouseX;
              const dy = particle.y - mouseY;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (100 - distance) / 10;
                
                particle.vx = forceDirectionX * force;
                particle.vy = forceDirectionY * force;
              }
            });
          }
        }
      });
    }
  }
});

// 页面加载完成后初始化粒子效果
if (document.readyState === 'complete') {
  initParticles();
} else {
  window.addEventListener('load', initParticles);
}

function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4facfe" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { 
          enable: true, 
          distance: 150, 
          color: "#4facfe", 
          opacity: 0.4, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: 2, 
          direction: "none", 
          random: true, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  } else {
    console.warn('particles.js 未加载');
  }
}
