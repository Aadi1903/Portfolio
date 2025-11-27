// import React from 'react';

// const AnimatedCloud = () => {
//   return (
//     <div className="relative mb-8">
//       <div className="relative w-24 h-24 mx-auto">
//         {/* Main Cloud Body */}
//         <div className="absolute inset-0 animate-float">
//           <svg 
//             viewBox="0 0 100 100" 
//             className="w-full h-full filter drop-shadow-lg"
//           >
//             {/* Cloud shape with hand-drawn style */}
//             <path
//               d="M25,40 
//                  Q15,30 25,20 
//                  Q35,10 45,15 
//                  Q55,5 65,10 
//                  Q75,5 85,15 
//                  Q95,25 85,35 
//                  Q95,45 85,55 
//                  Q75,65 65,60 
//                  Q55,75 45,70 
//                  Q35,75 25,65 
//                  Q15,55 25,40"
//               fill="url(#cloudGradient)"
//               stroke="#3b82f6"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
            
//             {/* Animated outline to simulate drawing */}
//             <path
//               d="M25,40 
//                  Q15,30 25,20 
//                  Q35,10 45,15 
//                  Q55,5 65,10 
//                  Q75,5 85,15 
//                  Q95,25 85,35 
//                  Q95,45 85,55 
//                  Q75,65 65,60 
//                  Q55,75 45,70 
//                  Q35,75 25,65 
//                  Q15,55 25,40"
//               fill="none"
//               stroke="#ffffff"
//               strokeWidth="1"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeDasharray="200"
//               strokeDashoffset="200"
//               className="animate-draw"
//             />
            
//             {/* Soft glow effect */}
//             <defs>
//               <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
//                 <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
//               </linearGradient>
              
//               <filter id="glow">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                 <feMerge>
//                   <feMergeNode in="coloredBlur"/>
//                   <feMergeNode in="SourceGraphic"/>
//                 </feMerge>
//               </filter>
//             </defs>
//           </svg>
//         </div>
        
//         {/* Floating particles around cloud */}
//         <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-300 rounded-full animate-ping opacity-60"></div>
//         <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
//         <div className="absolute top-4 -right-3 w-2 h-2 bg-blue-200 rounded-full animate-bounce opacity-80"></div>
//       </div>
//     </div>
//   );
// };

// export default AnimatedCloud;



// Option 3 Cloud Component with CSS
const AnimatedCloud = () => {
  return (
    <div className="relative mb-8">
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
            ☁️
          </div>
        </div>
        
        {/* Shadow effect */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-gray-400 rounded-full blur-sm opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default AnimatedCloud;