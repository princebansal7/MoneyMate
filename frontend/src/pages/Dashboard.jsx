import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { UserFilter } from "../components/UserFilter";

export function Dashboard() {
    return (
        <>
            <AppBar />
            <div className="m-8">
                <Balance />
                <UserFilter />
            </div>
        </>
    );
}
