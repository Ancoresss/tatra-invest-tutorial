"use client";

import { useRemainingHeight } from "@/lib/hooks/useRemainingHeight";
import { FC, ReactNode, useRef } from "react";

interface OccupyRestWindowHeightProps {
  disableOnMobile?: boolean;
  children: ReactNode;
  className?: string;
}

const OccupyRestWindowHeight: FC<OccupyRestWindowHeightProps> = ({
  disableOnMobile = false,
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const remainingHeight = useRemainingHeight(containerRef);

  return (
    <div
      ref={containerRef}
      style={{ height: !disableOnMobile && remainingHeight ? remainingHeight : "auto" }}
      className={className}
    >
      {children}
    </div>
  );
};

export default OccupyRestWindowHeight;
