// script.js - KONTACTOYA - Versión Optimizada v3.0
document.addEventListener("DOMContentLoaded", () => {
  const PREFERS_REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========== SVG GRADIENTS ========== */
  const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDefs.setAttribute('width', '0');
  svgDefs.setAttribute('height', '0');
  svgDefs.style.position = 'absolute';
  svgDefs.innerHTML = `
    <defs>
      <linearGradient id="kpiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#ff0088;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#ff66cc;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      </linearGradient>
    </defs>
  `;
  document.body.appendChild(svgDefs);

  /* ========== GRADIENT TEXT INIT ========== */
  function initGradientTexts() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(el => {
      const colors = JSON.parse(el.getAttribute('data-colors') || '["#ff0088", "#ff66cc", "#ff0088"]');
      const speed = el.getAttribute('data-speed') || '5';
      el.style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
      el.style.animationDuration = `${speed}s`;
    });
  }
  initGradientTexts();

  /* ========== LOADER ========== */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.style.display = "none";
        loader.setAttribute('aria-hidden', 'true');
      }
    }, 2500);
  });

  /* ========== NAVBAR ========== */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* ========== SCROLL TO SECTION (GLOBAL) ========== */
  window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ========== REVEAL ANIMATIONS ========== */
  const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // Re-animate on each scroll into view
      if (entry.target.classList.contains('scale-in') || 
          entry.target.classList.contains('rotate-in') ||
          entry.target.classList.contains('blur-in')) {
        entry.target.style.animation = 'none';
        setTimeout(() => {
          entry.target.style.animation = '';
        }, 10);
      }
    }
  });
}, { 
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Selectores actualizados
document.querySelectorAll(
  ".fade-in, .fade-up, .fade-left, .fade-right, .section, " +
  ".service-card, .kpi-card-horizontal, .testimonial-card, " +
  ".slide-left, .slide-right, .scale-in, .rotate-in, .blur-in, .stagger-item"
).forEach(el => {
  revealObserver.observe(el);
});

  /* ========== PARTÍCULAS CANVAS ========== */
  (function particles() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const numParticles = Math.max(20, Math.floor(w / 50));
    const numLines = Math.max(6, Math.floor(w / 180));
    const particles = [];
    const lines = [];

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Particle {
      constructor() {
        this.x = rand(0, w);
        this.y = rand(0, h);
        this.r = rand(0.8, 2.2);
        this.vx = rand(-0.25, 0.25);
        this.vy = rand(-0.25, 0.25);
        this.color = Math.random() > 0.6 ? 'rgba(255,0,136,0.2)' : 'rgba(139,92,246,0.15)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Line {
      constructor() {
        this.x = rand(0, w);
        this.y = rand(0, h);
        this.len = rand(100, 250);
        this.speed = rand(0.08, 0.35);
        this.angle = rand(0, Math.PI * 2);
        this.opacity = rand(0.04, 0.15);
      }

      reset() {
        this.x = rand(0, w);
        this.y = rand(0, h);
        this.angle = rand(0, Math.PI * 2);
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < -this.len || this.x > w + this.len ||
            this.y < -this.len || this.y > h + this.len) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,0,136,${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.len,
          this.y - Math.sin(this.angle) * this.len
        );
        ctx.shadowColor = 'rgba(255,0,136,0.1)';
        ctx.shadowBlur = 10;
        ctx.stroke();
      }
    }

    function init() {
      particles.length = 0;
      lines.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
      for (let j = 0; j < numLines; j++) {
        lines.push(new Line());
      }
    }

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, w, h);
      lines.forEach(line => {
        line.update();
        line.draw();
      });
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  })();

  /* ========== SERVICIOS - EXPANSIÓN ========== */
  (function serviceCards() {
    const cards = Array.from(document.querySelectorAll('.service-card'));
    if (!cards.length) return;

    function closeAll(except) {
      cards.forEach(card => {
        if (card !== except) {
          card.classList.remove('expanded');
          card.setAttribute('aria-expanded', 'false');
          const full = card.querySelector('.service-full');
          if (full) full.setAttribute('aria-hidden', 'true');
        }
      });
    }

    cards.forEach(card => {
      card.setAttribute('aria-expanded', 'false');
      const full = card.querySelector('.service-full');
      if (full) full.setAttribute('aria-hidden', 'true');

      card.addEventListener('click', (e) => {
        if (e.target.closest('button, a, input, select, textarea')) return;

        const isExpanded = card.classList.toggle('expanded');
        card.setAttribute('aria-expanded', String(isExpanded));
        if (full) full.setAttribute('aria-hidden', String(!isExpanded));

        if (isExpanded) {
          closeAll(card);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.service-card')) {
        closeAll();
      }
    });
  })();

  /* ========== KPIs CON OVERLAY Y REINICIO DE ANIMACIONES ========== */
  (function animateKPIs() {
    const kpiCards = Array.from(document.querySelectorAll('.kpi-card-horizontal'));
    const overlay = document.getElementById('kpiOverlay');
    if (!kpiCards.length) return;

    let activeCard = null;

    function resetAnimations(card) {
      // Reset circular
      const circleProgress = card.querySelector('.circle-progress');
      if (circleProgress) {
        circleProgress.style.strokeDashoffset = '314';
      }

      // Reset gauge
      const gaugeProgress = card.querySelector('.gauge-progress');
      if (gaugeProgress) {
        gaugeProgress.style.strokeDashoffset = '157';
      }

      // Reset timer
      const timerProgress = card.querySelector('.timer-progress');
      if (timerProgress) {
        timerProgress.style.strokeDashoffset = '314';
      }

      // Reset bar
      const barFill = card.querySelector('.bar-fill');
      if (barFill) {
        barFill.style.width = '0%';
      }

      // Reset columns
      const columnFills = card.querySelectorAll('.column-fill');
      columnFills.forEach(fill => {
        fill.style.height = '0%';
      });

      // Reset numbers
      const numberEl = card.querySelector('[data-target]');
      if (numberEl) {
        numberEl.textContent = '0';
      }
    }

    function animateNumber(el, target, duration = 2500) {
      if (!el) return;
      const startTime = performance.now();

      function frame(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);

        el.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      }

      requestAnimationFrame(frame);
    }

    function animateKPIVisuals(card) {
      const circleProgress = card.querySelector('.circle-progress');
      if (circleProgress) {
        const percent = parseFloat(circleProgress.getAttribute('data-percent') || '0');
        const circumference = 2 * Math.PI * 50;
        const offset = circumference - (percent / 100) * circumference;
        setTimeout(() => {
          circleProgress.style.strokeDashoffset = offset;
        }, 100);
      }

      const gaugeProgress = card.querySelector('.gauge-progress');
      if (gaugeProgress) {
        const percent = parseFloat(gaugeProgress.getAttribute('data-percent') || '0');
        const totalLength = 157;
        const offset = totalLength - (percent / 100) * totalLength;
        setTimeout(() => {
          gaugeProgress.style.strokeDashoffset = offset;
        }, 100);
      }

      const timerProgress = card.querySelector('.timer-progress');
      if (timerProgress) {
        const percent = 65; // 320s / 500s max
        const circumference = 2 * Math.PI * 50;
        const offset = circumference - (percent / 100) * circumference;
        setTimeout(() => {
          timerProgress.style.strokeDashoffset = offset;
        }, 100);
      }

      const barFill = card.querySelector('.bar-fill');
      if (barFill) {
        const percent = parseFloat(barFill.getAttribute('data-percent') || '0');
        setTimeout(() => {
          barFill.style.width = `${percent}%`;
        }, 100);
      }

      const columnFills = card.querySelectorAll('.column-fill');
      columnFills.forEach((fill, index) => {
        setTimeout(() => {
          fill.style.height = '100%';
        }, 100 + (index * 150));
      });
    }

    function highlightCard(card) {
  kpiCards.forEach(c => c.classList.remove('highlighted'));
  card.classList.add('highlighted');
  activeCard = card;
  // Overlay eliminado para mejor UX
}

    function clearHighlight() {
  kpiCards.forEach(c => c.classList.remove('highlighted'));
  activeCard = null;
  // Overlay eliminado
}

    kpiCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        highlightCard(card);
      });

      card.addEventListener('focus', () => {
        highlightCard(card);
      });
    });

    if (overlay) {
      overlay.addEventListener('click', clearHighlight);
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.kpi-card-horizontal')) {
        clearHighlight();
      }
    });

    // Intersection Observer con reinicio de animaciones
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const numberEl = card.querySelector('[data-target]');

        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          card.classList.add('visible');

          resetAnimations(card);

          setTimeout(() => {
            if (numberEl) {
              const target = parseInt(numberEl.getAttribute('data-target'), 10);
              animateNumber(numberEl, target);
            }
            animateKPIVisuals(card);
          }, 50);
        } else {
          card.classList.remove('visible');
        }
      });
    }, { threshold: [0, 0.3, 0.6] });

    kpiCards.forEach(card => kpiObserver.observe(card));
  })();

  /* ========== CLIENTES CON OVERLAY ========== */
  (function initClients() {
  const clientsSection = document.getElementById('clientes');
  const logoBoxes = document.querySelectorAll('.logo-box');
  const infoCard = clientsSection?.querySelector('.client-info-card');
  const clientName = document.getElementById('clientName');
  const clientDesc = document.getElementById('clientDesc');

  if (!logoBoxes.length || !infoCard) return;

  let activeBox = null;
  let leaveTimeout = null;

  function showClientInfo(box) {
    clearTimeout(leaveTimeout);

    const company = box.getAttribute('data-company') || 'Cliente';
    const desc = box.getAttribute('data-desc') || 'Socio estratégico';

    // Remover highlight de todos
    logoBoxes.forEach(b => b.classList.remove('highlighted'));
    
    // Highlight actual
    box.classList.add('highlighted');
    activeBox = box;

    // Actualizar texto
    if (clientName) clientName.textContent = company;
    if (clientDesc) clientDesc.textContent = desc;
    
    // Mostrar card
    infoCard.classList.add('active');
  }

  function hideClientInfo() {
    leaveTimeout = setTimeout(() => {
      logoBoxes.forEach(b => b.classList.remove('highlighted'));
      infoCard.classList.remove('active');
      activeBox = null;
      
      if (clientName) clientName.textContent = 'Nuestros Aliados';
      if (clientDesc) clientDesc.textContent = 'Pasa el cursor sobre un cliente para ver más información';
    }, 300);
  }

  logoBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
      showClientInfo(box);
    });

    box.addEventListener('mouseleave', () => {
      hideClientInfo();
    });

    box.addEventListener('focus', () => {
      showClientInfo(box);
    });

    box.addEventListener('blur', () => {
      hideClientInfo();
    });
  });

  // Mantener card visible si el mouse está sobre ella
  infoCard.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimeout);
  });

  infoCard.addEventListener('mouseleave', () => {
    hideClientInfo();
  });
})();


