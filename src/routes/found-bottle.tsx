import PageTitle from "../components/PageTitle/PageTitle";
import { DialogueOverlay } from "../components/Dialogue/Dialogue";
import bottlesData from "../bottles.json";
import { generateLinkPage } from "../components/Editor/editorFunctions";
import { CardName } from "../components/Card/cardConstants";
import { Navigate, useSearchParams } from "react-router";

// Create type for Bottle of number time and strings cardName, start, message, signature
export type Bottle = {
  time: number;
  card: string;
  start: string;
  message: string;
  signature: string;
};

function getBottleLink(index: number) {
  const bottles: Bottle[] = bottlesData.bottles;
  const bottle = bottles[index % bottles.length];
  return generateLinkPage(bottle.card as CardName, bottle.start, bottle.message, bottle.signature);
}

function getRandomBottleLink() {
  const index = Math.floor(Math.random() * bottlesData.bottles.length);
  return getBottleLink(index);
}


export function Bottle() {
  const [searchParams] = useSearchParams();
  const indexParam = searchParams.get("index");
  if (indexParam) {
    const index = parseInt(indexParam, 10);
    if (!isNaN(index)) {
      // Specific bottle
      return <Navigate to={getBottleLink(index)} replace />;
    }
  }
  // Random bottle
  return <Navigate to={getRandomBottleLink()} replace />;
}

export default function FoundBottle() {
  return (
    <>
      <PageTitle title="Found Message in a Bottle!" />
      <DialogueOverlay
        name="Idrees"
        message="Looks like a message in a bottle washed ashore, shared by a random stranger across the world! Let's open it up!"
        linkTo={getRandomBottleLink()}
      />
    </>
  );
}