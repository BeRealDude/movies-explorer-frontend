import { useEffect, useState } from "react";

 export function useScreenResolution(req) {
  const getMatches = (req) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(req).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(req));

  function handleChange() {
    setMatches(getMatches(req));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(req);

    handleChange();

    if (matchMedia.addEventListener) {
      matchMedia.addEventListener("change", handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeEventListener) {
        matchMedia.removeEventListener("change", handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
    
  }, [req]);

  return matches;
} 
