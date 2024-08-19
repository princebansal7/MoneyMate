import { Button } from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BottomNote } from "../components/BottomNote";
import { Card } from "../components/Card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <>
            <Card>
                <Heading label="Sign Up" />
                <SubHeading label="Enter below details to create a new account" />
                <InputBox
                    onChange={e => setFirstName(e.target.value)}
                    field="First name"
                    placeholder="Prince"
                    type="text"
                />
                <InputBox
                    onChange={e => setLastName(e.target.value)}
                    field="Last name"
                    placeholder="Bansal"
                    type="text"
                />
                <InputBox
                    onChange={e => setUsername(e.target.value)}
                    field="Username"
                    placeholder="username / email"
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
                            console.log("signup button clicked");
                            const response = await axios.post(
                                "http://localhost:3000/api/v1/user/signup",
                                {
                                    firstName,
                                    lastName,
                                    username,
                                    password,
                                }
                            );
                            localStorage.setItem(
                                "authorization",
                                response.data.userId
                            );
                            navigate("/dashboard");
                        }}
                        label="Sign up"
                    />
                </div>
                <div className="py-2">
                    <BottomNote
                        label="Already registered?"
                        buttonText="Signin"
                        to="/signin"
                    />
                </div>
            </Card>
        </>
    );
}
