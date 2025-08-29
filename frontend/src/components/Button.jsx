export function Button({ label, onClick, type = "button", ...props }) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="w-full text-white bg-black  border border-transparent hover:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 me-2"
            {...props}
        >
            {label || props.children}
        </button>
    );
}
