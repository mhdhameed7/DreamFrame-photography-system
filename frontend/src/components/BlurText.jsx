import { motion } from 'framer-motion';

export default function BlurText({ 
  text, 
  delay = 0, 
  className = "", 
  animateBy = "word",
  direction = "top",
}) {
  const elements = animateBy === "word" ? text.split(" ") : text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: animateBy === "word" ? 0.08 : 0.03, delayChildren: delay },
    },
  };

  const defaultY = direction === "top" ? -20 : 20;

  const child = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: defaultY,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // cinematic ease out
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ display: 'inline-block' }}
    >
      {elements.map((el, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          style={{ 
            display: 'inline-block', 
            marginRight: animateBy === "word" ? '0.25em' : '0' 
          }}
        >
          {el === " " && animateBy === "char" ? "\u00A0" : el}
        </motion.span>
      ))}
    </motion.span>
  );
}
