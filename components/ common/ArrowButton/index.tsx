import React from "react";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
};

const ArrowButton: React.FC<ArrowButtonProps> = (props) => {
  let comp: React.ReactNode = null;

  if (props.direction === "left") {
    comp = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
    );
  } else if (props.direction === "right") {
    comp = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
      </svg>
    );
  }

  if (!comp) {
    return null;
  }

  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer hover:text-slate-400"
    >
      {comp}
    </div>
  );
};

export default ArrowButton;
