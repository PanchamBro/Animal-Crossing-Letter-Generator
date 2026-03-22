import PageTitle from "../components/PageTitle/PageTitle";
import CardSelection from "../components/CardSelection/CardSelection";
import Footer from "../components/Footer/Footer";
import SocialButtons from "../components/SocialButtons/SocialButtons";

export default function Library() {
  return (
    <>
      <PageTitle title="Animal Crossing Letter Selection" />
      <div style={{ paddingTop: "30px" }}>
        <CardSelection />
        <Footer />
        <SocialButtons />
      </div>
    </>
  );
}