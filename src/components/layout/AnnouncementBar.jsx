import { useEffect, useRef, useState } from 'react';

const AnnouncementBar = ({ message = 'MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TỪ 500K — MÃ: DUNGNHI500' }) => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current < lastScrollY.current || current < 10);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-[#171717] text-white transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <p className="text-center py-2 text-xs tracking-widest font-medium uppercase">
        {message}
      </p>
    </div>
  );
};

export default AnnouncementBar;
