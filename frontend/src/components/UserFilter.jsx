import { useEffect, useState } from "react";
import { Users } from "./Users";
import axios from "axios";

export const UserFilter = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    // apply debouncing here
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("authorization");
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/list-user?filter=${filter}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setUsers(response.data.usersArr);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [filter]);

    return (
        <>
            <div className="mt-6 mb-2 ">
                <input
                    onChange={e => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                ></input>
            </div>
            <div className="font-bold my-4 text-lg">Users</div>
            <div>
                {users.map(user => (
                    <Users user={user} key={user._id} />
                ))}
            </div>
        </>
    );
};
