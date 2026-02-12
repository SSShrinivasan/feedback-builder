
import React, { useState, useEffect } from "react";

import LeftPreview from "./components/LeftPreview";
import RightForm from "./components/RightForm";

export default function App() {
    const [step, setStep] = useState(1);

  const [data, setData] = useState(() => {
  const saved = localStorage.getItem("feedbackData");

  return saved
    ? JSON.parse(saved)
    : {
        question: "How was your experience?",
        positiveText: "Glad to hear that. What did you like?",
        negativeText: "Sorry to hear. Tell us what went wrong?",
        rating: null,

        categories: {
          options: [
            "Ambience",
            "Cleanliness",
            "Value for money",
            "Food",
            "Service",
          ],
          selected: ["Ambience", "Cleanliness"],
        },

        hearAbout: {
          enabled: true,
          options: [
            "Zomato / Swiggy",
            "Social Media",
            "Friends & Family",
            "Walking by",
            "Newspaper",
          ],
          selected: ["Zomato / Swiggy", "Social Media"],
        },

        reward: {
          enabled: true,
          points: 0,
        },

        feedbackTiming: {
          type: "immediate",
        },

        channels: {
          whatsapp: false,
          sms: false,
          email: false,
        },
      };
});
//useEffect to saave data to local storage when it changes
useEffect(() => {
  localStorage.setItem("feedbackData", JSON.stringify(data));
}, [data]);
//removee after testin
localStorage.removeItem("feedbackData");

  //page 2 toggle setup
  const toggleCategory = (category) => {
  setData((prev) => {
    const selected = prev.categories.selected;

    return {
      ...prev,
      categories: {
        ...prev.categories,
        selected: selected.includes(category)
          ? selected.filter((c) => c !== category)
          : [...selected, category],
      },
    };
  });
};

///page 3 toggle setup
const toggleHearAbout = (option) => {
  setData((prev) => {
    const selected = prev.hearAbout.selected;

    return {
      ...prev,
      hearAbout: {
        ...prev.hearAbout,
        selected: selected.includes(option)
          ? selected.filter((o) => o !== option)
          : [...selected, option],
      },
    };
  });
};
//page 4 toggle setup

const toggleReward = () => {
  setData((prev) => ({
    ...prev,
    reward: {
      ...prev.reward,
      enabled: !prev.reward.enabled,
    },
  }));
};

const updateRewardPoints = (value) => {
  setData((prev) => ({
    ...prev,
    reward: {
      ...prev.reward,
      points: value,
    },
  }));
};
//page 1 update data
const updateData = (key, value) => {
  setData((prev) => ({
    ...prev,
    [key]: value
  }));
};
//last page


  return (
    <div className="layout">
      <LeftPreview data={data} updateData={updateData} />

<RightForm
  step={step}
  data={data}
  setData={setData}
  updateData={updateData}
  toggleCategory={toggleCategory}
  toggleHearAbout={toggleHearAbout}
  toggleReward={toggleReward}
  updateRewardPoints={updateRewardPoints}
  onNext={() => setStep((p) => p + 1)}
  onBack={() => setStep((p) => p - 1)}
/>
    </div>
    
  );
}
