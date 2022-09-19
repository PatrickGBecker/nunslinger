import React, { useState, useEffect } from "react";
import Message from "./Message";
import "./Missions.css";

const messages =  {
    mission1: [
        `Sister Beretta: Forgive me father, for I have sinned. My last confession was-`,
        `Father Felix: I know when it was, where the hell have you been for the last two years?`,
        `Sister Beretta: Recovering.`,
        `Father Felix: Oh, right. The bishop, in Belgium… my apologies, we… never really put together what happened there. Not that there was much of him left to put back together.`,
        `Sister Beretta: Never shoot a possessed man in the liver. Never.`,
        `Father Felix: Noted. Am I correct in assuming you're here about the priest in Seville?`,
        `Sister Beretta: Yes.`,
        `Father Felix: Right, well… are you able to offer us your assistance?`,
        `(Accept Mission)`
    ],
    mission2: [
        `Sister Beretta: Forgive me father, for I have sinned.`,
        `Father Felix: You kick ass for the Lord, that is no sin. Besides, you do not bare your sword in vain. An avenger who carries out God's wrath on the wrongdoer will receive His approval.`,
        `Sister Beretta: Read the Bible again sometime. Women are painted as bigger antagonists than the Egyptians and Romans combined.`,
        `Father Felix: Well, you're certainly the protagonist here. I can't even begin to express how good it is to have you back. Your replacement was-`,
        `Sister Beretta: My replacement?`,
        `Father Felix: What, you thought all of Pandemonium disappeared for two years when you did? Of course we tried to replace you.`,
        `Sister Beretta: Tried... `,
        ` Father Felix: Yes, tried. We lost Father Winchester, Brother Remington and Mother Smith-Wesson in February alone. None of the twelve we trained lasted longer than six weeks.`,
        `Sister Beretta: Some things can't be taught. Who performed the best?`,
        `Father Felix: ...Brother Bananas.`,
        `Sister Beretta: Brother Bananas?`,
        `Father Felix: Brother Bananas. He was an exceptionally gifted and pious orangutan. An incredible sniper. Preferred to exorcise from afar`,
        `Sister Beretta: What happened to Brother Bananas?`,
        `Father Felix: He fell off the steeple of the Basilica of Our Lady of Peace. 158 meters to the ground.`,
        `Sister Beretta: I'm sorry to hear that.`,
        `Father Felix: He was the natural choice to be elected Primate later that year. A great loss.`,
        `Sister Beretta: Truly.`,
        `Father Felix: Now that we know you're alive, it's safe to say you're our greatest living hero. Well, except for Jesus, Himself, of course. Speaking of which, would you-`,
        `Sister Beretta: No need to ask, Father. Where am I going and who am I saving?`,
        `Father Felix: It's his Excellency Arch-Bishop Mancine. He's showing all the signs and was last seen on a tour of the Catacombs of Paris. Must have slipped away and moved deeper underground. Whatever he's doing down there-`,
        `Sister Beretta: We have to stop it. Queen to Bishop, checkmate. Ciao, Padre.`,
        `(Accept Mission)`
    ],
    mission3: [
        `Sister Beretta: Forgive me father, for I have sinned.`,
        `Father Felix: Your only sin is that STINK, I can smell you through the lattice.`,
        `Sister Beretta: Crawling around a giant underground tomb for two days will do that.`,
        `Father Felix: <add bible verse> Did it bother you, being in complete darkness for that long?`,
        `Sister Beretta: Ha. Two days is nothing. Try two years.`,
        `Father Felix: Two years? Wait. You mean to say-`,
        `Sister Beretta: When the bishop of Bruges exploded, bone shrapnel completely destroyed my eyes. I've spent the last two years honing my abilities. Now, The Spirit guides my bullet.`,
        `Father Felix: I had no idea. You know, I've never actually seen your face. Or, well, any of you. We only talk here.`,
        `Sister Beretta: <add bible verse>`,
        `Father Felix: I'm sorry to change topics so abruptly but there is an extremely pressing matter at hand.`,
        `Sister Beretta: Why else would I be here?`,
        `Father Felix: Cardinal Skomal.`,
        `Sister Beretta: No, that's... are... are they sure?`,
        `Father Felix: Quite sure, I'm afraid.`,
        `Sister Beretta: How long has he-`,
        `Father Felix: Not long. We received the report while you were still underground. But his condition is... I'm sorry, Sister Beretta. It appears to be an Arch-Demon.`,
        `Sister Beretta: Is he in Hungary?`,
        `Father Felix: No, he's here. In Rome.`,
        `Sister Beretta: Where? Tell me! Now!`,
        `(Accept Mission)`
    ],
    mission4: [
        `Sister Beretta: Forgive me father, for I-`,
        `Father Felix: There is no time! You must go!`,
        `Sister Beretta: What?`,
        `Father Felix: Th-the Supreme Pontiff! The Bishop of Rome! It's, he's, His Holiness is-`,
        `Sister Beretta: Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me. In nomine Patris et Filii, et Spiritus Sanсti, Let's ride.`,
        `(Accept Mission)`
    ]
}

interface Props{
    missionCount: number
    gameCount: number
}

const DialogBox = ({ gameCount }: Props) => {
    const [currentMessage, setCurrentMessage] = useState<'mission1' | 'mission2' | 'mission3' |'mission4'>('mission1');
    const [currentIndex, setCurrentIndex] = useState(0)
   
        useEffect(() => {
            if (gameCount === 0) {
                setCurrentMessage('mission1')
            } else if (gameCount === 1) {
                setCurrentMessage('mission2')
            } else if (gameCount === 3) {
                setCurrentMessage('mission3')
            } else if (gameCount === 4) {
                setCurrentMessage('mission4')
            }
        }, [gameCount])

    const handleClick = () => {
        if (currentIndex < messages[currentMessage].length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };
    
    return (
        <div className="DialogWindow">
            <div className="DialogTitle"/>
            <Message message={messages[currentMessage][currentIndex]} key={currentMessage} />
            <div onClick={handleClick} className="DialogFooter">
                Next
            </div>
        </div>
    );
    };

export default DialogBox;
