import type { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return <div className={`max-w-200 mx-auto w-full px-5 ${className}`}>{children}</div>;
};

export default Wrapper;
