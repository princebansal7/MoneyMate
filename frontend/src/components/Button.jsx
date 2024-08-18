export function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="w-full text-white bg-black border border-transparent hover:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 mt-4 py-2.5 me-2 mb-2"
        >
            {label}
        </button>
    );
}
