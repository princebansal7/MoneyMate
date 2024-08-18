export function InputBox({ field, placeholder, type }) {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2 mt-1">
                {field}
            </div>
            <input
                className="w-full px-2 py-1 border rounded-lg border-stone-400"
                type={type}
                placeholder={placeholder}
            ></input>
        </div>
    );
}
