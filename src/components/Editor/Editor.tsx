import "./Editor.css";
import Card from "../Card/Card";
import { CardName } from "../Card/cardConstants";
import Button from "../Button/Button";
import { generateLink, generateLinkParams } from "./editorFunctions";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router";
import { useState } from "react";

const API_URL = import.meta.env.VITE_BOTTLE_API_URL;

function saveImage(cardElement: HTMLElement, callback?: (success: boolean) => void) {
  console.log("Saving image...");
  const cardScale = parseFloat(getComputedStyle(cardElement).getPropertyValue("--card-scale") ?? 1)

  html2canvas(cardElement, { scale: 1 / cardScale, backgroundColor: null }).then(async (canvas) => {
    const pngBlob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b as Blob), "image/png")
    );
    const file = new File([pngBlob], "animal-crossing-card.png", { type: "image/png" });

    const canShareFile = typeof navigator !== "undefined" && "canShare" in navigator && navigator.canShare?.({ files: [file] });
    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/.test(navigator.userAgent);

    if ((isIOS || isAndroid) && "share" in navigator && canShareFile) {
      console.log("Sharing via mobile share API");
      await navigator.share({
        files: [file]
      });
      console.log("Shared via mobile share API");
    } else {
      // Copy to clipboard
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
        console.log("Image copied to clipboard");
      } catch (err) {
        console.error("Failed to copy image to clipboard", err);
      }
      // Download the image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `animal-crossing-card.png`;
      link.click();

      console.log("Image saved successfully");
    }

    if (callback) {
      callback(true);
    }
  }).catch(err => {
    console.error("Failed to save image", err);
    if (callback) {
      callback(false);
    }
  });
}

function copyLink(cardType: CardName, startText: string, messageText: string, signatureText: string) {
  const url = generateLink(cardType, startText, messageText, signatureText);
  // Copy to clipboard
  navigator.clipboard.writeText(url).then(() => {
    console.log("Link copied to clipboard");
  }).catch(err => {
    console.error("Failed to copy link to clipboard", err);
  });
}

function shareBottle(cardType: CardName, startText: string, messageText: string, signatureText: string) {
  const time = Date.now();
  const link = generateLink(cardType, startText, messageText, signatureText);
  const content = `\`\`\`json\n{\n  "time": ${time},\n  "card": ${JSON.stringify(cardType)},\n  "start": ${JSON.stringify(startText)},\n  "message": ${JSON.stringify(messageText)},\n  "signature": ${JSON.stringify(signatureText)}\n}\n\`\`\`\n${link}`;
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "content": content
    })
  }).then(response => {
    if (response.ok) {
      console.log("Bottle shared successfully");
    } else {
      console.error("Failed to share bottle", response.statusText);
    }
  }).catch(err => {
    console.error("Error sharing bottle", err);
  });
}

const DEFAULT_START_TEXT = "Dear Villager,";
const DEFAULT_MESSAGE_TEXT = "Welcome to the letter editor! Click any text to edit and start typing up a letter! Once you're done, use the buttons below to share with your friends!";
const DEFAULT_SIGNATURE_TEXT = "From Your Friend";

export default function Editor({ cardType, shareMode: shareMode = false, startText = DEFAULT_START_TEXT, messageText = DEFAULT_MESSAGE_TEXT, signatureText = DEFAULT_SIGNATURE_TEXT }: { cardType: CardName, shareMode?: boolean, startText?: string, messageText?: string, signatureText?: string }) {
  const LABEL_DELAY = 1500;
  const SAVE_LABEL = "Save Image";
  const LINK_LABEL = "Copy Link";

  const navigate = useNavigate();
  const [saveButtonLabel, setSaveButtonLabel] = useState(SAVE_LABEL);
  const [linkButtonLabel, setLinkButtonLabel] = useState(LINK_LABEL);

  return (
    <div className="editor editor-visible">
      <Card type={cardType} editable={!shareMode} zoomable={false} startText={startText} messageText={messageText} signatureText={signatureText} />
      <div className="editor-controls">
        <Button label={saveButtonLabel} onClick={
          () => {
            setSaveButtonLabel("Saving...");
            const cardElement = document.querySelector(".card");
            if (cardElement instanceof HTMLElement) {
              saveImage(cardElement, (success) => {
                if (success) {
                  setSaveButtonLabel("Saved!");
                  setTimeout(() => {
                    setSaveButtonLabel(SAVE_LABEL);
                  }, LABEL_DELAY);
                } else {
                  setSaveButtonLabel(SAVE_LABEL);
                }
              });
            }
          }
        } />
        <Button label={linkButtonLabel} onClick={() => {
          const cardElement = document.querySelector(".card");
          if (cardElement instanceof HTMLElement) {
            // Get start text, message text, and signature text
            const startText = cardElement.querySelector(".card-start")?.textContent ?? "";
            const messageText = cardElement.querySelector(".card-message")?.textContent ?? "";
            const signatureText = cardElement.querySelector(".card-signature")?.textContent ?? "";
            copyLink(cardType, startText, messageText, signatureText);
            setLinkButtonLabel("Link Copied!");
            setTimeout(() => {
              setLinkButtonLabel(LINK_LABEL);
            }, LABEL_DELAY);
          }
        }} />
        {shareMode && (
          <Button label="Make Your Own" onClick={() => {
            navigate("/");
          }} />
        )}
        {!shareMode && (
          <Button label="Share Globally" onClick={() => {
            if (confirm("Are you sure you want to share this letter with the entire world?\n\nIt will be available for anyone to see, so make sure it is appropriate and doesn't contain any personal information!\n\nIf you'd like to send it to a specific person, press cancel and use the 'Copy Link' or 'Save Image' buttons instead!")) {
              const cardElement = document.querySelector(".card");
              if (cardElement instanceof HTMLElement) {
                const startText = cardElement.querySelector(".card-start")?.textContent ?? "";
                const messageText = cardElement.querySelector(".card-message")?.textContent ?? "";
                const signatureText = cardElement.querySelector(".card-signature")?.textContent ?? "";
                if (DEFAULT_START_TEXT === startText && DEFAULT_MESSAGE_TEXT === messageText && DEFAULT_SIGNATURE_TEXT === signatureText) {
                  console.warn("Default text detected, not sharing bottle");
                } else {
                  shareBottle(cardType, startText, messageText, signatureText);
                }
                  navigate("/sent-bottle?" + generateLinkParams(cardType, startText, messageText, signatureText).toString());
              }
            }
          }} />
        )}
      </div>
    </div>
  );
}