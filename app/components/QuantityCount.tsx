interface QuantityCountProps {
  label?: string;
  onReduce: () => void;
  onAdd: () => void;
  isReduceDisabled?: boolean;
  isAddDisabled?: boolean;
  value: number;
  onChange: (quantity: number) => void;
  errorMessage: string | undefined;
}

const QuantityCount: React.FC<QuantityCountProps> = (props) => {
  const {
    label,
    onAdd,
    onReduce,
    onChange,
    value,
    isAddDisabled,
    isReduceDisabled,
    errorMessage,
  } = props;

  return (
    <div className="my-4">
      {label && (
        <label className="block text-sm  text-text-primary mb-3">{label}</label>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={onReduce}
          disabled={isReduceDisabled}
          className="flex items-center justify-center h-10 w-10 disabled:bg-green-100/10 disabled:cursor-not-allowed
                     rounded-lg border border-green-600/40 bg-white hover:bg-green-600/5 transition-all duration-300
                       text-green-600"
        >
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(1, Number(e.target.value)))}
          className="w-1/4 md:w-1/6  px-4 py-3 rounded-xl border border-green-500 bg-white/80 backdrop-blur-xl text-center text-text-primary  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:border-transparent"
        />
        <button
          onClick={onAdd}
          disabled={isAddDisabled}
          className="flex items-center justify-center h-10 w-10  disabled:bg-gray-100 disabled:cursor-not-allowed
                    rounded-lg border border-green-600/40 bg-white hover:bg-green-600/5 transition-all duration-300  text-green-600"
        >
          +
        </button>
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500 pt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default QuantityCount;
