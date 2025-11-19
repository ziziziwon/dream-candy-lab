import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = { 
  url: string; 
  scale?: number;
  darkMode?: boolean;
};

export default function JellyModel({ url, scale = 1, darkMode = false }: Props) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(url);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    
    const t = clock.getElapsedTime();
    
    // 회전 (다크모드일 때 더 느리게)
    ref.current.rotation.y = t * (darkMode ? 0.15 : 0.3);
    
    // 부유 (호흡하듯) - 다크모드일 때 더 천천히
    ref.current.position.y = Math.sin(t * (darkMode ? 0.5 : 0.8)) * (darkMode ? 0.15 : 0.08);
    
    // 다크모드일 때 살짝 좌우 흔들림
    if (darkMode) {
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.08;
      ref.current.rotation.z = Math.cos(t * 0.3) * 0.05;
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} />;
}

// Note: Preload removed to support dynamic PUBLIC_URL for basename routing

