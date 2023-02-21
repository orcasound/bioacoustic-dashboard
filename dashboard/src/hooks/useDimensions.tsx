import { useState, useEffect } from 'react';

function useDimensions(ref) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {

        function updateDimensions() {
            const { width, height } = ref.current ? ref.current.getBoundingClientRect() : { width: 0, height: 0 };
            if (width !== dimensions.width || height !== dimensions.height) {
                setDimensions({ width: Math.round(width), height: Math.round(height) })
            }
        }

        // Add event listener
        window.addEventListener("resize", updateDimensions);
        // Call handler right away so state gets updated with initial window size
        updateDimensions();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", updateDimensions);

    }, [ref])
    return dimensions;
}

export default useDimensions;