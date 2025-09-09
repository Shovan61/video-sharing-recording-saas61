import React from 'react';

interface SpinnerProps {
  size?: number;
  color?: string; // Optional
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color }) => {
  const spinnerColor = color || '#3B82F6'; // Default to Tailwind blue-500

  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke={spinnerColor}
        strokeWidth="5"
      />
      <path
        className="opacity-75"
        fill={spinnerColor}
        d="M25 5
          a20 20 0 0 1 0 40
          a20 20 0 0 1 0 -40
          M25 0
          a25 25 0 0 0 0 50
          a25 25 0 0 0 0 -50"
      />
    </svg>
  );
};

export default Spinner;
