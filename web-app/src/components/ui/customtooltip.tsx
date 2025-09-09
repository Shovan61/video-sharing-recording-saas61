import React, { useState } from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Tooltip: React.FC<TooltipProps> = ({ content, children, className, onClick }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <button
        type="button"
        onClick={onClick}
        className="focus:outline-none"
      >
        {children}
      </button>

      {visible && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs px-3 py-1 rounded bg-gray-950 text-white text-xs shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
