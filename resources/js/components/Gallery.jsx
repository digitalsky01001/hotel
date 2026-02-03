import React from 'react';

const images = [
    { src: '/images/gallery-1.jpg', span: 'col-span-2 row-span-2' },
    { src: '/images/gallery-2.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery-3.jpg', span: 'col-span-1 row-span-2' },
    { src: '/images/gallery-4.jpg', span: 'col-span-1 row-span-1' },
    { src: '/images/gallery-5.jpg', span: 'col-span-2 row-span-1' },
];

const Gallery = () => {
    return (
        <section className="py-16 bg-white">
            <div className="w-[70%] mx-auto">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-2 block">Фотогалерея</span>
                        <h2 className="text-4xl font-heading text-text-main">Атмосфера Bella</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-[600px]">
                    {images.map((img, idx) => (
                        <div key={idx} className={`relative rounded-xl overflow-hidden group ${img.span}`}>
                            <img
                                src={img.src}
                                alt={`Gallery ${idx}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