/* ========== PRICING TABLE ========== */
function initPricing() {
  const billingToggle = document.getElementById('billing-toggle');
  const amounts = document.querySelectorAll('.amount');
  const toggleComparison = document.getElementById('toggle-comparison');
  const comparisonTable = document.getElementById('comparison-table');

  if (billingToggle && amounts.length) {
    billingToggle.addEventListener('change', () => {
      const isYearly = billingToggle.checked;
      
      amounts.forEach(amount => {
        const monthly = amount.getAttribute('data-monthly');
        const yearly = amount.getAttribute('data-yearly');
        
        // Animación de cambio
        amount.style.transform = 'scale(0.8)';
        amount.style.opacity = '0';
        
        setTimeout(() => {
          amount.textContent = isYearly ? yearly : monthly;
          amount.style.transform = 'scale(1)';
          amount.style.opacity = '1';
        }, 200);
      });
    });
  }

  if (toggleComparison && comparisonTable) {
    toggleComparison.addEventListener('click', () => {
      toggleComparison.classList.toggle('active');
      comparisonTable.classList.toggle('active');
      
      const span = toggleComparison.querySelector('span');
      if (comparisonTable.classList.contains('active')) {
        span.textContent = 'Ocultar comparación';
      } else {
        span.textContent = 'Ver comparación detallada';
      }
    });
  }
}

