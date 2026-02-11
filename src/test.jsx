export default function RightForm({
  step,
  data,
  toggleCategory,
  toggleHearAbout,
  toggleReward,
  updateData,
  onNext,
  onBack,
}){
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const handleAddCategory = () => {
  const trimmed = newCategory.trim();
  if (!trimmed) return;

  const updatedOptions = [
    ...data.categories.options,
    trimmed
  ];

  updateData("categories.options", updatedOptions);

  setNewCategory("");
  setShowInput(false);
};


  return (
    <div className="right">
      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h2>Let's get some basics about your feedback</h2>

          <label>Feedback Question</label>
          <input
            value={data.question}
            onChange={(e) => updateData("question", e.target.value)}
          />

          <label>Positive rating follow-up</label>
          <input
            value={data.positiveText}
            onChange={(e) => updateData("positiveText", e.target.value)}
          />

          <label>Negative rating follow-up</label>
          <input
            value={data.negativeText}
            onChange={(e) => updateData("negativeText", e.target.value)}
          />

          <button onClick={onNext}>Next</button>
        </>
      )}
      

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2>Choose the categories for feedback rating</h2>
          <p className="subtext">
            After your customer gives their rating, they will be asked to choose
            the reason from these categories.
          </p>

          <div className="category-list">
            {data.categories.options.map((cat) => {
              const isSelected = data.categories.selected.includes(cat);

              return (
                <div
                  key={cat}
                  className={`category-row ${isSelected ? "selected" : ""}`}
                >
                  <div className="left">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="label">{cat}</span>
                  </div>

                  <span className={`tick ${isSelected ? "active" : ""}`}></span>
                </div>
              );
            })}
          </div>

          <button className="add-more" onClick={() => {handleAddCategory}}>
            + Add More
          </button>
          

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h2>Ask your customers</h2>
          <p className="subtext">How did you hear about us?</p>

          <div className="option-list">
            {data.hearAbout.options.map((option) => {
              const isSelected = data.hearAbout.selected.includes(option);

              return (
                <div
                  key={option}
                  className={`option-row ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleHearAbout(option)}
                >
                  <span>{option}</span>
                  {isSelected && <span className="check">✓</span>}
                </div>
              );
            })}
          </div>
          <button className="add-more" onClick={() => {/* implement add option */}}>
            + Add More
          </button>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <>
          <h2>Now, let's give your customers a reward for sharing feedback</h2>

          <div className="reward-card">
            <div className="reward-header">
              <span>Feedback Reward</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={data.reward.enabled}
                  onChange={toggleReward}
                />
                <span className="slider"></span>
              </label>
            </div>

            <input
              type="number"
              value={data.reward.points}
              disabled={!data.reward.enabled}
              onChange={(e) =>
                updateData("reward.points", Number(e.target.value) || 0)
              }
            />

            <p className="reward-preview">
              {data.reward.enabled
                ? `${data.reward.points} points will be rewarded`
                : "Reward disabled"}
            </p>

            {!data.reward.enabled && (
              <div className="reward-info">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                  alt="reward"
                  width="20"
                />
                <span>
                  You need to activate loyalty to give bonus points reward for
                  feedback
                </span>
              </div>
            )}
          </div>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <>
          <h2>Decide when you want to ask for feedback</h2>

          <p className="subtext">
            Customers can give feedback for up to <strong>5 days</strong> after
            the feedback communication.
          </p>

          {/* IMMEDIATE */}
          <div
            className={`timing-card ${
              data.feedbackTiming.type === "immediate" ? "active" : ""
            }`}
          >
            <div className="timing-header">
              <span>Immediately with purchase</span>
              <input
                type="radio"
                checked={data.feedbackTiming.type === "immediate"}
                onChange={() => updateData("feedbackTiming.type", "immediate")}
              />
            </div>

            <div className="timing-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                alt="receipt"
                width="22"
              />
              <span>
                Select this if customers have experienced your product or
                service by the time they pay.
              </span>
            </div>
          </div>

          {/* DELAYED */}
          <div
            className={`timing-card ${
              data.feedbackTiming.type === "delayed" ? "active" : ""
            }`}
          >
            <div className="timing-header">
              <span>After a delay</span>
              <input
                type="radio"
                checked={data.feedbackTiming.type === "delayed"}
                onChange={() => updateData("feedbackTiming.type", "delayed")}
              />
            </div>

            <div className="timing-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
                alt="delay"
                width="22"
              />
              <span>
                Select this if customers pay first and experience your product
                or service later.
              </span>
            </div>
          </div>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
