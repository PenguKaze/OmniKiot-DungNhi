const variants = {
  primary: 'bg-[#171717] text-white hover:bg-[#D4829A] border border-[#171717] hover:border-[#D4829A]',
  secondary: 'bg-transparent text-[#171717] border border-[#171717] hover:bg-[#171717] hover:text-white',
  ghost: 'bg-transparent text-[#171717] hover:text-[#D4829A]',
  outline_white: 'bg-transparent text-white border border-white hover:bg-white hover:text-[#171717]',
  accent: 'bg-[#D4829A] text-white hover:bg-[#B8627E] border border-[#D4829A] hover:border-[#B8627E]',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Tag = 'button',
  ...props
}) => (
  <Tag
    className={`
      inline-flex items-center justify-center gap-2
      tracking-widest uppercase font-medium
      transition-all duration-300
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}
    {...props}
  >
    {children}
  </Tag>
);

export default Button;
