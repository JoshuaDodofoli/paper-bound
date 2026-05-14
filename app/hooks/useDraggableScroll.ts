import { useRef, useState } from "react";

export const useDraggableScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    e.preventDefault();
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    if (Math.abs(x - startX) > 5) {
      setDragged(true);
    }
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return {
    ref,
    isDragging,
    props: { onMouseDown, onMouseUp, onMouseLeave, onMouseMove, onClickCapture }
  };
};