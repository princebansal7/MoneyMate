export const AppBar = () => {
    return (
        <div className="shadow h-14 flex bg-slate-200 rounded mx-1 justify-between">
            <div className="flex flex-col font-extrabold justify-center h-full ml-4">
                MoneyMate App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Test user
                </div>
                <div className="rounded-full h-12 w-12 bg-black flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-white text-xl">
                        T
                    </div>
                </div>
            </div>
        </div>
    );
};
