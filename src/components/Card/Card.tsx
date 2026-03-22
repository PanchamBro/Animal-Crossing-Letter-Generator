import "./Card.css";
import CanvasBackground from "../CanvasBackground/CanvasBackground";
import { useEffect, useRef, useState } from "react";
import { CardName } from "./cardConstants";

function getCssClass(type: CardName): string {
  return `${type.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}-card`;
}

const backgroundColors: Record<string, string> = {
  [CardName.Gem]: "rgb(185, 222, 199)",
  [CardName.Balloons]: "rgb(252, 252, 240)",
  [CardName.Fireworks]: "rgb(54, 42, 152)",
  [CardName.Hibiscus]: "rgb(243, 241, 242)",
  [CardName.TurkeyDay]: "rgb(216, 147, 1)",
  [CardName.WarmSweater]: "rgb(138, 1, 0)",
  [CardName.BunnyDay]: "rgb(253, 251, 235)",
}

export default function Card({
  type = CardName.Airmail,
  tilt = false,
  editable = false,
  zoomable = true,
  onClick,
  startText: startDisplayText = "Dear Villager,",
  messageText: messageDisplayText = "Congratulations on your big move! We hope you enjoy your new island life. To celebrate this fresh start, we'd like to give you a gift that is sure to come in handy!",
  signatureText: signatureDisplayText = "From Tom Nook",
  limitedDate
}: {
  type?: CardName,
  tilt?: boolean,
  editable?: boolean,
  zoomable?: boolean,
  onClick?: () => void,
  startText?: string,
  messageText?: string,
  signatureText?: string,
  limitedDate?: string
}) {
  const startRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const [startText, setStartText] = useState(startDisplayText);
  const [messageText, setMessageText] = useState(messageDisplayText);
  const [signatureText, setSignatureText] = useState(signatureDisplayText);

  useEffect(() => {
    if (startRef.current) {
      startRef.current.addEventListener("input", () => {
        setStartText(startRef.current?.textContent || startDisplayText);
      });
    }
    if (messageRef.current) {
      messageRef.current.addEventListener("input", () => {
        setMessageText(messageRef.current?.textContent || messageDisplayText);
      });
    }
    if (signatureRef.current) {
      signatureRef.current.addEventListener("input", () => {
        setSignatureText(signatureRef.current?.textContent || signatureDisplayText);
      });
    }
  }, [editable, startRef, messageRef, signatureRef, startDisplayText, messageDisplayText, signatureDisplayText]);

  return (
    <div
      className={`card ${getCssClass(type)} ${tilt ? "card-tilt" : ""} ${zoomable ? "card-zoomable" : ""}`}
      key={type}
      onClick={onClick}
    >
      <CanvasBackground className="card-start" backgroundColor={backgroundColors[type]} contentToWatch={startText}>
        <div contentEditable={editable} ref={startRef} suppressContentEditableWarning>
          {startDisplayText}
        </div>
      </CanvasBackground>
      <div className="card-message-container">
        <CanvasBackground backgroundColor={backgroundColors[type]} className="card-message-inner-container" contentToWatch={messageText}>
          <div className="card-message" contentEditable={editable} ref={messageRef} suppressContentEditableWarning>
            {messageDisplayText}
          </div>
        </CanvasBackground>
      </div>
      <CanvasBackground className="card-signature" backgroundColor={backgroundColors[type]} contentToWatch={signatureText}>
        <div contentEditable={editable} ref={signatureRef} suppressContentEditableWarning>
          {signatureDisplayText}
        </div>
      </CanvasBackground>
      {zoomable ? (
        <div className="card-label">
          {type}
        </div>
      ) : null}
      {limitedDate !== undefined ? <div className="card-overlay-label card-limited-label">Limited Availability</div> : null}
      {limitedDate !== undefined ? <div className="card-overlay-label card-until-label">Until {limitedDate}</div> : null}
    </div>
  );
}