// Función global para seleccionar plan
window.selectPlan = function(planName) {
  const billingToggle = document.getElementById('billing-toggle');
  const isYearly = billingToggle?.checked || false;
  const period = isYearly ? 'Anual' : 'Mensual';
  
  // Aquí podrías redirigir a un formulario de contacto con el plan preseleccionado
  const message = `¡Excelente elección! Has seleccionado el plan ${planName} (${period}).
  
Nuestro equipo comercial te contactará en menos de 2 horas para finalizar la contratación.

¿Deseas que te redireccione al formulario de contacto?`;
  
  if (confirm(message)) {
    scrollToSection('contacto');
    
    // Pre-llenar el formulario si existe
    const serviceSelect = document.querySelector('[name="service"]');
    if (serviceSelect) {
      const option = Array.from(serviceSelect.options).find(opt => 
        opt.textContent.includes('BPO') || opt.textContent.includes('Completo')
      );
      if (option) serviceSelect.value = option.value;
    }
    
    const messageTextarea = document.querySelector('[name="message"]');
    if (messageTextarea) {
      messageTextarea.value = `Estoy interesado en el plan ${planName} (facturación ${period.toLowerCase()}).`;
      messageTextarea.focus();
    }
  }
};

/* ========== NEWSLETTER ========== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');

  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      alert('Por favor ingresa tu email.');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }

    // Simular descarga y suscripción
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Procesando...</span>
      <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `;

    // Simular petición
    setTimeout(() => {
      submitBtn.innerHTML = `
        <span>✓ ¡Descargando!</span>
      `;

      // Simular descarga del PDF
      setTimeout(() => {
        // En producción, aquí harías la petición real al backend
        alert(`✅ ¡Perfecto ${email}!\n\nTu whitepaper "10 KPIs Esenciales" se está descargando.\n\nRevisarás tu bandeja de entrada, también te enviamos el enlace por email.\n\n¡Bienvenido a nuestra comunidad de +12,500 profesionales!`);
        
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;

        // Aquí podrías iniciar una descarga real
        // window.open('/downloads/whitepaper-10-kpis.pdf', '_blank');
      }, 1000);
    }, 1500);
  });
}


/* ========== SCROLL PROGRESS BAR ========== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
  }

  window.addEventListener('scroll', updateProgress);
  updateProgress();
}

/* ========== FLOATING ACTION BUTTONS ========== */
function initFloatingActions() {
  const fabWhatsapp = document.getElementById('fab-whatsapp');
  const fabCall = document.getElementById('fab-call');
  const fabEmail = document.getElementById('fab-email');

  if (fabWhatsapp) {
    fabWhatsapp.addEventListener('click', () => {
      window.open('https://wa.me/51987654321?text=Hola%20KONTACTOYA%2C%20quiero%20información', '_blank');
    });
  }

  if (fabCall) {
    fabCall.addEventListener('click', () => {
      window.location.href = 'tel:+51987654321';
    });
  }

  if (fabEmail) {
    fabEmail.addEventListener('click', () => {
      window.location.href = 'mailto:contacto@kontactoya.com?subject=Consulta desde la web';
    });
  }
}

