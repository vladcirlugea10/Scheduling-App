import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react'

type AnimatedComponentProps = {
    direction?: 'left' | 'right';
    children: React.ReactNode;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ direction = 'left', children}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0.5 1.0', '0.5 0.0'],
    });

    const offsetX = typeof window !== 'undefined' ? window.innerWidth * 0.25 : 200;
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 0.4], [direction === 'left' ? -offsetX : offsetX, 0]);

    const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
    const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 20 });

    const alignStyles = direction === 'left' ? { marginRight: 'auto', marginLeft: '5%' } : { marginLeft: 'auto', marginRight: '5%' };

    return (
        <motion.div ref={ref} style={{ x: smoothX, opacity: smoothOpacity, display: 'flex',
      justifyContent: direction === 'left' ? 'flex-start' : 'flex-end',
      width: '100%', }}>
            <div style={{ maxWidth: '600px', width: 'fit-content' }}>
      {children}
    </div>
        </motion.div>
    );
};

export default AnimatedComponent;