"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const ParticleImage = ({ imageSrc }) => {
  const pointsRef = useRef();
  const [positions, setPositions] = useState([]);
  const [originalPositions, setOriginalPositions] = useState([]);
  const [colors, setColors] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = 0.5; // Adjust for particle density
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const pos = [];
      const originalPos = [];
      const col = [];

      const papayaColor = new THREE.Color("#FF8000");
      const yellowColor = new THREE.Color("#ffd700");
      const slateColor = new THREE.Color("#1d293d");

      // Sample every nth pixel for performance
      const step = 2;
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const i = (y * canvas.width + x) * 4;
          const alpha = data[i + 3];

          // Only create particles where there's visible content
          if (alpha > 128) {
            const px = (x - canvas.width / 2) * 0.02;
            const py = -(y - canvas.height / 2) * 0.02;
            const pz = 0;

            pos.push(px, py, pz);
            originalPos.push(px, py, pz);

            // Mix between slate and papaya based on pixel brightness
            const brightness =
              (data[i] + data[i + 1] + data[i + 2]) / (3 * 255);
            const color = brightness > 0.5 ? papayaColor : slateColor;
            col.push(color.r, color.g, color.b);
          }
        }
      }

      setPositions(new Float32Array(pos));
      setOriginalPositions(new Float32Array(originalPos));
      setColors(new Float32Array(col));
    };
  }, [imageSrc]);

  useFrame((state) => {
    if (!pointsRef.current || positions.length === 0) return;

    const posArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < posArray.length; i += 3) {
      const originalX = originalPositions[i];
      const originalY = originalPositions[i + 1];
      const originalZ = originalPositions[i + 2];

      if (isHovered) {
        // Calculate distance from mouse to particle
        const dx = mouseRef.current.x - originalX;
        const dy = mouseRef.current.y - originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Disperse particles near mouse
        const disperseRadius = 2;
        if (distance < disperseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (disperseRadius - distance) / disperseRadius;

          posArray[i] += Math.cos(angle) * force * 0.3;
          posArray[i + 1] += Math.sin(angle) * force * 0.3;
          posArray[i + 2] += (Math.random() - 0.5) * force * 0.5;
        } else {
          // Gentle return to original position
          posArray[i] += (originalX - posArray[i]) * 0.05;
          posArray[i + 1] += (originalY - posArray[i + 1]) * 0.05;
          posArray[i + 2] += (originalZ - posArray[i + 2]) * 0.05;
        }
      } else {
        // Smoothly return to original position
        posArray[i] += (originalX - posArray[i]) * 0.1;
        posArray[i + 1] += (originalY - posArray[i + 1]) * 0.1;
        posArray[i + 2] += (originalZ - posArray[i + 2]) * 0.1;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const handlePointerMove = (e) => {
    // Convert mouse coordinates to 3D space
    mouseRef.current.x = e.point.x;
    mouseRef.current.y = e.point.y;
  };

  if (positions.length === 0) return null;

  return (
    <points
      ref={pointsRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Particle = ({ logoSrc = "/assets/menu-logo.png" }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleImage imageSrc={logoSrc} />
      </Canvas>
    </div>
  );
};

export default Particle;
