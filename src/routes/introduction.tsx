import PageTitle from "../components/PageTitle/PageTitle";
import { DialogueOverlay } from "../components/Dialogue/Dialogue";

export default function Introduction() {
  return (
    <>
      <PageTitle title="Animal Crossing Letter Generator" />
      <DialogueOverlay
        name="Tom Nook"
        message="Welcome to the stationery station, for all of your letter writing needs! Pick a letter template to get started."
        linkTo="/library"
      />
    </>
  );
}
