import React, { ReactNode } from "react";
type ButtonProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};
const Button = ({
  className,
  children,
  type,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled ? disabled : false}
      className={`btn ${className}`}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
