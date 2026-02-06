import { useState } from "react";
import LeftPreview from "./components/LeftPreview";
import RightForm from "./components/RightForm";

export default function App() {
    const [step, setStep] = useState(1);

  const [data, setData] = useState({
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
    reward:
     {
      enabled: true,
      points: 0,
     },
          feedbackTiming: {
  type: "immediate", // "immediate" | "delayed"
},


  });
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
//down here is using checked instead of selected
  
// const toggleCategory = (category) => {
//   setData(prev => {
//     const selected = prev.categories.selected;

//     return {
//       ...prev,
//       categories: {
//         ...prev.categories,
//         selected:  checked.includes(category)
//           ? checked.filter(c => c !== category) // untick
//           : [...checked, category], // tick
//       },
//     };
//   });
// };
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
  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

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
