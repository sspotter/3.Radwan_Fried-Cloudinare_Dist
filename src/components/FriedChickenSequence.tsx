// "use client";

// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { useScroll, useTransform, motion, useSpring } from "framer-motion";

// interface FriedChickenSequenceProps {
//   frameCount?: number;
// }

// export const FriedChickenSequence: React.FC<FriedChickenSequenceProps> = ({
//   frameCount = 210,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [images, setImages] = useState<HTMLImageElement[]>([]);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadProgress, setLoadProgress] = useState(0);

//   // Reference for the scrolling container
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Smooth out the scroll progress
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   // Map progress to frame index
//   const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

//   // Preload images
//   useEffect(() => {
//     const loadedImages: HTMLImageElement[] = [];
//     let loadedCount = 0;

//     // const sequencePath = "/sequence/radwan_frame_";
//     const sequencePath = "/sequence/ezgif-frame-";

//     for (let i = 1; i <= frameCount; i++) {
//         const img = new Image();
//         const frameNum = String(i).padStart(3, "0");
//         img.src = `${sequencePath}${frameNum}.jpg`;
//         img.onload = () => {
//           loadedCount++;
//           setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
//           if (loadedCount === frameCount) {
//             setIsLoaded(true);
//           }
//         };
//         loadedImages.push(img);
//     }
//     setImages(loadedImages);
//   }, [frameCount]);

//   // Render to canvas
//   useEffect(() => {
//     if (!isLoaded || images.length === 0) return;

//     // const render = () => {
//     //   const idx = Math.floor(frameIndex.get());
//     //   const img = images[idx - 1] || images[0];
//     //   const canvas = canvasRef.current;
//     //   if (!canvas) return;

//     //   const ctx = canvas.getContext("2d");
//     //   if (!ctx) return;

//     //   // Clear and draw
//     //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//     //   // Cover logic
//     //   const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
//     //   const x = (canvas.width / 2) - (img.width / 2) * scale;
//     //   const y = (canvas.height / 2) - (img.height / 2) * scale;
      
//     //   ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
//     // };
// const render = () => {
//   const idx = Math.min(
//     images.length - 1,
//     Math.max(0, Math.floor(frameIndex.get()) - 1)
//   );

//   const img = images[idx];
//   if (!img) return;

//   const canvas = canvasRef.current;
//   if (!canvas) return;

//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   const scale = Math.max(
//     canvas.width / img.width,
//     canvas.height / img.height
//   );

//   const x = canvas.width / 2 - (img.width * scale) / 2;
//   const y = canvas.height / 2 - (img.height * scale) / 2;

//   ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
// };
//     // Subscribing to motion value changes
//     const unsubscribe = frameIndex.on("change", render);
    
//     // Initial render
//     render();

//     // Resize handler
//     const handleResize = () => {
//         if (canvasRef.current) {
//             canvasRef.current.width = window.innerWidth;
//             canvasRef.current.height = window.innerHeight;
//             render();
//         }
//     };
    
//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       unsubscribe();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [isLoaded, images, frameIndex]);

//   return (
//     <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         {/* Loading Overlay */}
//         {!isLoaded && (
//           <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-gold font-bold text-4xl mb-4 tracking-tighter"
//             >
//               RADWAN
//             </motion.div>
//             <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
//               <motion.div 
//                 className="h-full bg-gold" 
//                 style={{ width: `${loadProgress}%` }}
//               />
//             </div>
//             <div className="mt-2 text-xs text-white/40 uppercase tracking-widest">
//               Engineering Crunch... {loadProgress}%
//             </div>
//           </div>
//         )}

//         {/* Cinematic Canvas */}
//         <canvas
//           ref={canvasRef}
//           className="block h-screen w-full object-cover"
//         />

//         {/* Text Overlays - Beat A, B, C */}
//         <div className="absolute inset-0 pointer-events-none">
//             <ScrollLabels progress={smoothProgress} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ScrollLabels = ({ progress }: { progress: any }) => {
//     const opacityA = useTransform(progress, [0.1, 0.2, 0.3], [0, 1, 0]);
//     const opacityB = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);
//     const opacityC = useTransform(progress, [0.7, 0.8, 0.9], [0, 1, 0]);

