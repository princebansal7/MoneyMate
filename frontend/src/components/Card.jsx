export function Card({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-200">
            <div className="rounded-2xl bg-white w-full max-w-md text-center p-8 shadow-2xl shadow-stone-400 mx-2">
                {children}
            </div>
        </div>
    );
}
