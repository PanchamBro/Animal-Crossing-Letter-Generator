import FloatingButton from "../FloatingButton/FloatingButton";
import "./SocialButtons.css";

export default function SocialButton() {
  return (
    <div className="social-buttons">
      <FloatingButton link="https://bsky.app/profile/acmail.idreesinc.com" icon="Bluesky Icon.png" />
      <FloatingButton link="https://www.tumblr.com/blog/animal-crossing-letters" icon="Tumblr Icon.png" />
      <FloatingButton link="https://www.instagram.com/animalcrossingletters" icon="Instagram Icon.png" />
      <FloatingButton link="https://discord.gg/6yxE9prcNc" icon="Discord Icon.png" />
    </div>
  );
}