/* ========== LIVE STATS COUNTER ========== */
function initLiveStats() {
  const callsEl = document.getElementById('calls-today');
  const agentsEl = document.getElementById('agents-active');
  const timeEl = document.getElementById('avg-time');
  const satisfactionEl = document.getElementById('satisfaction');
  const activityFeed = document.getElementById('activity-feed');

  if (!callsEl) return;

  // Increment calls
  setInterval(() => {
    const current = parseInt(callsEl.textContent.replace(/,/g, ''));
    const increment = Math.floor(Math.random() * 3) + 1;
    const newValue = current + increment;
    callsEl.textContent = newValue.toLocaleString('es-PE');
  }, 3000);

  // Agents fluctuation
  setInterval(() => {
    const current = parseInt(agentsEl.textContent);
    const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const newValue = Math.max(240, Math.min(250, current + change));
    agentsEl.textContent = newValue;
  }, 8000);

  // Time optimization
  setInterval(() => {
    const current = parseInt(timeEl.textContent.replace('s', ''));
    const change = Math.floor(Math.random() * 3) - 1; // -1 to +1
    const newValue = Math.max(310, Math.min(320, current + change));
    timeEl.textContent = newValue + 's';
  }, 6000);

  // Satisfaction
  setInterval(() => {
    const current = parseFloat(satisfactionEl.textContent.replace('%', ''));
    const change = (Math.random() * 0.2) - 0.1;
    const newValue = Math.max(93.5, Math.min(94.5, current + change));
    satisfactionEl.textContent = newValue.toFixed(1) + '%';
  }, 7000);

  // Activity feed
  const activities = [
    { icon: '📞', text: '<strong>Llamada entrante</strong> - Atención al cliente' },
    { icon: '✅', text: '<strong>Caso resuelto</strong> - Soporte técnico' },
    { icon: '💬', text: '<strong>Chat iniciado</strong> - Consulta de ventas' },
    { icon: '📧', text: '<strong>Email respondido</strong> - Información de productos' },
    { icon: '🎯', text: '<strong>Venta cerrada</strong> - Plan Premium' },
    { icon: '🔄', text: '<strong>Llamada transferida</strong> - Área especializada' },
    { icon: '⭐', text: '<strong>Calificación 5 estrellas</strong> - Cliente satisfecho' },
    { icon: '📱', text: '<strong>WhatsApp atendido</strong> - Consulta rápida' }
  ];

  function addActivity() {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-icon">${activity.icon}</div>
      <div class="activity-text">${activity.text}</div>
      <div class="activity-time">hace ${Math.floor(Math.random() * 20) + 1} seg</div>
    `;
    
    if (activityFeed) {
      activityFeed.insertBefore(item, activityFeed.firstChild);
      
      // Keep only 5 items
      while (activityFeed.children.length > 5) {
        activityFeed.removeChild(activityFeed.lastChild);
      }
    }
  }

  // Add new activity every 4-8 seconds
  setInterval(addActivity, Math.random() * 4000 + 4000);
}

/* ========== FAQ ACCORDION ========== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Cerrar todos
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle actual
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ========== CALCULADORA ROI ========== */
function initROICalculator() {
  const callsInput = document.getElementById('monthly-calls');
  const costInput = document.getElementById('current-cost');
  const agentInput = document.getElementById('agent-count');
  const monthlySavings = document.getElementById('monthly-savings');
  const yearlySavings = document.getElementById('yearly-savings');
  const roiMonths = document.getElementById('roi-months');
  const canvas = document.getElementById('roiChart');

  if (!callsInput || !canvas) return;

  const ctx = canvas.getContext('2d');
  let chart = null;

  function calculateROI() {
    const calls = parseInt(callsInput.value) || 10000;
    const cost = parseFloat(costInput.value) || 5;
    const agents = parseInt(agentInput.value) || 20;

    const currentMonthlyCost = calls * cost;
    const optimizationRate = 0.30; // 30% improvement
    const savings = currentMonthlyCost * optimizationRate;
    const yearlySavingsVal = savings * 12;
    const months = Math.ceil(agents * 500 / savings); // Implementation cost estimation

    monthlySavings.textContent = `S/ ${savings.toLocaleString('es-PE', { maximumFractionDigits: 0 })}`;
    yearlySavings.textContent = `S/ ${yearlySavingsVal.toLocaleString('es-PE', { maximumFractionDigits: 0 })}`;
    roiMonths.textContent = `${months} meses`;

    drawChart(currentMonthlyCost, savings);
  }

  function drawChart(current, savings) {
    const optimized = current - savings;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate angles
    const total = current;
    const angle1 = (optimized / total) * 2 * Math.PI;
    const angle2 = (savings / total) * 2 * Math.PI;

    // Draw optimized cost (green)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, angle1);
    ctx.closePath();
    ctx.fillStyle = '#10b981';
    ctx.fill();

    // Draw savings (gradient pink)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle1, angle1 + angle2);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff0088');
    gradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Text
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 24px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('30%', centerX, centerY - 15);
    ctx.font = '14px Inter';
    ctx.fillStyle = '#666';
    ctx.fillText('Ahorro', centerX, centerY + 10);

    // Legend
    ctx.textAlign = 'left';
    ctx.font = '600 14px Inter';
    
    // Green box
    ctx.fillStyle = '#10b981';
    ctx.fillRect(20, canvas.height - 60, 20, 20);
    ctx.fillStyle = '#333';
    ctx.fillText('Costo optimizado', 50, canvas.height - 45);
    
    // Pink box
    const pinkGradient = ctx.createLinearGradient(20, canvas.height - 30, 40, canvas.height - 30);
    pinkGradient.addColorStop(0, '#ff0088');
    pinkGradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = pinkGradient;
    ctx.fillRect(20, canvas.height - 30, 20, 20);
    ctx.fillStyle = '#333';
    ctx.fillText('Tu ahorro', 50, canvas.height - 15);
  }

  callsInput.addEventListener('input', calculateROI);
  costInput.addEventListener('input', calculateROI);
  agentInput.addEventListener('input', calculateROI);

  calculateROI();
}


/* ========== CASOS DE ÉXITO ANIMACIÓN ========== */
function initCaseStudies() {
  const caseCards = document.querySelectorAll('.case-card');
  if (!caseCards.length) return;

  const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const metrics = entry.target.querySelectorAll('.metric-value');
        
        metrics.forEach(metric => {
          const target = parseInt(metric.getAttribute('data-value'));
          animateMetricValue(metric, target);
        });
      }
    });
  }, { threshold: 0.5 });

  caseCards.forEach(card => caseObserver.observe(card));

  function animateMetricValue(el, target, duration = 2000) {
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }
}


  /* ========== CAREERS REEL ========== */

  function initCareersReel() {
    const root = document.getElementById('reelCareers');
    if (!root) return;

    const slides = [...root.querySelectorAll('.slide')];
    const progress = document.getElementById('reelProgressCareers');
    const title = document.getElementById('reelCareersTitle');
    const desc = document.getElementById('reelCareersDesc');
    const prevBtn = document.getElementById('prevCareers');
    const nextBtn = document.getElementById('nextCareers');

    const fills = [];
    const duration = 5000;
    let current = 0;
    let startTime = null;
    let paused = false;
    let rafId = null;

    progress.innerHTML = '';
    slides.forEach(() => {
      const slot = document.createElement('div');
      slot.className = 'slot';
      const fill = document.createElement('div');
      fill.className = 'fill';
      slot.appendChild(fill);
      progress.appendChild(slot);
      fills.push(fill);
    });

    function showSlide(index) {
      current = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === current);
      });

      title.textContent = slides[current].dataset.title || '';
      desc.textContent = slides[current].dataset.desc || '';

      fills.forEach((fill, i) => {
        fill.style.width = i < current ? '100%' : '0%';
      });

      startTime = performance.now();
    }

    function next() {
      showSlide(current + 1);
    }

    function prev() {
      showSlide(current - 1);
    }

    function updateProgress(timestamp) {
      if (!startTime) startTime = timestamp;

      if (!paused) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        fills[current].style.width = `${progress * 100}%`;

        if (elapsed >= duration) {
          next();
        }
      }

      rafId = requestAnimationFrame(updateProgress);
    }

    prevBtn?.addEventListener('click', () => {
      prev();
      startTime = performance.now();
    });

    nextBtn?.addEventListener('click', () => {
      next();
      startTime = performance.now();
    });

    root.addEventListener('mouseenter', () => {
      paused = true;
    });

    root.addEventListener('mouseleave', () => {
      paused = false;
      startTime = performance.now();
    });

    showSlide(0);
    rafId = requestAnimationFrame(updateProgress);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        paused = true;
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        paused = false;
        startTime = performance.now();
        rafId = requestAnimationFrame(updateProgress);
      }
    });
  }

  /* ========== CAREERS FORM ========== */
  function initCareersForm() {
    const form = document.getElementById('applyForm');
    const cvInput = document.getElementById('cvFile');
    const cvBtn = document.getElementById('cvBtn');
    const cvFilename = document.getElementById('cvFilename');
    const salaryRange = document.getElementById('salaryRange');
    const salaryValue = document.getElementById('salaryValue');
    const salaryMsg = document.getElementById('salaryMsg');

    if (cvBtn && cvInput) {
      cvBtn.addEventListener('click', () => cvInput.click());
    }

    if (cvInput && cvFilename) {
      cvInput.addEventListener('change', () => {
        const file = cvInput.files && cvInput.files[0];
        const maxMB = 6;

        if (!file) {
          cvFilename.textContent = 'PDF o DOC (máx 6 MB)';
          return;
        }

        if (file.size > maxMB * 1024 * 1024) {
          cvFilename.textContent = `Archivo demasiado grande (máx ${maxMB}MB).`;
          cvInput.value = '';
          return;
        }

        cvFilename.textContent = file.name;
      });
    }

    function formatCurrency(n) {
      return `S/ ${Number(n).toLocaleString('es-PE')}`;
    }

    if (salaryRange && salaryValue && salaryMsg) {
      function updateSalaryUI() {
        const value = Number(salaryRange.value);
        const max = Number(salaryRange.max);

        if (value >= max) {
          salaryValue.textContent = `${formatCurrency(max)}+`;
        } else {
          salaryValue.textContent = formatCurrency(value);
        }

        const percent = (value - Number(salaryRange.min)) / (max - Number(salaryRange.min));

        if (percent > 0.75) {
          salaryMsg.textContent = 'El único límite lo pones tú — apunta alto.';
        } else if (percent > 0.45) {
          salaryMsg.textContent = 'Muy bien — proponte crecer y nosotros te apoyamos.';
        } else {
          salaryMsg.textContent = 'Comienza tu camino: con formación y esfuerzo subirás rápido.';
        }
      }

      updateSalaryUI();
      salaryRange.addEventListener('input', updateSalaryUI);
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const area = document.getElementById('area').value;

        if (!fullname || !email || !phone || !area) {
          alert('Por favor completa todos los campos obligatorios.');
          return;
        }

        const phoneRegex = /^[+\d\s()-]{7,20}$/;
        if (!phoneRegex.test(phone)) {
          alert('Ingresa un número de teléfono válido.');
          return;
        }

        const file = cvInput.files && cvInput.files[0];
        if (!file) {
          if (!confirm('No subiste CV. ¿Deseas enviar la postulación sin CV?')) {
            return;
          }
        }

        alert('✅ Postulación recibida. Gracias — nos pondremos en contacto si tu perfil encaja.');
        form.reset();
        if (cvFilename) cvFilename.textContent = 'PDF o DOC (máx 6 MB)';
        if (salaryValue) salaryValue.textContent = formatCurrency(2000);
      });
    }
  }

  /* ========== CONTACTO FORM ========== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const service = form.querySelector('[name="service"]').value;
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !phone || !service || !message) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
      }

      alert('✅ Mensaje enviado con éxito. Nos pondremos en contacto en menos de 24 horas.');
      form.reset();
    });
  }

  /* ========== CHATBOT INTELIGENTE ========== */
  function initChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbot-toggle');
    const closeBtn = document.querySelector('.chatbot-close');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');
    const badge = document.querySelector('.chatbot-badge');

    if (!chatbot || !toggle) return;

    toggle.addEventListener('click', () => {
      chatbot.classList.toggle('open');
      if (chatbot.classList.contains('open')) {
        input.focus();
        if (badge) badge.style.display = 'none';
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        chatbot.classList.remove('open');
      });
    }

    document.querySelectorAll('.quick-reply').forEach(btn => {
      btn.addEventListener('click', () => {
        const message = btn.getAttribute('data-message');
        if (message) {
          addUserMessage(message);
          setTimeout(() => {
            respondToMessage(message);
          }, 800);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = input.value.trim();

      if (message) {
        addUserMessage(message);
        input.value = '';

        setTimeout(() => {
          respondToMessage(message);
        }, 1000);
      }
    });

    function addUserMessage(text) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message user';
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${escapeHtml(text)}</p>
          <span class="message-time">${getCurrentTime()}</span>
        </div>
      `;
      messages.appendChild(messageDiv);
      scrollToBottom();
    }

    function addBotMessage(text) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message bot';
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <img src="https://i.pravatar.cc/40?img=48" alt="Bot" />
        </div>
        <div class="message-content">
          <p>${text}</p>
          <span class="message-time">${getCurrentTime()}</span>
        </div>
      `;
      messages.appendChild(messageDiv);
      scrollToBottom();
    }

    function respondToMessage(userMessage) {
      const msg = userMessage.toLowerCase();
      let response = '';

      // Respuestas mejoradas con detección inteligente
      if (msg.includes('servicio') || msg.includes('ofrecen') || msg.includes('hacen') || msg.includes('qué hacen') || msg.includes('que servicio')) {
        response = '💼 Ofrecemos tres servicios principales:<br><br><strong>1. Atención al Cliente 24/7</strong> - Soporte omnicanal<br><strong>2. Televentas & Retención</strong> - Conversión y fidelización<br><strong>3. Gestión de Cobranza</strong> - Recuperación efectiva<br><br>¿Sobre cuál quieres saber más?';
      }
      else if (msg.includes('atención') || msg.includes('soporte') || msg.includes('24/7') || msg.includes('cliente')) {
        response = '📞 <strong>Atención al Cliente 24/7:</strong><br><br>✓ Soporte multicanal (teléfono, chat, email, WhatsApp)<br>✓ SLA garantizado<br>✓ 94% CSAT promedio<br>✓ Reportes en tiempo real<br><br>¿Te gustaría una cotización personalizada?';
      }
      else if (msg.includes('televenta') || msg.includes('venta') || msg.includes('conversión') || msg.includes('comercial')) {
        response = '📈 <strong>Televentas & Retención:</strong><br><br>✓ Tasa de conversión del 12%<br>✓ Scripts optimizados con A/B testing<br>✓ CRM integrado<br>✓ Coaching continuo<br><br>¿Quieres ver casos de éxito?';
      }
      else if (msg.includes('cobranza') || msg.includes('recuperación') || msg.includes('mora') || msg.includes('deuda')) {
        response = '💰 <strong>Gestión de Cobranza:</strong><br><br>✓ Segmentación por scoring<br>✓ Enfoque humano y empático<br>✓ Cumplimiento normativo garantizado<br>✓ Opciones de pago flexibles<br><br>¿Necesitas mejorar tu tasa de recuperación?';
      }
      else if (msg.includes('cotiza') || msg.includes('precio') || msg.includes('costo') || msg.includes('contratar') || msg.includes('cuánto')) {
        response = '💵 Para una cotización personalizada, necesito algunos datos:<br><br>👉 <a href="#contacto" style="color:#ff0088;font-weight:600;">Completa el formulario aquí</a><br><br>O contáctanos directamente:<br>📱 WhatsApp: <a href="https://wa.me/51987654321" target="_blank" style="color:#25D366;font-weight:600;">+51 987 654 321</a><br>📧 Email: contacto@kontactoya.com<br><br>Respuesta en menos de 24 horas.';
      }
      else if (msg.includes('trabaj') || msg.includes('empleo') || msg.includes('postul') || msg.includes('vacante') || msg.includes('oportunidad')) {
        response = '👥 <strong>¡Únete a nuestro equipo!</strong><br><br>Estamos contratando para:<br>✓ Agentes de atención<br>✓ Televentas<br>✓ Backoffice<br>✓ QA<br><br>Beneficios:<br>• Trabajo remoto/híbrido<br>• Capacitación continua<br>• Plan de carrera<br>• Seguro complementario<br><br>👉 <a href="#trabaja" style="color:#ff0088;font-weight:600;">Ver posiciones abiertas</a>';
      }
      else if (msg.includes('kpi') || msg.includes('resultado') || msg.includes('métrica') || msg.includes('desempeño')) {
        response = '📊 <strong>Nuestros resultados hablan:</strong><br><br>✅ CSAT: 94%<br>✅ FCR: 90%<br>✅ 1.8M+ interacciones/mes<br>✅ 3 países de operación<br>✅ 12% tasa de conversión<br>✅ 320s AHT optimizado<br><br>👉 <a href="#kpis" style="color:#ff0088;font-weight:600;">Ver todos los KPIs</a>';
      }
      else if (msg.includes('testimonio') || msg.includes('opinión') || msg.includes('reseña') || msg.includes('experiencia')) {
        response = '⭐ Nuestros colaboradores y clientes nos respaldan:<br><br>"KONTACTOYA invierte en tu crecimiento de verdad" - María González, Supervisora<br><br>"Nuestro CSAT subió 20%" - Jorge Mendoza, Director CX<br><br>👉 <a href="#testimonios" style="color:#ff0088;font-weight:600;">Ver más testimonios</a>';
      }
      else if (msg.includes('ubica') || msg.includes('dirección') || msg.includes('dónde') || msg.includes('oficina') || msg.includes('donde')) {
        response = '📍 <strong>Oficina Principal:</strong><br><br>Av. Javier Prado Este 4200<br>San Isidro, Lima, Perú<br><br>📞 Tel: +51 987 654 321<br>📧 Email: contacto@kontactoya.com<br><br>👉 <a href="#contacto" style="color:#ff0088;font-weight:600;">Ver mapa interactivo</a>';
      }
      else if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas') || msg.includes('hi') || msg.includes('hey')) {
        response = '¡Hola! 👋 Soy el asistente de KONTACTOYA.<br><br>¿En qué puedo ayudarte hoy?<br><br>Puedo brindarte información sobre:<br>• Nuestros servicios<br>• Cotizaciones<br>• Oportunidades laborales<br>• Resultados y KPIs';
      }
      else if (msg.includes('gracias') || msg.includes('perfecto') || msg.includes('ok') || msg.includes('vale') || msg.includes('genial')) {
        response = '😊 ¡De nada! Estoy aquí para ayudarte.<br><br>Si necesitas hablar con un asesor humano:<br>📱 WhatsApp: <a href="https://wa.me/51987654321" target="_blank" style="color:#25D366;font-weight:600;">+51 987 654 321</a><br><br>¿Hay algo más en lo que pueda ayudarte?';
      }
      else if (msg.includes('whatsapp') || msg.includes('teléfono') || msg.includes('llamar') || msg.includes('telefono') || msg.includes('contacto')) {
        response = '📱 <strong>Contáctanos directamente:</strong><br><br>WhatsApp Business:<br><a href="https://wa.me/51987654321?text=Hola%20KONTACTOYA" target="_blank" style="color:#25D366;font-weight:700;font-size:1.1rem;">+51 987 654 321</a><br><br>Horario: 24/7<br>Respuesta inmediata';
      }
      else if (msg.includes('cliente') || msg.includes('empresa') || msg.includes('quiénes') || msg.includes('quienes') || msg.includes('aliado')) {
        response = '🏢 Trabajamos con empresas líderes en:<br><br>• Telecomunicaciones (Claro, Movistar, Vodafone)<br>• Sector Financiero<br>• Retail<br>• Salud<br>• eCommerce<br><br>👉 <a href="#clientes" style="color:#ff0088;font-weight:600;">Ver nuestros clientes</a>';
      }
      else if (msg.includes('país') || msg.includes('paises') || msg.includes('donde operan') || msg.includes('cobertura')) {
        response = '🌎 <strong>Operamos en 3 países:</strong><br><br>🇵🇪 Perú<br>🇪🇸 España<br>🇨🇱 Chile<br><br>Equipos locales capacitados y reportes consolidados en tiempo real.';
      }
      else if (msg.includes('horario') || msg.includes('hora') || msg.includes('cuando') || msg.includes('disponible')) {
        response = '🕐 <strong>Horarios de atención:</strong><br><br>✅ Soporte 24/7 para clientes<br>✅ WhatsApp: Inmediato<br>✅ Oficinas: Lun-Vie 8am-6pm<br><br>📱 Contáctanos ahora: <a href="https://wa.me/51987654321" target="_blank" style="color:#25D366;font-weight:600;">WhatsApp</a>';
      }
      else if (msg.includes('beneficio') || msg.includes('ventaja') || msg.includes('por qué') || msg.includes('porque')) {
        response = '⭐ <strong>¿Por qué elegirnos?</strong><br><br>✅ 94% CSAT promedio<br>✅ Equipos certificados<br>✅ Tecnología de punta<br>✅ Reportes en tiempo real<br>✅ Presencia en 3 países<br>✅ 1.8M+ interacciones/mes<br><br>Calidad, experiencia y resultados medibles.';
      }
      else if (msg.includes('industria') || msg.includes('sector') || msg.includes('rubro')) {
        response = '🏭 <strong>Sectores que atendemos:</strong><br><br>📡 Telecomunicaciones<br>💳 Finanzas y Banca<br>🛍️ Retail y eCommerce<br>🏥 Salud<br>🚚 Logística<br><br>Soluciones personalizadas para cada industria.';
      }
      else if (msg.includes('tecnología') || msg.includes('herramienta') || msg.includes('sistema') || msg.includes('software')) {
        response = '💻 <strong>Tecnología que usamos:</strong><br><br>✅ CRM integrado<br>✅ Omnicanalidad (teléfono, chat, WhatsApp, email)<br>✅ Dashboards en tiempo real<br>✅ IA para análisis de sentimiento<br>✅ Grabación y QA automático<br><br>Infraestructura robusta y escalable.';
      }
      else if (msg.includes('equipo') || msg.includes('agente') || msg.includes('personal') || msg.includes('cuántos')) {
        response = '👨‍💼 <strong>Nuestro equipo:</strong><br><br>✅ +500 agentes capacitados<br>✅ Supervisores certificados<br>✅ QA especializado<br>✅ Coaching continuo<br>✅ Rotación baja<br><br>Talento humano es nuestra ventaja competitiva.';
      }
      else if (msg.includes('capacita') || msg.includes('entrenamien') || msg.includes('formación') || msg.includes('training')) {
        response = '📚 <strong>Capacitación y desarrollo:</strong><br><br>✅ Onboarding 2 semanas<br>✅ Certificaciones internacionales<br>✅ Coaching semanal<br>✅ Evaluaciones continuas<br>✅ Plan de carrera claro<br><br>Invertimos en el crecimiento de nuestro equipo.';
      }
      else if (msg.includes('idioma') || msg.includes('lengua') || msg.includes('bilingüe')) {
        response = '🗣️ <strong>Idiomas disponibles:</strong><br><br>✅ Español (nativo)<br>✅ Inglés (bilingüe)<br>✅ Portugués (Brasil)<br><br>Atención multiidioma según tu necesidad.';
      }
      else if (msg.includes('sla') || msg.includes('garantía') || msg.includes('compromiso')) {
        response = '📋 <strong>SLAs garantizados:</strong><br><br>✅ Tiempo de respuesta: <30s<br>✅ CSAT mínimo: 90%<br>✅ FCR: 85%+<br>✅ Abandono: <5%<br>✅ Uptime: 99.9%<br><br>Compromisos claros y medibles.';
      }
      else if (msg.includes('empezar') || msg.includes('comenzar') || msg.includes('iniciar') || msg.includes('arrancar')) {
        response = '🚀 <strong>¡Empecemos ya!</strong><br><br>1️⃣ Completa el formulario: <a href="#contacto" style="color:#ff0088;font-weight:600;">Aquí</a><br>2️⃣ Agenda una llamada<br>3️⃣ Recibe propuesta en 24h<br>4️⃣ ¡Go live en 2 semanas!<br><br>📱 O escríbenos: <a href="https://wa.me/51987654321" target="_blank" style="color:#25D366;font-weight:600;">WhatsApp</a>';
      }
      else if (msg.includes('covid') || msg.includes('pandemia') || msg.includes('remoto') || msg.includes('distancia')) {
        response = '🏡 <strong>Trabajo remoto/híbrido:</strong><br><br>✅ Infraestructura cloud<br>✅ Equipos proporcionados<br>✅ Conexión segura (VPN)<br>✅ Monitoreo en tiempo real<br>✅ Flexibilidad horaria<br><br>Operamos 100% desde 2020.';
      }
      else if (msg.includes('seguridad') || msg.includes('privacidad') || msg.includes('datos') || msg.includes('protección')) {
        response = '🔒 <strong>Seguridad y privacidad:</strong><br><br>✅ ISO 27001 certificado<br>✅ Encriptación end-to-end<br>✅ Cumplimiento GDPR/LGPD<br>✅ Auditorías periódicas<br>✅ Accesos controlados<br><br>Tus datos están seguros con nosotros.';
      }
      else {
        response = '🤔 Interesante pregunta. Para darte la mejor respuesta, te recomiendo:<br><br>1️⃣ Revisar nuestros <a href="#servicios" style="color:#ff0088;font-weight:600;">servicios</a><br>2️⃣ Ver nuestros <a href="#kpis" style="color:#ff0088;font-weight:600;">resultados</a><br>3️⃣ Contactar a un asesor: <a href="https://wa.me/51987654321" target="_blank" style="color:#25D366;font-weight:600;">WhatsApp</a><br><br>¿Puedo ayudarte con algo específico sobre:<br>• Servicios<br>• Precios<br>• Empleo<br>• Resultados?';
      }

      addBotMessage(response);
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  /* ========== SCROLL TO TOP BUTTON ========== */
  function initScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scrollTop';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

/* ========== INIT ALL ========== */
initFloatingActions(); 
initScrollProgress();
initNewsletter();
initPricing();
initLiveStats();
initFAQ();
initROICalculator();
initCaseStudies();
initCareersReel();
initCareersForm();
initContactForm();
initChatbot();
initScrollToTop();

console.log('✅ KONTACTOYA v3.5 - Sistema completo con nuevas secciones');
});

/* ========== PARALLAX EFFECT ========== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.hero-bg-image, .kpi-visual, .service-media');
  
  if (PREFERS_REDUCED || !parallaxElements.length) return;

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = el.classList.contains('hero-bg-image') ? 0.5 : 0.3;
        const yPos = -(scrolled - elementTop) * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
}

initParallax();

