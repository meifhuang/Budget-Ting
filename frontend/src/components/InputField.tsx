interface InputProps {
    name: string;
    label: string;
    type: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    labelColor: string;
    value: string | number; 
    placeholder: string; 
}

export const InputField: React.FC<InputProps> = ({label, name, type, onChange,labelColor, value, placeholder}: InputProps) => {
    return (
        <div> 
            <div>
                <label htmlFor={name} className={`block text-sm/6 font-medium ${labelColor} mb-1 `}>
                    {label}
                </label>
                <div className="mt-2">
                    <input
                    id={name}
                    name={name}
                    type={type}
                    onChange={onChange}
                    value={value}
                    required
                    placeholder={placeholder}
                    className="block w-full rounded-md border-0 p-2 mb-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>
        </div>
    )
}
