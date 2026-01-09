import React from "react";
import { useCases } from "@/data/benefits";

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
        You can do anything:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800 cursor-pointer"
          >
            {/* Image or placeholder */}
            {useCase.imageSrc ? (
              <img
                src={useCase.imageSrc}
                alt={useCase.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40">
                <span className="text-sm">TODO: Add image</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
              <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {useCase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
