/*!
 * Website Pet (vanilla JS)
 * - States: "walking", "standing", "hanging", "falling"
 * - Floor is bottom of the viewport
 * - Random walk with pauses; draggable; throws cause falling until floor
 *
 * Usage:
 *   initWebsitePet({
 *     gifs: {
 *       walking: 'walk.gif',
 *       standing: 'stand.gif',
 *       falling: 'fall.gif',
 *       hanging: 'hang.gif'
 *     },
 *     width: 96,   // px (optional but recommended)
 *     height: 96,  // px
 *     scale: 1,    // visual scale multiplier
 *   });
 */

(function(){
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const rand = (min, max) => Math.random() * (max - min) + min;
  const choice = arr => arr[(Math.random()*arr.length)|0];

  const DEFAULTS = {
    gifs: {
      walking: '',
      standing: '',
      falling: '',
      hanging: ''
    },
    width: 96,
    height: 96,
    scale: 1,
    walkSpeed: 60,        // px/s
    gravity: 1800,        // px/s^2
    maxFallSpeed: 2200,   // px/s cap
    bounceEdgePadding: 4, // px from screen edge before flip
    standMin: 0.8,        // s
    standMax: 2.2,        // s
    walkBurstMin: 1.2,    // s
    walkBurstMax: 3.5,    // s
    standChanceAfterFall: 0.45,  // probability to stand after landing
    zIndex: 99999,
    draggableCursor: 'grab',
    draggingCursor: 'grabbing',
  };

  function initWebsitePet(opts = {}) {
    const C = {...DEFAULTS, ...opts, gifs: {...DEFAULTS.gifs, ...(opts.gifs||{})}};

    // Create container
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '0px';
    el.style.top  = '0px';
    el.style.width = (C.width * C.scale) + 'px';
    el.style.height = (C.height * C.scale) + 'px';
    el.style.pointerEvents = 'auto';
    el.style.userSelect = 'none';
    el.style.touchAction = 'none';
    el.style.zIndex = String(C.zIndex);
    el.style.willChange = 'transform';
    el.style.cursor = C.draggableCursor;

    // Inner <img> for GIF swapping
    const img = document.createElement('img');
    img.alt = 'pet';
    img.draggable = false;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.style.imageRendering = 'auto';
    img.style.transformOrigin = '50% 50%';
    el.appendChild(img);

  

    document.body.appendChild(el);

    // World/state
    let state = 'standing'; // walking | standing | hanging | falling
    let dir = Math.random() < 0.5 ? -1 : 1; // -1 left, 1 right
    let vx = 0, vy = 0;
    let px = (window.innerWidth - el.offsetWidth) * Math.random();
    let py = 0; // we place at floor in layout()
    let face = dir;
    let raf = 0;

    // Timers for random walk/stand cycles
    let behaviorTimer = 0;  // time left on current behavior segment (sec)
    let nextBehavior = null; // function to start next behavior

    // Dragging
    let dragging = false;
    let grabOffsetX = 0, grabOffsetY = 0;
    let lastPosSamples = []; // recent positions for throw velocity
    const THROW_SAMPLE_MS = 120; // ms window

    function floorY() {
      return window.innerHeight - el.offsetHeight;
    }

    function setImage(anim) {
      const src = C.gifs[anim] || '';
      if (img.dataset.srcSet !== src) {
        img.src = src;
        img.dataset.srcSet = src;
      }
    }

    function layout() {
      const floor = floorY();
      py = clamp(py, 0, floor);
      // Flip if facing left
      const flip = face > 0 ? ' scaleX(-1)' : '';
      el.style.transform = `translate(${px|0}px, ${(py|0)}px)${flip}`;
     
    }

    function setState(s) {
      state = s;
      switch(s) {
        case 'walking':
          setImage('walking');
          // Choose direction occasionally if at edges
          if (px < C.bounceEdgePadding) dir = 1;
          else if (px > window.innerWidth - el.offsetWidth - C.bounceEdgePadding) dir = -1;
          face = dir;
          vx = C.walkSpeed * dir;
          vy = 0;
          behaviorTimer = rand(C.walkBurstMin, C.walkBurstMax);
          nextBehavior = () => setState('standing');
          el.style.cursor = C.draggableCursor;
          break;
        case 'standing':
          setImage('standing');
          vx = 0; vy = 0;
          behaviorTimer = rand(C.standMin, C.standMax);
          nextBehavior = () => {
            dir = Math.random() < 0.5 ? -1 : 1;
            setState('walking');
          };
          el.style.cursor = C.draggableCursor;
          break;
        case 'hanging':
          setImage('hanging');
          vx = 0; vy = 0;
          behaviorTimer = 0; nextBehavior = null;
          el.style.cursor = C.draggingCursor;
          break;
        case 'falling':
          setImage('falling');
          // vx keeps whatever it had pre-drop (we inject from throw)
          // vy keeps whatever it had pre-drop (e.g., from throw), else starts at 0
          behaviorTimer = 0; nextBehavior = null;
          el.style.cursor = C.draggableCursor;
          break;
      }
    }

    // Initialize at floor, then pick starting behavior
    py = floorY();
    setState(Math.random() < 0.5 ? 'walking' : 'standing');
    layout();

    // Event helpers
    function onPointerDown(e) {
      e.preventDefault();
      const pt = getPoint(e);
      if (!pointHitsPet(pt.x, pt.y)) return;

      dragging = true;
      el.setPointerCapture?.(e.pointerId || 1);
      grabOffsetX = pt.x - px;
      grabOffsetY = pt.y - py;
      lastPosSamples.length = 0;
      pushSample(pt.x, pt.y, performance.now());
      setState('hanging');
    }

    function onPointerMove(e) {
      const pt = getPoint(e);
      if (dragging) {
        px = clamp(pt.x - grabOffsetX, 0, window.innerWidth - el.offsetWidth);
        py = clamp(pt.y - grabOffsetY, 0, floorY());
        // While hanging, face toward movement
        const last = lastPosSamples[lastPosSamples.length - 1];
        if (last && Math.abs(pt.x - last.x) > 0.5) {
          face = (pt.x - last.x) >= 0 ? 1 : -1;
        }
        pushSample(pt.x, pt.y, performance.now());
        layout();
      } else {
        // If not dragging, ignore
      }
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture?.(e.pointerId || 1);
      el.style.cursor = C.draggableCursor;

      // Compute "throw" velocity from recent samples
      const now = performance.now();
      pruneSamples(now);
      if (lastPosSamples.length >= 2) {
        const a = lastPosSamples[0];
        const b = lastPosSamples[lastPosSamples.length - 1];
        const dt = (b.t - a.t) / 1000;
        const sx = b.x - a.x;
        const sy = b.y - a.y;
        vx = (dt > 0 ? sx / dt : 0);
        vy = (dt > 0 ? sy / dt : 0);
      } else {
        vx = 0; vy = 0;
      }

      // Cap velocities a bit
      const MAX_THROW = 1400;
      vx = clamp(vx, -MAX_THROW, MAX_THROW);
      vy = clamp(vy, -MAX_THROW, MAX_THROW);

      // Enter falling if above floor or has downward velocity; otherwise resume loop
      if (py < floorY() - 1 || vy > 50) {
        setState('falling');
      } else {
        // Landed immediately: resume loop
        Math.random() < 0.5 ? setState('walking') : setState('standing');
      }
    }

    function getPoint(e) {
      if (e.touches && e.touches[0]) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else {
        return { x: e.clientX, y: e.clientY };
      }
    }

    function pointHitsPet(x, y) {
      const rect = el.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }

    function pushSample(x, y, t) {
      lastPosSamples.push({x, y, t});
      pruneSamples(t);
    }

    function pruneSamples(now) {
      const cutoff = now - THROW_SAMPLE_MS;
      while (lastPosSamples.length && lastPosSamples[0].t < cutoff) {
        lastPosSamples.shift();
      }
    }

    // Animation loop
    let prev = performance.now();
    function tick(now) {
      const dt = Math.min(0.033, (now - prev) / 1000); // clamp 30fps dt spike
      prev = now;

      // If window resized heavily, clamp position
      if (!dragging) {
        px = clamp(px, 0, window.innerWidth - el.offsetWidth);
        py = clamp(py, 0, floorY());
      }

      switch(state) {
        case 'walking': {
          px += vx * dt;
          // Edge bounce
          if (px <= C.bounceEdgePadding) {
            dir = 1; face = 1; vx = Math.abs(vx);
          } else if (px >= window.innerWidth - el.offsetWidth - C.bounceEdgePadding) {
            dir = -1; face = -1; vx = -Math.abs(vx);
          }

          // Countdown behavior timer → stand
          behaviorTimer -= dt;
          if (behaviorTimer <= 0) {
            nextBehavior && nextBehavior();
          }
          // Always stick to floor
          py = floorY();
          break;
        }
        case 'standing': {
          // Countdown behavior timer → walk
          behaviorTimer -= dt;
          if (behaviorTimer <= 0) {
            nextBehavior && nextBehavior();
          }
          py = floorY();
          break;
        }
        case 'hanging': {
          // Position is controlled by pointer events; nothing to integrate here
          break;
        }
        case 'falling': {
          // Apply gravity
          vy = clamp(vy + C.gravity * dt, -Infinity, C.maxFallSpeed);
          px += vx * dt;
          py += vy * dt;

          // Horizontal screen bounds
          if (px <= 0) { px = 0; vx = Math.abs(vx); face = 1; }
          if (px >= window.innerWidth - el.offsetWidth) { px = window.innerWidth - el.offsetWidth; vx = -Math.abs(vx); face = -1; }

          // Land on floor
          const floor = floorY();
          if (py >= floor) {
            py = floor;
            vy = 0;

            // After landing, either stand a bit or start walking
            if (Math.random() < C.standChanceAfterFall) setState('standing');
            else {
              dir = (Math.random() < 0.5 ? -1 : 1);
              face = dir;
              setState('walking');
            }
          }
          break;
        }
      }

      layout();
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    // Pointer listeners (mouse + touch + pen via Pointer Events where supported)
    const supportsPointer = 'onpointerdown' in window;
    if (supportsPointer) {
      el.addEventListener('pointerdown', onPointerDown, {passive:false});
      window.addEventListener('pointermove', onPointerMove, {passive:false});
      window.addEventListener('pointerup', onPointerUp, {passive:false});
      window.addEventListener('pointercancel', onPointerUp, {passive:false});
      window.addEventListener('pointerleave', e => { if (dragging) onPointerUp(e); }, {passive:true});
    } else {
      // Fallback to mouse/touch
      el.addEventListener('mousedown', onPointerDown, {passive:false});
      window.addEventListener('mousemove', onPointerMove, {passive:false});
      window.addEventListener('mouseup', onPointerUp, {passive:false});
      el.addEventListener('touchstart', onPointerDown, {passive:false});
      window.addEventListener('touchmove', onPointerMove, {passive:false});
      window.addEventListener('touchend', onPointerUp, {passive:false});
      window.addEventListener('touchcancel', onPointerUp, {passive:false});
    }

    // Resize handling
    function onResize() {
      // Keep pet on the floor if needed
      py = clamp(py, 0, floorY());
      px = clamp(px, 0, window.innerWidth - el.offsetWidth);
      layout();
    }
    window.addEventListener('resize', onResize);

    // Public API (return object so you can destroy or change animations)
    const api = {
      setGIFs(gifs) {
        C.gifs = {...C.gifs, ...gifs};
        // Refresh image for current state
        switch(state) {
          case 'walking': setImage('walking'); break;
          case 'standing': setImage('standing'); break;
          case 'hanging': setImage('hanging'); break;
          case 'falling': setImage('falling'); break;
        }
      },
      setScale(scale) {
        C.scale = scale;
        el.style.width = (C.width * C.scale) + 'px';
        el.style.height = (C.height * C.scale) + 'px';
        onResize();
      },
      destroy() {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        if (supportsPointer) {
          el.removeEventListener('pointerdown', onPointerDown);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointercancel', onPointerUp);
          window.removeEventListener('pointerleave', onPointerUp);
        } else {
          el.removeEventListener('mousedown', onPointerDown);
          window.removeEventListener('mousemove', onPointerMove);
          window.removeEventListener('mouseup', onPointerUp);
          el.removeEventListener('touchstart', onPointerDown);
          window.removeEventListener('touchmove', onPointerMove);
          window.removeEventListener('touchend', onPointerUp);
          window.removeEventListener('touchcancel', onPointerUp);
        }
        el.remove();
      },
      // For fun: programmatically toss the pet
      toss(vx_px_s = 600, vy_px_s = -900) {
        vx = vx_px_s;
        vy = vy_px_s;
        setState('falling');
      },
      // Snap pet to bottom center
      center() {
        px = (window.innerWidth - el.offsetWidth)/2;
        py = floorY();
        layout();
      }
    };

    // Expose for debugging: window.websitePet
    if (!window.websitePet) window.websitePet = api;
    return api;
  }

  // Auto-init if <script> tag includes data attributes
  // Example:
  // <script src="pet.js"
  //   data-walking="walk.gif"
  //   data-standing="stand.gif"
  //   data-falling="fall.gif"
  //   data-hanging="hang.gif"
  //   data-width="96"
  //   data-height="96"
  //   data-scale="1"></script>
  document.currentScript && autoInitFromDataset(document.currentScript);

  function autoInitFromDataset(scriptTag) {
    const ds = scriptTag.dataset || {};
    if (!ds.walking && !ds.standing && !ds.falling && !ds.hanging) return; // only auto-init if provided
    initWebsitePet({
      gifs: {
        walking: ds.walking || '',
        standing: ds.standing || '',
        falling: ds.falling || '',
        hanging: ds.hanging || ''
      },
      width: +(ds.width || DEFAULTS.width),
      height: +(ds.height || DEFAULTS.height),
      scale: +(ds.scale || DEFAULTS.scale)
    });
  }

  // Export to global
  window.initWebsitePet = initWebsitePet;
})();
