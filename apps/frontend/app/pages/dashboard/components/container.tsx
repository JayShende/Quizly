import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
<div className="min-h-screen w-full relative">
  {/* Dashed Bottom Fade Grid */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px",
      backgroundPosition: "0 0, 0 0",
      maskImage: `
         repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
      WebkitMaskImage: `
  repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
      `,
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
    }}
  />
      <div className={cn("sm:max-w-5xl max-w-full mx-auto w-full px-4 relative", className)}>
        {children}
      </div>
    </div>
  );
};

// const Container = ({ children, className }: ContainerProps) => {
//     return (

//         <div className={cn("max-w-5xl mx-auto w-full px-4", className)}>
//           {children}
//         </div>

//     );
//   };

// const Container = ({ children, className }: ContainerProps) => {
//   return (
//     <div className="min-h-screen w-full bg-white relative">
//       {/* Dual Gradient Overlay (Top) Background */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `
//         linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
//         linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
//         radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
//         radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent)
//       `,
//           backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
//         }}
//       />
//       {/* Your Content/Components */}
//       <div className={cn("max-w-5xl mx-auto w-full px-4 relative", className)}>
//         {children}
//       </div>
//     </div>
//   );
// };

export default Container;
