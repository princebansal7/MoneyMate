import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Users({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-black text-white flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="mx-1 font-semibold">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }}
                    label={"Send Money"}
                />
            </div>
        </div>
    );
}
