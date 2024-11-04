interface ClassFilterProps {
    value: string;
    onChange: (value: string) => void;
    classes: string[];
  }
  
  export function ClassFilter({ value, onChange, classes }: ClassFilterProps) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Classes</option>
        {classes.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>
    );
  }