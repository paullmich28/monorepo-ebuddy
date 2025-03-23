import React from "react";
import Aurora from "./Aurora";

export default function AuroraBackground({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <Aurora
        colorStops={["#00008B", "#1E90FF", "#87CEEB"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
