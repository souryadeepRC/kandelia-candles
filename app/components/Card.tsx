interface CardProps {
  title: string;
  description: string;
  options: Array<CardOption>;
}
type CardOption = {
  title: string;
  description: string;
};

const getGridCols = (length: number): string => {
  if (length === 1) return "grid-cols-1";
  if (length === 2) return "md:grid-cols-2 lg:grid-cols-2";
  if (length === 3) return "md:grid-cols-3 lg:grid-cols-3";
  if (length === 4) return "md:grid-cols-2 lg:grid-cols-4";
  return "md:grid-cols-2 lg:grid-cols-5";
};

const Card: React.FC<CardProps> = (props) => {
  const { title, description, options } = props;
  const gridClass = getGridCols(options.length);

  return (
    <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="heading-text">{title}</h2>
        {description && <p className="sub-heading-text">{description}</p>}
      </div>

      {/* Shipping Details Grid */}
      <div className={`grid grid-cols-1 ${gridClass} gap-4 md:gap-6`}>
        {options.map((option) => {
          return (
            <div
              key={option.title}
              className="text-center group relative bg-white rounded-2xl p-4 md:p-6 border
               border-gray-100 hover:border-green-200 
              transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 
                    group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent 
                group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:via-green-900
                 group-hover:to-green-700 group-hover:bg-clip-text transition-all duration-300"
                >
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Card;
