import { Button } from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BottomNote } from "../components/BottomNote";
import { Card } from "../components/Card";

export function Signup() {
    return (
        <>
            <Card>
                <Heading label="Sign Up" />
                <SubHeading label="Enter below details to create a new account" />
                <InputBox field="First name" placeholder="Prince" type="text" />
                <InputBox field="Last name" placeholder="Bansal" type="text" />
                <InputBox
                    field="Email"
                    placeholder="prince.bansal@gmail.com"
                    type="email"
                />
                <InputBox
                    field="Password"
                    placeholder="********"
                    type="password"
                />
                <Button label="Signup" />
                <BottomNote
                    label="Already registered with us?"
                    buttonText="Signin"
                    to="/signin"
                />
            </Card>
        </>
    );
}
