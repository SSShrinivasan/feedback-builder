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
    selected: ["Ambience", "Cleanliness"]
    
  },
});

const toggleCategory = (category) => {
  setData(prev => {
    const selected = prev.categories.selected;

    return {
      ...prev,
      categories: {
        ...prev.categories,
        selected:  checked.includes(category)
          ? checked.filter(c => c !== category) // untick
          : [...checked, category], // tick
      },
    };
  });
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
  updateData={updateData}
  onNext={() => setStep(prev => prev + 1)}
  onBack={() => setStep(prev => prev - 1)}
/>






      
    </div>
    
  );
}
