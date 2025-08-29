import { useEffect, useState } from "react";
import axios from "axios";

export const AppBar = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "" });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const response = await axios.get(
                    "http://localhost:3000/api/v1/user/me",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(response.data.user);
            } catch (e) {
                console.error("Failed to fetch user info for AppBar:", e);
            }
        };
        fetchUser();
    }, []);
    const initials =
        (user.firstName ? user.firstName[0].toUpperCase() : "") +
        (user.lastName ? user.lastName[0].toUpperCase() : "");
    return (
        <div className="shadow h-14 flex bg-slate-200 rounded mx-1 justify-between">
            <div className="flex flex-col font-extrabold justify-center h-full ml-4">
                MoneyMate App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    {user.firstName} {user.lastName}
                </div>
                <div className="rounded-full h-12 w-12 bg-black flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-white text-xl">
                        {initials || "U"}
                    </div>
                </div>
            </div>
        </div>
    );
};
