import { useState, useEffect } from "react";

export const useImagePreload = (imageSrcs: string[]) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadImages = imageSrcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    );

    Promise.all(loadImages).then(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [imageSrcs]);

  return isLoading;
};
