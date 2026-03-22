import "./FloatingButton.css";

export default function FloatingButton({ link, icon }: { link: string, icon: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="floating-button" style={{ backgroundImage: `url(${new URL(`./icons/${icon}`, import.meta.url).href})` }}></a>
  );
}