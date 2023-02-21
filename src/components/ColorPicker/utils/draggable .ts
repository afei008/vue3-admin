/** @format */

let isDragging = false;

export interface DraggableOptions {
  drag?: (event: MouseEvent) => void;
  start?: (event: MouseEvent) => void;
  end?: (event: MouseEvent) => void;
}

export default function draggable(
  element: HTMLElement,
  options: DraggableOptions
) {
  const moveFn = (event: MouseEvent) => {
    options.drag?.(event);
  };

  const upFn = (event: MouseEvent) => {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;
    options.end?.(event);
  };

  const downFn = (event: MouseEvent) => {
    if (isDragging) {
      return;
    }
    event.preventDefault();
    document.onselectstart = () => false;
    document.ondragstart = () => false;
    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
    isDragging = true;
    options.start?.(event);
  };

  element.addEventListener('mousedown', downFn);
}
