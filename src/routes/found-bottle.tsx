import PageTitle from "../components/PageTitle/PageTitle";
import { DialogueOverlay } from "../components/Dialogue/Dialogue";
import bottlesData from "../bottles.json";
import { generateLinkPage } from "../components/Editor/editorFunctions";
import { CardName } from "../components/Card/cardConstants";

// Create type for Bottle of number time and strings cardName, start, message, signature
export type Bottle = {
  time: number;
  card: string;
  start: string;
  message: string;
  signature: string;
};

function getRandomBottle() {
  // Generate a link to a random bottle message
  const bottles: Bottle[] = bottlesData.bottles ?? [];
  const randomBottle: Bottle = bottles[Math.floor(Math.random() * bottles.length)];
  const linkTo = generateLinkPage(randomBottle.card as CardName, randomBottle.start, randomBottle.message, randomBottle.signature );
  return linkTo;
}

export default function FoundBottle() {
  return (
    <>
      <PageTitle title="Found Message in a Bottle!" />
      <DialogueOverlay
        name="Idrees"
        message="Looks like a message in a bottle washed ashore, shared by a random stranger across the world! Let's open it up!"
        linkTo={getRandomBottle()}
      />
    </>
  );
}