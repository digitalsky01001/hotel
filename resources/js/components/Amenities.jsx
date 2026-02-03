import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Utensils, Droplet, Dumbbell, Car, ArrowRight } from 'lucide-react';

const ICON_PATHS = {
    dining: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",
    spa: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
    gym: "m6.5 6.5 11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 21l18-18", // Simplified dumbbell
    transfer: "M19 17H5c-1.1 0-2-.9-2-2V9a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2ZM5 17V7m14 10V7M7 19h10M6 5L2 9M22 9l-4-4"
};

// Fallback sphere if path fails or initially
const getSpherePoints = (count, radius) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
};

const getPointsFromPath = (pathData, count) => {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 128, 128);

        const p = new Path2D(pathData);

        ctx.save();
        // Center and scale
        ctx.translate(64, 64);
        ctx.scale(3.5, 3.5); // Tune scale
        ctx.translate(-12, -12); // Approximate center for 24x24 icon

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'black';
        ctx.stroke(p);
        ctx.restore();

        const imageData = ctx.getImageData(0, 0, 128, 128);
        const data = imageData.data;
        const validPixels = [];

        // Scan for dark pixels (the stroke)
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] < 200) { // Darker than nearly white
                const idx = i / 4;
                const x = (idx % 128);
                const y = Math.floor(idx / 128);
                validPixels.push({ x, y });
            }
        }

        const points = new Float32Array(count * 3);
        if (validPixels.length === 0) return getSpherePoints(count, 2.0); // Fallback

        for (let i = 0; i < count; i++) {
            const pixel = validPixels[Math.floor(Math.random() * validPixels.length)];
            const xNorm = (pixel.x / 128 - 0.5) * 5; // Scale to world units
            const yNorm = -(pixel.y / 128 - 0.5) * 5; // Flip Y

            points[i * 3] = xNorm + (Math.random() - 0.5) * 0.1; // Jitter
            points[i * 3 + 1] = yNorm + (Math.random() - 0.5) * 0.1;
            points[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Depth
        }
        return points;
    } catch (e) {
        console.error("Path parsing error", e);
        return getSpherePoints(count, 2.0);
    }
};

function MorphingParticles({ activeId }) {
    const count = 5000;
    const ref = useRef();

    // Pre-calculate shapes
    const shapes = useMemo(() => ({
        dining: getPointsFromPath(ICON_PATHS.dining, count),
        spa: getPointsFromPath(ICON_PATHS.spa, count),
        gym: getPointsFromPath(ICON_PATHS.gym, count),
        transfer: getPointsFromPath(ICON_PATHS.transfer, count),
        initial: getSpherePoints(count, 2.0)
    }), []);

    const [positions] = useState(() => new Float32Array(count * 3));

    // Initialize positions
    useEffect(() => {
        const initial = shapes.initial;
        for (let i = 0; i < count * 3; i++) positions[i] = initial[i];
    }, []);

    useFrame((state, delta) => {
        const target = shapes[activeId] || shapes.initial;
        const speed = 3 * delta;

        for (let i = 0; i < count * 3; i++) {
            positions[i] += (target[i] - positions[i]) * speed;
        }

        if (ref.current) {
            ref.current.geometry.attributes.position.needsUpdate = true;
            // Slight consistent rotation
            ref.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#1c1917"
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </points>
    );
}

const amenities = [
    {
        id: 'dining',
        icon: <Utensils />,
        title: 'Ресторан',
        desc: 'Гастрономия',
        color: '#D4AF37'
    },
    {
        id: 'spa',
        icon: <Droplet />,
        title: 'SPA',
        desc: 'Релаксация',
        color: '#38bdf8'
    },
    {
        id: 'gym',
        icon: <Dumbbell />,
        title: 'Фитнес',
        desc: 'Спорт',
        color: '#f43f5e'
    },
    {
        id: 'transfer',
        icon: <Car />,
        title: 'Трансфер',
        desc: 'Комфорт',
        color: '#10B981'
    }
];

const Amenities = () => {
    const [activeId, setActiveId] = useState('dining');

    return (
        <section className="py-16 bg-white relative">
            <div className="w-[70%] mx-auto min-h-[600px] flex flex-col lg:flex-row border border-stone-100 rounded-[3rem] shadow-xl bg-white overflow-hidden">

                {/* Visual Side (60%) */}
                <div className="w-full lg:w-[60%] h-[400px] lg:h-auto relative bg-stone-50">
                    <div className="absolute top-10 left-10 z-10 text-text-muted/40 text-xs tracking-[0.3em] font-bold uppercase">
                        Интерактивная Зона
                    </div>
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <color attach="background" args={['#fafaf9']} />
                        <MorphingParticles activeId={activeId} />
                    </Canvas>
                </div>

                {/* Content Side (40%) */}
                <div className="w-full lg:w-[40%] bg-white p-12 flex flex-col justify-center h-full border-l border-stone-100">
                    <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-6 block">Инфраструктура</span>
                    <h2 className="text-4xl lg:text-5xl font-heading font-medium text-text-main mb-10">
                        Всё для <br />
                        <span className="text-gold-500 font-serif italic">Отдыха</span>
                    </h2>

                    <div className="space-y-2">
                        {amenities.map((item) => (
                            <motion.div
                                key={item.id}
                                onHoverStart={() => setActiveId(item.id)}
                                className="p-6 rounded-xl hover:bg-stone-50 transition-all cursor-pointer group flex items-center justify-between gap-4"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-text-main group-hover:text-gold-600 transition-colors">{item.title}</h3>
                                    <p className="text-xs text-text-muted uppercase tracking-wider">{item.desc}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-gold-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Amenities;
