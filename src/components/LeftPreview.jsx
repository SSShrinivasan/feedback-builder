const RATINGS = [
  {
    label: "Poor",
    img: "https://twemoji.maxcdn.com/v/latest/72x72/1f62d.png",
  },
  {
    label: "Bad",
    img: "https://twemoji.maxcdn.com/v/latest/72x72/1f61f.png",
  },
  {
    label: "Okay",
    img: "https://twemoji.maxcdn.com/v/latest/72x72/1f610.png",
  },
  {
    label: "Good",
    img: "https://twemoji.maxcdn.com/v/latest/72x72/1f60a.png",
  },
  {
    label: "Great",
    img: "https://twemoji.maxcdn.com/v/latest/72x72/1f60d.png",
  },
];

export default function LeftPreview({ data, updateData }) {
  const isValidRating =
    typeof data.rating === "number" &&
    data.rating >= 0 &&
    data.rating < RATINGS.length;

  return (
    <div className="left">
      <div className="card">
        <h3>Hello name  your feedback is important to us!</h3>

        <p>{data.question}</p>

        <div className="rating-row">
          {RATINGS.map((r, index) => (
            <img
              key={index}
              src={r.img}
              alt={r.label}
              className={`rating-img ${
                data.rating === index ? "active" : ""
              }`}
              onClick={() => updateData("rating", index)}
            />
          ))}
        </div>

        {isValidRating && (
          <p className="rating-text">{RATINGS[data.rating].label}</p>
        )}
      </div>
    </div>
  );
}
