import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";

export function TransferMoney() {
    const [searchParams] = useSearchParams();
    const [amount, setAmount] = useState(0);
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    // console.log(id);
    return (
        <Card>
            <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">
                    Transfer Amount
                </h2>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                        <span className="text-2xl text-white">
                            {name[0].toUpperCase()}
                        </span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4 mt-4 text-left">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="amount"
                        >
                            Amount to send (in Rs)
                        </label>
                        <input
                            onChange={e => setAmount(e.target.value)}
                            type="number"
                            className="flex h-10 w-full rounded-lg border border-input border-stone-400 bg-background px-3 py-2 text-sm"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    <button
                        onClick={async () => {
                            // console.log("send money clicked");
                            // console.log(id, amount);
                            await axios.post(
                                "http://localhost:3000/api/v1/account/transaction",
                                { sendToUserId: id, amount },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem(
                                            "token"
                                        )}`,
                                    },
                                }
                            );
                        }}
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </Card>
    );
}
