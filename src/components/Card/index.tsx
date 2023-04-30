import CardChunk from "../CardChunk";

export interface CardProps {
  chunks: string[];
}

const Card: React.FC<CardProps> = ({ chunks }) => {
  // chunkTop: yellow side
  // chunkBottom: blue side
  const [chunkTop, chunkBottom] = chunks;

  return (
    <>
      <div className="flex flex-col">
        <CardChunk chunk={chunkTop} />
        <CardChunk chunk={chunkBottom} rotate />
      </div>
    </>
  );
};

export default Card;
