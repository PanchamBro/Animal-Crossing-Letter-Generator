import "./Footer.css";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text" style={{ textAlign: "left" }}>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      <div className="footer-text footer-center">
        <a
          href="https://discord.gg/6yxE9prcNc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Idrees
        </a>
        <br/>
        <p>Follow along on <a href="https://bsky.app/profile/acmail.idreesinc.com" target="_blank">Bluesky</a> and <a href="https://www.tumblr.com/blog/animal-crossing-letters" target="_blank">Tumblr</a></p>
      </div>
      <div className="footer-text" style={{ textAlign: "right" }}>
        Animal Crossing, characters, and images are property of Nintendo.
        <br />
        This fan project is not affiliated with or endorsed by Nintendo.
      </div>
    </footer>
  );
}