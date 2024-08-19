import { Button } from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BottomNote } from "../components/BottomNote";
import { Card } from "../components/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <>
            <Card>
                <Heading label="Sign In" />
                <SubHeading label="Enter below details to access your account" />
                <InputBox
                    onChange={e => setUsername(e.target.value)}
                    field="Username"
                    placeholder="princebansal_"
                    type="text"
                />
                <InputBox
                    onChange={e => setPassword(e.target.value)}
                    field="Password"
                    placeholder="********"
                    type="password"
                />
                <div className="mb-2">
                    <Button
                        onClick={async () => {
                            // console.log("signin button clicked");
                            const response = await axios.post(
                                "http://localhost:3000/api/v1/user/signin",
                                { username, password }
                            );
                            localStorage.setItem(
                                "authorization",
                                response.data.jwtToken
                            );
                            navigate("/dashboard");
                        }}
                        label="Sign In"
                    />
                </div>
                <div className="mt-1">
                    <BottomNote
                        label="Forgot password?"
                        buttonText="Reset"
                        to="/reset"
                    />
                </div>
                <div className="mt-1 pb-2">
                    <BottomNote
                        label="New user?"
                        buttonText="Signup"
                        to="/signup"
                    />
                </div>
            </Card>
        </>
    );
}
