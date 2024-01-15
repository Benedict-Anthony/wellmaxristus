import React, { ReactNode } from "react";
type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <article className="w-full md:w-96 bg-base-100 shadow-xl drop-shadow-lg  py-1 px-2 rounded-md">
      {children}
    </article>
  );
};

export default Card;
