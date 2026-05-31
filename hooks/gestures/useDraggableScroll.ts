import { useRef, useState } from "react";

export const useDraggableScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const onMouseDown = (event: React.MouseEvent) => {
    if (!ref.current) return;

    event.preventDefault();
    setIsDragging(true);
    setDragged(false);
    setStartX(event.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  const onMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;

    event.preventDefault();
    const x = event.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(x - startX) > 5) {
      setDragged(true);
    }

    ref.current.scrollLeft = scrollLeft - walk;
  };

  const onClickCapture = (event: React.MouseEvent) => {
    if (!dragged) return;

    event.stopPropagation();
    event.preventDefault();
  };

  return {
    containerRef: ref,
    isDragging,
    dragHandlers: { onMouseDown, onMouseUp, onMouseLeave, onMouseMove, onClickCapture },
  };
};
