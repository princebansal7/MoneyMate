export function Card({ children }) {
    return (
        <>
            <div className="flex bg-slate-300 h-screen justify-center">
                <div className="flex flex-col justify-center ">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-lg shadow-stone-600">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
