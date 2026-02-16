import PageTitle from "../components/PageTitle/PageTitle";
import { DialogueOverlay } from "../components/Dialogue/Dialogue";
import { useSearchParams } from "react-router";

export default function SentBottle() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <PageTitle title="Sent Message in a Bottle!" />
      <DialogueOverlay
        name="Idrees"
        message="Your bottle has been sent away! Hopefully it will reach someone special across the world!"
        linkTo={"/share?" + searchParams.toString()}
      />
    </>
  );
}