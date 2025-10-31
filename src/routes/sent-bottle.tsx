import PageTitle from "../components/PageTitle/PageTitle";
import { DialogueOverlay } from "../components/Dialogue/Dialogue";

export default function SentBottle() {
  return (
    <>
      <PageTitle title="Sent Message in a Bottle!" />
      <DialogueOverlay
        name="Idrees"
        message="Your bottle has been sent away! Hopefully it will reach someone special across the world!"
        linkTo={"/library"}
      />
    </>
  );
}