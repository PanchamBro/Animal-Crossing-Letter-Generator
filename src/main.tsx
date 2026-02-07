import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router";
import Introduction from "./routes/introduction";
import Library from "./routes/library";
import Editor from "./routes/editor";
import FoundBottle, { Bottle } from "./routes/found-bottle";
import SentBottle from "./routes/sent-bottle";
import PrivacyPolicy from "./routes/privacy-policy";
import "./main.css";
import Waves from "./components/Waves/Waves";
import Redirect from "./routes/redirect";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <HashRouter>
    <Waves type="back"/>
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="library" element={<Library />} />
      <Route path="editor" element={<Editor />} />
      <Route path="share" element={<Editor shareMode />} />
      <Route path="found-bottle" element={<FoundBottle />} />
      <Route path="sent-bottle" element={<SentBottle />} />
      <Route path="random-bottle" element={<Bottle />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="community" element={<Redirect to="https://discord.gg/6yxE9prcNc" />} />
    </Routes>
    <Waves type="front"/>
  </HashRouter>
);