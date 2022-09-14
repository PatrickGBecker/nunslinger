import React, { useMemo } from "react";
import { animated, useTransition } from "react-spring";

interface IMessageProps {
    message: string
    isFirstMessage: boolean
}

const Message = ({ message, isFirstMessage }: IMessageProps) => {
    const items = useMemo(
        () =>
            message.split("").map((letter:string, index:number) => ({
                item: letter,
                key: index
            })),
        [message]
    );
    const transitions = useTransition(items, {
        trail: 35,
        from: { display: "none" },
        enter: { display: "" },
        delay: isFirstMessage ? 2000 : 0,
    });
    return (
        <div className="DialogMessage">
            {transitions((props, item) => {
                return (
                    <animated.span style={props}>
                        {item.item}
                    </animated.span>
                );
            })}
        </div>
    );
};

export default Message;