//     return (
//         <>
//             <motion.div style={{ opacity: opacityA }} className="absolute inset-0 flex items-center justify-center">
//                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter  uppercase italic text-gold">
//                     Radwan <span className="text-white">Fried Chicken</span>
//                 </h2>
//             </motion.div>
//             <motion.div style={{ opacity: opacityB }} className="absolute inset-0 flex items-center justify-center">
//                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
//                     Real <span className="text-gold">Crunch</span>
//                 </h2>
//             </motion.div>
//             <motion.div style={{ opacity: opacityC }} className="absolute inset-0 flex items-center justify-center">
//                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic text-center px-4">
//                     Built to <span className="text-gold">Deliver</span>
//                 </h2>
//             </motion.div>
//         </>
//     );
// }


"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface FriedChickenSequenceProps {
  frameCount?: number;
}

export const FriedChickenSequence: React.FC<FriedChickenSequenceProps> = ({
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Reference for the scrolling container
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to frame index
// const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);


const frameCount = images.length;

const frameIndex = useTransform(
  smoothProgress,
  [0, 1],
  [0, Math.max(0, frameCount - 1)]
);
  // Preload images
useEffect(() => {
  const loadedImages: HTMLImageElement[] = [];
  let index = 1;
  let isCancelled = false;

  const loadNext = () => {
    if (index > 899) {
      setImages(loadedImages);
      setIsLoaded(true);
      return;
    }
    const img = new Image();
    const frameNum = String(index).padStart(3, "0");
    img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;

    img.onload = () => {
      if (isCancelled) return;
      loadedImages.push(img);
      setLoadProgress(Math.floor((loadedImages.length / 899) * 100));
      index++;
      loadNext();
    };

    img.onerror = () => {
      if (isCancelled) return;
      setImages(loadedImages);
      setIsLoaded(true);
    };
  };

  loadNext();

  return () => {
    isCancelled = true;
  };
}, []);
  // Render to canvas
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // const render = () => {
    //   const idx = Math.floor(frameIndex.get());
    //   const img = images[idx - 1] || images[0];
    //   const canvas = canvasRef.current;
    //   if (!canvas) return;

    //   const ctx = canvas.getContext("2d");
    //   if (!ctx) return;

    //   // Clear and draw
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      
    //   // Cover logic
    //   const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    //   const x = (canvas.width / 2) - (img.width / 2) * scale;
    //   const y = (canvas.height / 2) - (img.height / 2) * scale;
      
    //   ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    // };
const render = () => {
const idx = Math.min(
  images.length - 1,
  Math.max(0, Math.floor(frameIndex.get()))
);

const img = images[idx];
if (!img) return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width * scale) / 2;
  const y = canvas.height / 2 - (img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
};
    // Subscribing to motion value changes
    const unsubscribe = frameIndex.on("change", render);
    
    // Initial render
    render();

    // Resize handler
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            render();
        }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gold font-bold text-4xl mb-4 tracking-tighter"
            >
              RADWAN
            </motion.div>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gold" 
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-white/40 uppercase tracking-widest">
              Engineering Crunch... {loadProgress}%
            </div>
          </div>
        )}

        {/* Cinematic Canvas */}
        <canvas
          ref={canvasRef}
          className="block h-screen w-full object-cover"
        />

        {/* Text Overlays - Beat A, B, C */}
        <div className="absolute inset-0 pointer-events-none">
            <ScrollLabels progress={smoothProgress} />
        </div>
      </div>
    </div>
  );
};

const ScrollLabels = ({ progress }: { progress: ReturnType<typeof useSpring> }) => {
    const opacityA = useTransform(progress, [0.1, 0.2, 0.3], [0, 1, 0]);
    const opacityB = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);
    const opacityC = useTransform(progress, [0.7, 0.8, 0.9], [0, 1, 0]);

    return (
        <>
            <motion.div style={{ opacity: opacityA }} className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter  uppercase italic text-gold">
                    Radwan <span className="text-white">Fried Chicken</span>
                </h2>
            </motion.div>
            <motion.div style={{ opacity: opacityB }} className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
                    Real <span className="text-gold">Crunch</span>
                </h2>
            </motion.div>
            <motion.div style={{ opacity: opacityC }} className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic text-center px-4">
                    Built to <span className="text-gold">Deliver</span>
                </h2>
            </motion.div>
        </>
    );
}
