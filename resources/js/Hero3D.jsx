import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows, Sparkles } from '@react-three/drei';

function GoldCrystal({ position, rotationSpeed = 0.5, scale = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * rotationSpeed * 0.5;
        meshRef.current.rotation.y = time * rotationSpeed;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#D4AF37"
                    roughness={0.1}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    reflectivity={1}
                    envMapIntensity={2}
                />
            </mesh>
        </Float>
    );
}

function GlassShape({ position, rotationSpeed = 0.2, scale = 1.5 }) {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = -time * rotationSpeed;
        meshRef.current.rotation.z = time * rotationSpeed * 0.5;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0}
                    transmission={0.99} // Glass effect
                    thickness={1}
                    ior={1.5}
                    chromaticAberration={0.04}
                    clearcoat={1}
                    attenuationColor="#ffffff"
                    attenuationDistance={0.5}
                />
            </mesh>
        </Float>
    );
}

const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Brighter, Studio Lighting for Light Theme */}
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, 0, -5]} intensity={1} color="#FFE4B5" /> {/* Warm light */}

                <Sparkles count={40} scale={12} size={6} speed={0.4} opacity={0.6} color="#B8860B" />

                <group position={[0, -0.5, 0]}>
                    <GlassShape position={[0, 0.5, 0]} scale={1.2} />
                    <GoldCrystal position={[-3.5, 1, -2]} scale={0.6} rotationSpeed={0.4} />
                    <GoldCrystal position={[3.5, -1, -2]} scale={0.5} rotationSpeed={0.5} />
                </group>

                {/* Bright Environment */}
                <Environment preset="apartment" blur={0.8} background={false} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
