// particles background canvas
(function(){
  const count = 40;
  const canvas = document.createElement('canvas');
  canvas.id = 'cparticles';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function init(){
    resize();
    particles = [];
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 1+Math.random()*3,
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3,
        alpha: 0.2+Math.random()*0.8
      });
    }
    requestAnimationFrame(loop);
  }

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function loop(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x<0) p.x = w;
      if(p.x>w) p.x = 0;
      if(p.y<0) p.y = h;
      if(p.y>h) p.y = 0;
      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0, 'rgba(46,163,255,'+p.alpha+')');
      g.addColorStop(1, 'rgba(46,163,255,0)');
      ctx.fillStyle = g;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  init();
})();
