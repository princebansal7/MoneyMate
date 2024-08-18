import { Button } from "../components/Button";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BottomNote } from "../components/BottomNote";
import { Card } from "../components/Card";

export function Signin() {
    return (
        <>
            <Card>
                <Heading label="Sign In" />
                <SubHeading label="Enter below details to access your account" />
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
                <Button label="Sign In" />
                <BottomNote
                    label="Forgot password?"
                    buttonText="Reset"
                    to="/reset"
                />
            </Card>
        </>
    );
}
