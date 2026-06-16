const AnnouncementBar = ({ visible = true, message = 'MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TỪ 500K — MÃ: DUNGNHI500' }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] bg-[#171717] text-white transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <p className="text-center py-2 text-xs tracking-widest font-medium uppercase">
        {message}
      </p>
    </div>
  );
};

export default AnnouncementBar;
