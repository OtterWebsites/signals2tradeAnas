// "use client";

// import React from "react";
// import { ContainerScroll } from "./ui/container-scroller";

// export function HeroScrollDemo() {
//   return (
//     <div className="flex flex-col overflow-hidden">
//       {/* TOP BAR (NOT OVER VIDEO) */}
//       <div className="flex justify-center bg-white py-3">
//         <div className="flex items-center gap-3 rounded-lg px-4 py-2">
//           <span className="text-sm text-gray-600">
//             Our customers say
//           </span>

//           <span className="text-sm font-semibold text-gray-900">
//             Excellent
//           </span>

//           {/* Stars */}
//           <div className="flex gap-1">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <span
//                 key={i}
//                 className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-emerald-500 text-white text-[10px]"
//               >
//                 ★
//               </span>
//             ))}
//           </div>

//           <span className="text-sm text-gray-600">
//             4.5 out of 5 based on 2,386 reviews
//           </span>

//           <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
//             ★ Trustpilot
//           </span>
//         </div>
//       </div>

//       {/* VIDEO SECTION */}
//       <ContainerScroll titleComponent={<></>}>
//         <video
//           src="https://res.cloudinary.com/dwsdl518r/video/upload/v1766743479/v1_xmxgch.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="mx-auto h-full w-full rounded-2xl object-cover"
//           draggable={false}
//         />
//       </ContainerScroll>
//     </div>
//   );
// }