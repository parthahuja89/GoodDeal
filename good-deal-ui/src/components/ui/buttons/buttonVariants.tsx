import { Button } from "./button";

interface buttonProps {
    buttonText: string
}

export default function PrimaryButton(props: buttonProps) {
    return (
        <Button className="bg-purple-500 hover:bg-purple-600 text-white hover:text-white transition-all duration-300">
            {props.buttonText}
        </Button>
    );
}

export function SecondaryButton(props: buttonProps) {
    return (
        <Button className="bg-gray-500 hover:bg-gray-600 text-white hover:text-white transition-all duration-300">
            {props.buttonText}
        </Button>
    );
}