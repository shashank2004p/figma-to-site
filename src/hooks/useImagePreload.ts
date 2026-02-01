import { useState, useEffect } from "react";

export const useImagePreload = (imageSrcs: string[], delay = 300) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const minLoadTime = new Promise((resolve) => setTimeout(resolve, delay));

    const loadImages = imageSrcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        })
    );

    Promise.all([...loadImages, minLoadTime]).then(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [imageSrcs, delay]);

  return isLoading;
};
