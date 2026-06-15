import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, as: Tag = 'h2', className = '', triggerOnLoad = false }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.innerText.split(' ');
    el.innerHTML = words
      .map(w => `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="tw-word" style="display:inline-block">${w}</span></span>`)
      .join(' ');

    const wordEls = el.querySelectorAll('.tw-word');
    const anim = gsap.fromTo(
      wordEls,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        ...(triggerOnLoad
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }),
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [triggerOnLoad]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
};

export default TextReveal;
