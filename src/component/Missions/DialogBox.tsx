import React, { useState } from "react";
import Message from "./Message";
import "./Missions.css";

const messages = [
    "Killing is like forgiveness, the more you do it - the easier it gets.",
    "I always wipe demon blood on my clothes, it's a nasty habit.",
    "Who did you think would exorcise the exorcists? His Holiness himself?"
];

interface Props{
    missionCount: number
    gameCount: number
}

const DialogBox = (props: Props) => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const handleClick = () => {
        if (currentMessage < messages.length - 1) {
            setCurrentMessage(currentMessage + 1);
        } else {
            setCurrentMessage(0);
        }
    };
    return (
        <div className="DialogWindow">
            <div className="DialogTitle"/>
            <Message isFirstMessage={currentMessage === 0} message={messages[currentMessage]} key={currentMessage} />
            <div onClick={handleClick} className="DialogFooter">
                Next
            </div>
        </div>
    );
};

export default DialogBox;
