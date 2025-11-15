interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, disabled, startIcon, endIcon, label } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full md:w-1/2 group relative mb-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-lg 
                text-white 
                bg-gradient-to-r from-green-900 to-green-600 
                rounded-xl shadow-lg hover:shadow-2xl 
                disabled:from-gray-300 disabled:to-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
                transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-transform duration-700 group-hover:translate-x-full"></div>
      {startIcon && startIcon}
      
      <span className="relative z-10">{label}</span>
      {endIcon && endIcon}
    </button>
  );
};

export default Button;
