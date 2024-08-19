import { Link } from "react-router-dom";

export function BottomNote({ label, buttonText, to }) {
    return (
        <div className="text-sm flex justify-center">
            <div>{label}</div>
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    );
}
