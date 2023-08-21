import { useCallback, useState } from "react";

const useOnScreen = ({
  root,
  rootMargin = "0px",
  threshold = 1,
}: {
  root?: Element;
  rootMargin?: string;
  threshold?: number | number[];
}) => {
  const [observer, setObServer] = useState<IntersectionObserver>();
  const [isIntersecting, setIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
                console.log('xx')
                observer.disconnect()
            }
            // setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        observer.observe(node);
        // setObServer(observer);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer };
};

export default useOnScreen;
