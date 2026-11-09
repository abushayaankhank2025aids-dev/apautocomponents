"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

const viewpoints = [
  {
    title: "Turned-form concept",
    detail: "An abstract rotating form illustrates the general geometry associated with turning. It is not a company product or production specification.",
  },
  {
    title: "Machined features",
    detail: "Stepped surfaces and shoulders suggest features that may be discussed against a customer's drawing and requirements.",
  },
  {
    title: "Customer requirements",
    detail: "Actual component design, material, dimensions and manufacturing suitability are confirmed for each enquiry.",
  },
];

export function IndustrialScene() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<{ render: () => void; rotate: (direction: number) => void } | null>(null);
  const hasDragged = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const [webgl, setWebgl] = useState<"waiting" | "ready" | "fallback">("waiting");
  const [viewpoint, setViewpoint] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const host = stage.current;
    const targetCanvas = canvas.current;
    if (!host || !targetCanvas) return;

    let active = true;
    let inView = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let scene: import("three").Scene | undefined;
    let camera: import("three").PerspectiveCamera | undefined;
    let component: import("three").Group | undefined;
    let particleField: import("three").Points | undefined;
    let animationFrame = 0;
    let hasInitialized = false;
    let previousFrame = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let reducedMotion = false;
    let startX = 0;
    let startY = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let lazyObserver: IntersectionObserver | undefined;
    let detachMotionChange: (() => void) | undefined;

    const renderFrame = () => {
      if (!renderer || !scene || !camera) return;
      renderer.render(scene, camera);
    };

    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (!renderer || !component || !camera) return;
      const bounds = targetCanvas.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      pointerX = (x - 0.5) * 0.45;
      pointerY = (y - 0.5) * 0.3;

      if (event.buttons === 1) {
        component.rotation.y += (event.clientX - lastPointerX) * 0.009;
        component.rotation.x += (event.clientY - lastPointerY) * 0.006;
        component.rotation.x = Math.max(-0.9, Math.min(0.9, component.rotation.x));
        hasDragged.current = true;
      }

      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      renderFrame();
    };

    const onPointerDown = (event: globalThis.PointerEvent) => {
      pointerStart.current = { x: event.clientX, y: event.clientY };
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      hasDragged.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (!camera || !renderer) return;
      event.preventDefault();
      camera.position.z = Math.max(5.2, Math.min(10, camera.position.z + Math.sign(event.deltaY) * 0.45));
      renderFrame();
    };

    const setup = async () => {
      try {
        const THREE = await import("three");
        if (!active) return;

        renderer = new THREE.WebGLRenderer({
          canvas: targetCanvas,
          alpha: true,
          antialias: window.innerWidth >= 640,
          powerPreference: "low-power",
        });
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMotion = media.matches;
        const resize = () => {
          if (!renderer || !camera) return;
          const width = Math.max(1, host.clientWidth);
          const height = Math.max(1, host.clientHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 640 ? 1 : 1.5));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderFrame();
        };
        renderer.setClearColor(0x000000, 0);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
        camera.position.set(0, 2.8, 8.5);
        camera.lookAt(0, 0, 0);

        scene.add(new THREE.AmbientLight(0xb9c4d0, 1.35));
        const keyLight = new THREE.DirectionalLight(0xf4f3ef, 3.2);
        keyLight.position.set(-4, 5, 6);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0xf28c28, 34, 15, 2);
        rimLight.position.set(3.2, 1, -2);
        scene.add(rimLight);
        const fillLight = new THREE.PointLight(0x93b6d2, 18, 14, 2);
        fillLight.position.set(-4, -2, 1);
        scene.add(fillLight);

        component = new THREE.Group();
        const profile = [
          new THREE.Vector2(0, -2.05), new THREE.Vector2(0.56, -2.05),
          new THREE.Vector2(0.58, -1.84), new THREE.Vector2(0.58, -1.18),
          new THREE.Vector2(0.83, -1.1), new THREE.Vector2(0.83, -0.62),
          new THREE.Vector2(0.56, -0.54), new THREE.Vector2(0.56, 0.54),
          new THREE.Vector2(0.93, 0.64), new THREE.Vector2(0.93, 1.19),
          new THREE.Vector2(0.63, 1.28), new THREE.Vector2(0.63, 1.9),
          new THREE.Vector2(0.48, 2.05), new THREE.Vector2(0, 2.05),
        ];
        const bodyGeometry = new THREE.LatheGeometry(profile, 80);
        const metal = new THREE.MeshPhysicalMaterial({
          color: 0xb9c1c7,
          metalness: 0.88,
          roughness: 0.24,
          clearcoat: 0.85,
          clearcoatRoughness: 0.2,
        });
        const body = new THREE.Mesh(bodyGeometry, metal);
        component.add(body);

        const grooveMaterial = new THREE.MeshStandardMaterial({
          color: 0x343b40,
          metalness: 0.9,
          roughness: 0.32,
        });
        [-1.77, -0.58, 0.61, 1.25].forEach((y, index) => {
          const radius = index === 1 || index === 3 ? 0.85 : 0.6;
          const groove = new THREE.Mesh(
            new THREE.TorusGeometry(radius, 0.035, 8, 80),
            grooveMaterial,
          );
          groove.rotation.x = Math.PI / 2;
          groove.position.y = y;
          component?.add(groove);
        });

        const accent = new THREE.Mesh(
          new THREE.TorusGeometry(0.94, 0.018, 6, 96),
          new THREE.MeshBasicMaterial({ color: 0xf28c28 }),
        );
        accent.rotation.x = Math.PI / 2;
        accent.position.y = 0.68;
        component.add(accent);
        scene.add(component);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(2.7, 0.008, 4, 128),
          new THREE.MeshBasicMaterial({ color: 0x89949c, transparent: true, opacity: 0.3 }),
        );
        ring.rotation.x = Math.PI / 2.4;
        scene.add(ring);

        const count = window.innerWidth < 640 ? 36 : 88;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
          positions[i * 3] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleField = new THREE.Points(
          particleGeometry,
          new THREE.PointsMaterial({ color: 0xc3cbd1, size: 0.022, transparent: true, opacity: 0.55 }),
        );
        scene.add(particleField);

        controlsRef.current = {
          render: renderFrame,
          rotate: (direction) => {
            if (component) component.rotation.y += direction * (Math.PI / 10);
            renderFrame();
          },
        };
        targetCanvas.addEventListener("pointermove", onPointerMove);
        targetCanvas.addEventListener("pointerdown", onPointerDown);
        targetCanvas.addEventListener("wheel", onWheel, { passive: false });
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();
        setWebgl("ready");

        const animate = (time: number) => {
          animationFrame = 0;
          if (!renderer || !scene || !camera || !component) return;
          if (!reducedMotion && time - previousFrame >= 1000 / 30) {
            const delta = Math.min((time - previousFrame) / 1000, 0.05);
            previousFrame = time;
            component.rotation.y += delta * 0.16;
            component.rotation.y += (pointerX * 0.12 - component.rotation.y * 0.02) * delta;
            component.rotation.x += (pointerY - component.rotation.x) * delta * 0.5;
            if (particleField) particleField.rotation.y += delta * 0.012;
            camera.position.x += (pointerX - camera.position.x) * delta * 0.4;
            camera.position.y += (2.8 - pointerY * 2 - camera.position.y) * delta * 0.4;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
          }
          if (inView) animationFrame = window.requestAnimationFrame(animate);
        };

        const observeVisibility = (entries: IntersectionObserverEntry[]) => {
          inView = entries[0]?.isIntersecting ?? false;
          if (inView && !animationFrame) {
            previousFrame = performance.now();
            if (reducedMotion) renderFrame();
            else animationFrame = window.requestAnimationFrame(animate);
          } else if (!inView && animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
          }
        };
        intersectionObserver = new IntersectionObserver(observeVisibility, { rootMargin: "160px" });
        intersectionObserver.observe(host);

        const onMotionChange = (event: MediaQueryListEvent) => {
          reducedMotion = event.matches;
          if (reducedMotion && animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
            renderFrame();
          } else if (!reducedMotion && inView && !animationFrame) {
            animationFrame = window.requestAnimationFrame(animate);
          }
        };
        media.addEventListener("change", onMotionChange);
        detachMotionChange = () => media.removeEventListener("change", onMotionChange);
      } catch {
        if (active) {
          renderer?.dispose();
          setWebgl("fallback");
        }
      }
    };

    if ("IntersectionObserver" in window) {
      lazyObserver = new IntersectionObserver((entries) => {
        if (!hasInitialized && entries[0]?.isIntersecting) {
          hasInitialized = true;
          lazyObserver?.disconnect();
          void setup();
        }
      }, { rootMargin: "200px" });
      lazyObserver.observe(host);
    } else {
      hasInitialized = true;
      void setup();
    }

    return () => {
      active = false;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      lazyObserver?.disconnect();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      detachMotionChange?.();
      targetCanvas.removeEventListener("pointermove", onPointerMove);
      targetCanvas.removeEventListener("pointerdown", onPointerDown);
      targetCanvas.removeEventListener("wheel", onWheel);
      scene?.traverse((object) => {
        const mesh = object as import("three").Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
        else mesh.material?.dispose();
      });
      renderer?.dispose();
      controlsRef.current = null;
    };
  }, []);

  function changeZoom(direction: number) {
    const element = canvas.current;
    if (!element || webgl !== "ready") return;
    element.dispatchEvent(new WheelEvent("wheel", { deltaY: -direction * 100, cancelable: true }));
  }

  function rotate(direction: number) {
    controlsRef.current?.rotate(direction);
    if (stage.current && webgl !== "ready") {
      const current = Number(stage.current.dataset.rotate ?? 0) + direction * 12;
      stage.current.dataset.rotate = String(current);
      stage.current.style.setProperty("--fallback-rotation", `${current}deg`);
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    setDragging(false);
    if (!hasDragged.current
      && Math.abs(event.clientX - pointerStart.current.x) < 8
      && Math.abs(event.clientY - pointerStart.current.y) < 8) {
      setViewpoint((current) => (current + 1) % viewpoints.length);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    hasDragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function selectView(index: number) {
    setViewpoint(index);
    if (stage.current) stage.current.dataset.view = String(index);
  }

  return (
    <figure className="metal-showcase">
      <div
        ref={stage}
        className={`metal-showcase__stage${dragging ? " is-dragging" : ""}`}
        data-webgl={webgl}
        data-view="0"
        aria-label="Interactive conceptual machined component visualization"
      >
        <canvas
          ref={canvas}
          className="industrial-canvas"
          aria-label="Drag to rotate the conceptual metallic form. Use the controls to rotate or zoom."
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragging(false)}
        />
        <svg
          className="metal-showcase__object"
          viewBox="0 0 640 360"
          role="img"
          aria-labelledby="metal-title metal-description"
        >
          <title id="metal-title">Abstract machined form</title>
          <desc id="metal-description">
            An original illustrative metallic form with turned shoulders and machined rings.
          </desc>
          <defs>
            <linearGradient id="metal-body" x1="0" x2="1" y1="0.1" y2="0.9">
              <stop offset="0" stopColor="#f4f4f1" /><stop offset=".13" stopColor="#69727c" />
              <stop offset=".25" stopColor="#e4e6e5" /><stop offset=".47" stopColor="#555e68" />
              <stop offset=".64" stopColor="#cbd0d1" /><stop offset=".81" stopColor="#545e66" />
              <stop offset="1" stopColor="#d7d9d7" />
            </linearGradient>
            <linearGradient id="metal-face" x1="0" x2="1">
              <stop offset="0" stopColor="#3b434b" /><stop offset=".5" stopColor="#dfe1df" />
              <stop offset="1" stopColor="#59626a" />
            </linearGradient>
            <radialGradient id="metal-glow">
              <stop stopColor="#f28c28" stopOpacity=".4" /><stop offset="1" stopColor="#f28c28" stopOpacity="0" />
            </radialGradient>
            <filter id="metal-shadow" x="-.3" y="-.7" width="1.6" height="2.4"><feGaussianBlur stdDeviation="13" /></filter>
          </defs>
          <ellipse cx="324" cy="271" rx="194" ry="27" fill="#000" opacity=".8" filter="url(#metal-shadow)" />
          <ellipse cx="325" cy="263" rx="210" ry="42" fill="url(#metal-glow)" />
          <g transform="translate(48 22) rotate(-8 274 154)">
            <path d="M75 132 122 108 188 108 215 83 293 83 313 103 405 103 425 119 480 119 503 139 480 178 425 178 405 194 313 194 293 214 215 214 188 189 122 189 75 165Z" fill="url(#metal-body)" stroke="#f4f4f1" strokeOpacity=".56" strokeWidth="2" />
            <path d="M75 132 122 108 122 189 75 165Z" fill="url(#metal-face)" />
            <path d="M188 108 215 83 215 214 188 189Z" fill="#353c43" />
            <path d="M215 83 228 78 228 219 215 214Z" fill="#f3f1ea" opacity=".72" />
            <path d="M293 83 313 103 313 194 293 214Z" fill="#333b43" />
            <path d="M313 103 327 100 327 197 313 194Z" fill="#f1f0eb" opacity=".64" />
            <path d="M405 103 425 119 425 178 405 194Z" fill="#343c43" />
            <path d="M425 119 439 116 439 181 425 178Z" fill="#f5f3ed" opacity=".68" />
            <path d="M122 108 188 108 188 189 122 189Z" fill="none" stroke="#fff" strokeOpacity=".36" strokeWidth="2" />
            <path d="M327 100 405 103 405 194 327 197Z" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="2" />
            <path d="M90 135 118 121M90 142 118 128M90 149 118 135M90 156 118 142" stroke="#fff" strokeOpacity=".45" strokeWidth="2" />
          </g>
        </svg>
        <span className="metal-showcase__orbit metal-showcase__orbit--one" aria-hidden="true" />
        <span className="metal-showcase__orbit metal-showcase__orbit--two" aria-hidden="true" />
        <span className="metal-showcase__index" aria-hidden="true">01 / CONCEPT</span>
        <div className="industrial-controls" aria-label="Concept viewer controls">
          <button type="button" onClick={() => rotate(-1)} aria-label="Rotate component left">↶</button>
          <button type="button" onClick={() => rotate(1)} aria-label="Rotate component right">↷</button>
          <button type="button" onClick={() => changeZoom(-1)} aria-label="Zoom out">−</button>
          <button type="button" onClick={() => changeZoom(1)} aria-label="Zoom in">+</button>
        </div>
        <div className="industrial-hotspots" role="group" aria-label="Explore conceptual details">
          {viewpoints.map((point, index) => (
            <button
              key={point.title}
              type="button"
              className={viewpoint === index ? "is-selected" : ""}
              aria-pressed={viewpoint === index}
              onClick={() => selectView(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{point.title}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="metal-showcase__caption">
        <span className="metal-showcase__caption-title">{viewpoints[viewpoint].title}</span>
        <span>{viewpoints[viewpoint].detail}</span>
        <span className="metal-showcase__disclaimer">Conceptual visualization — not an A.P. Auto Components product.</span>
        {webgl === "fallback" && <span role="status">Interactive rendering is unavailable in this browser; the static illustration remains available.</span>}
      </figcaption>
    </figure>
  );
}
