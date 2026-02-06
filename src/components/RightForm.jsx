export default function RightForm({
  step,
  data,
  toggleCategory,
  toggleHearAbout,
  toggleReward,
  updateData,
  onNext,
  onBack,
}) {
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

          <button className="add-more">+ Add More</button>

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
          <button className="add-more">+ Add More</button>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}

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
            onChange={() =>
              setData((prev) => ({
                ...prev,
                reward: {
                  ...prev.reward,
                  enabled: !prev.reward.enabled,
                },
              }))
            }
          />
          <span className="slider"></span>
        </label>
        
      </div>
      
      <input
        type="number"
        value={data.reward.points}
         disabled={!data.reward.enabled} //value not updating when disabled and enabled again
        onChange={(e) => {
          const value = e.target.value;
          setData((prev) => ({
            ...prev,
            reward: {
              ...prev.reward,
              points: value === "" ? "" : Number(value),
            },
          }));
        }}
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
            You need to activate loyalty to give bonus points reward for feedback
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
    </div>
  );
}




