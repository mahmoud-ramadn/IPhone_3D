import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements with GSAP and ScrollTrigger.
 * @param {string|Element|Array} target - The target(s) to animate.
 * @param {object} animationProps - The GSAP animation properties.
 * @param {object} scrollProps - Additional ScrollTrigger properties.
 */
 export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  });
};

/**
 * Animate elements with GSAP timeline.
 * @param {gsap.core.Timeline} timeline - The GSAP timeline instance.
 * @param {object} rotationRef - The reference to the rotation object.
 * @param {number} rotationState - The state value for rotation.
 * @param {string|Element} firstTarget - The first target to animate.
 * @param {string|Element} secondTarget - The second target to animate.
 * @param {object} animationProps - The GSAP animation properties.
 */
  export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<'
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<'
  );
};

