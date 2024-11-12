export const InputField = ({label, name, type, value, onChange}: {label: string; name: string; type: string; value: string; onChange: any}) => {
    return (
        <div> 
            <div>
                <label htmlFor={name} className="block text-sm/6 font-medium text-white-900">
                    {label}
                </label>
                <div className="mt-2">
                    <input
                    id={name}
                    name={name}
                    type={name}
                    onChange={onChange}
                    required
                    className="block w-full rounded-md border-0 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>
        </div>
    )
}
