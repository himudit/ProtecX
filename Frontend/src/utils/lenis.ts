import Lenis from '@studio-freight/lenis';

let lenis: Lenis | null = null;

export const initLenis = () => {
    if (lenis) return lenis;

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenis;
};

export const getLenis = () => lenis;

export const destroyLenis = () => {
    lenis?.destroy();
    lenis = null;
};
