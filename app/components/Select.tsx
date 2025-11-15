interface SelectProps {
  label?: string;
  value: string;
  options: Array<SelectOption>;
  onChange: (value: string) => void;
}
type SelectOption = {
  id: string;
  value: string;
  displayText: string;
};
const Select: React.FC<SelectProps> = (props) => {
  const { label, value, options, onChange } = props;

  return (
    <div className="my-4">
      {label && <label className="block text-sm my-2 ">Select Fragrance</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-green-500 bg-white/80
                       backdrop-blur-xl text-text-primary  transition-all duration-300 hover:border-green-600/40 
                       focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.displayText}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
