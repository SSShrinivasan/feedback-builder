import React, { useState } from "react";

export default function RightForm({
  step,
  data,
  setData,
  toggleCategory,
  toggleHearAbout,
  toggleReward,
  updateData,
  onNext,
  onBack,
  setCollectionType,
  toggleChannel,
  handlePublish,
}) {
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;

    const updatedOptions = [
      ...data.categories.options,
      trimmed,
    ];

    updateData("categories", {
      ...data.categories,
      options: updatedOptions,
    });

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
              const isSelected =
                data.categories.selected.includes(cat);

              return (
                <div
                  key={cat}
                  className={`category-row ${isSelected ? "selected" : ""
                    }`}
                >
                  <div className="left">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span className="label">{cat}</span>
                  </div>

                  <span
                    className={`tick ${isSelected ? "active" : ""
                      }`}
                  ></span>
                </div>
              );
            })}
          </div>

          <button
            className="add-more"
            onClick={() => setShowInput(true)}
          >
            + Add More
          </button>

          {showInput && (
            <div className="input-row">
              <input
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(e.target.value)
                }
                placeholder="Add option here"
              />
              <button onClick={handleAddCategory}>
                + Add
              </button>
            </div>
          )}

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
          <p className="subtext">
            How did you hear about us?
          </p>

          <div className="option-list">
            {data.hearAbout.options.map((option) => {
              const isSelected =
                data.hearAbout.selected.includes(option);

              return (
                <div
                  key={option}
                  className={`option-row ${isSelected ? "selected" : ""
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleHearAbout(option)}
                  />
                  <span>{option}</span>

                  {isSelected && (
                    <span
                      className={`tick ${isSelected ? "active" : ""
                        }`}
                    ></span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <>
          <h2>
            Now, let's give your customers a reward
            for sharing feedback
          </h2>

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
                setData(prev => ({
                  ...prev,
                  reward: {
                    ...prev.reward,
                    points: Number(e.target.value) || 0
                  }
                }))
              }
            />

            <p className="reward-preview">
              {data.reward.enabled
                ? `${data.reward.points} points will be rewarded`
                : "Reward disabled"}
            </p>
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

          <div
            className={`timing-card ${data.feedbackTiming.type === "immediate" ? "active" : ""
              }`}
          >
            <div className="timing-header">
              <span>Immediately with purchase</span>
              <input
                type="radio"
                checked={data.feedbackTiming.type === "immediate"}
                onChange={() =>
                  setData(prev => ({
                    ...prev,
                    feedbackTiming: {
                      ...prev.feedbackTiming,
                      type: "immediate"
                    }
                  }))
                }
              />
            </div>
          </div>

          <div
            className={`timing-card ${data.feedbackTiming.type === "delayed" ? "active" : ""
              }`}
          >
            <div className="timing-header">
              <span>After a delay</span>
              <input
                type="radio"
                checked={data.feedbackTiming.type === "delayed"}
                onChange={() =>
                  setData(prev => ({
                    ...prev,
                    feedbackTiming: {
                      ...prev.feedbackTiming,
                      type: "delayed"
                    }
                  }))
                }
              />
            </div>
          </div>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>
        </>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <div className="collection-wrapper">
          <h2>Next, let's decide how to collect feedback</h2>
          <div className="collection-card">

            <div className="collection-header-top">
              <div>
                <h3>External Link</h3>
                <p>
                  Capture feedback through a link sent on WhatsApp, SMS or Email
                </p>
              </div>
            </div>

            {/* Your original container moved here */}
            <div className="channel-container">

              {/* WhatsApp */}
              <div
                className={`channel-card ${data.channels.whatsapp ? "active" : ""}`}
                onClick={() => toggleChannel("whatsapp")}
              >
                <div className="collection-header">
                  <div className="channel-left">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                      alt="WhatsApp"
                      className="channel-icon"
                    />
                    <span>WhatsApp</span>
                  </div>

                  <div className="sb-checkbox-container">
                    <input
                      type="checkbox"
                      checked={data.channels.whatsapp}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* SMS */}
              <div
                className={`channel-card ${data.channels.sms ? "active" : ""}`}
                onClick={() => toggleChannel("sms")}
              >
                <div className="collection-header">
                  <div className="channel-left">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                      alt="SMS"
                      className="channel-icon"
                    />
                    <span>SMS</span>
                  </div>

                  <div className="sb-checkbox-container">
                    <input
                      type="checkbox"
                      checked={data.channels.sms}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div
                className={`channel-card ${data.channels.email ? "active" : ""}`}
                onClick={() => toggleChannel("email")}
              >
                <div className="collection-header">
                  <div className="channel-left">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                      alt="Email"
                      className="channel-icon"
                    />
                    <span>Email</span>
                  </div>

                  <div className="sb-checkbox-container">
                    <input
                      type="checkbox"
                      checked={data.channels.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="nav-buttons">
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
          </div>

        </div>

      )}

      {step === 7 && (
        <>
          <h2>Review & Publish</h2>

          <h3>Question:</h3>
          <p>{data.question}</p>

          <h3>Selected Categories:</h3>
          <p>{data.categories.selected.join(", ")}</p>

          <h3>Channels:</h3>
          <p>
            {Object.entries(data.channels)
              .filter(([_, value]) => value)
              .map(([key]) => key)
              .join(", ") || "None"}
          </p>

          <button onClick={handlePublish}>Publish</button>
        </>
      )}
     


    </div>


  );
}
