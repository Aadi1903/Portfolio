import React, { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
  const mountRef = useRef(null);
  const frameRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Import Three.js dynamically to reduce initial bundle
    Promise.all([
      import('three'),
      import('three/examples/jsm/controls/OrbitControls.js')
    ]).then(([THREE, { OrbitControls }]) => {
      
      // === SCENE ===
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x030712);

      // === CAMERA ===
      const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      camera.position.set(0, 0, 18);

      // === RENDERER ===
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      
      // Mobile optimization: allow touch to pass through
      renderer.domElement.style.touchAction = 'none'; // changed from pan-y to none to let Three.js handle it if needed, but CSS handles document scroll
      mount.appendChild(renderer.domElement);

      // === LIGHTS ===
      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      const point = new THREE.PointLight(0x4fa6ff, 2, 50);
      point.position.set(5, 5, 5);
      scene.add(ambient, point);

      // === OPTIMIZED PARTICLES ===
      // Reduce star count on mobile for performance
      const isMobile = window.innerWidth <= 768;
      const starCount = isMobile ? 300 : 800; // Reduced from 800
      const starPositions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 60;
      }

      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

      const starMat = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x8ab6ff,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // === Floating Glowing Orbs ===
      const orbGeo = new THREE.SphereGeometry(1.2, 16, 16);

      const createOrb = (x, y, z) => {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x4fa6ff,
          emissive: 0x235dff,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.4,
        });
        const orb = new THREE.Mesh(orbGeo, mat);
        orb.position.set(x, y, z);
        scene.add(orb);
        return orb;
      };

      const orbs = [
        createOrb(-5, 3, -5),
        createOrb(4, -2, -7),
        createOrb(0, 5, -4),
      ];

      // === OPTIMIZED MOUSE PARALLAX ===
      const mouse = { x: 0, y: 0 };
      let targetX = 0, targetY = 0;
      
      const handleMouseMove = (e) => {
        // Disable mouse parallax on mobile/touch to prevent weird movement
        if (window.innerWidth <= 768) return;
        
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // === OPTIMIZED ANIMATION LOOP ===
      const clock = new THREE.Clock();
      
      const animate = () => {
        const delta = clock.getDelta();
        
        // Smooth camera movement with lerp
        targetX += (mouse.x - targetX) * 0.02;
        targetY += (mouse.y - targetY) * 0.02;
        
        camera.position.x = targetX;
        camera.position.y = targetY;

        // Optimized rotations and animations
        stars.rotation.y += 0.0008 * delta * 60;

        const time = Date.now() * 0.001;
        orbs.forEach((orb, i) => {
          orb.position.y += Math.sin(time + i) * 0.01;
          orb.position.x += Math.cos(time + i) * 0.005;
        });

        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        frameRef.current = requestAnimationFrame(animate);
      };
      
      animate();

      // === OPTIMIZED RESIZE HANDLER ===
      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("mousemove", handleMouseMove);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
         }
        renderer.dispose();
      };
    });

  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-20"></div>;
};

export default ThreeDBackground;