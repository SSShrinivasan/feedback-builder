export default function RightForm({
  step,
  data,
  toggleCategory,
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
            onChange={(e) =>
              updateData("question", e.target.value)
            }
          />

          <label>Positive rating follow-up</label>
          <input
            value={data.positiveText}
            onChange={(e) =>
              updateData("positiveText", e.target.value)
            }
          />

          <label>Negative rating follow-up</label>
          <input
            value={data.negativeText}
            onChange={(e) =>
              updateData("negativeText", e.target.value)
            }
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
              const isSelected =
                data.categories.options.includes(cat);

              return (
                <div
                  key={cat}
                  className={`category-row ${
                    isSelected ? "selected" : ""
                  }`}
                  
                >
                  <div className="left">
                    <input type="checkbox"  onClick={() => toggleCategory(cat)}/>
                    <span className="label">{cat}</span>
                  </div>

                  <span
                    className={`tick ${
                      isSelected ? "active" : ""
                    }`}
                  >
                    ✓
                  </span>
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
    </div>
  );
}
