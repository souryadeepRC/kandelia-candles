interface ItemDisplayProps {
  label: string;
  value: string;
}

const ItemDisplay: React.FC<ItemDisplayProps> = (props) => {
  const { label, value } = props;
  return (
    <div className="grid grid-cols-2">
      <p>{label}:</p>
      <p className="text-right text-primary-color font-bold">{value}</p>
    </div>
  );
};

export default ItemDisplay;
