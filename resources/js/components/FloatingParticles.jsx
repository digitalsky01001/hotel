
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const FloatingParticles = ({ count = 50 }) => {
    const points = useRef();

    // Generate random positions
    const particlesPosition = () => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return positions;
    };

    const [positions] = useState(() => particlesPosition());

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y += 0.001;
            points.current.rotation.x += 0.001;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#D4AF37" // Gold color
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
            />
        </points>
    );
};

export default FloatingParticles;
