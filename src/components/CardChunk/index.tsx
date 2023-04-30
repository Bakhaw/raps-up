interface CardChunkProps {
  chunk: string;
  rotate?: boolean;
}

const cardHeight = 250;
const cardWidth = "90vw";
const clipPathPercentage = 30;
// offset is used to join the two cards and hide the gap created with the clip-path form
const offset = (clipPathPercentage * cardHeight) / 100;

const CardChunk: React.FC<CardChunkProps> = ({ chunk, rotate }) => {
  return (
    <div
      style={{
        height: cardHeight,
        width: cardWidth,
        maxWidth: 600,
        marginBottom: -(cardHeight - offset),
        backgroundColor: rotate ? "blue" : "yellow",
        clipPath: `polygon(0 0, 100% 0, 100% ${clipPathPercentage}%, 0% 100%)`,
        ...(rotate && {
          transform: "rotate(180deg)",
        }),
      }}
    >
      <div
        style={{
          filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))",
        }}
      >
        <div
          className="flex items-center px-6 bg-white"
          style={{
            marginTop: cardHeight / 6,
            marginLeft: cardHeight / 6,
            height: 80,
            width: "70%",
            clipPath: "polygon(0 20%, 75% 0%, 100% 55%, 60% 100%, 0% 100%)",
          }}
        >
          <div className="text-xl font-bold capitalize">{chunk}</div>
        </div>
      </div>
    </div>
  );
};

export default CardChunk;
