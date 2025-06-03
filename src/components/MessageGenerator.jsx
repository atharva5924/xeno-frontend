import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const MessageGenerator = ({ onSelect }) => {
  const [objective, setObjective] = useState("");
  const [variants, setVariants] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const { mutate: generateMessages } = useMutation({
    mutationFn: (objective) =>
      axios.post("http://localhost:3000/api/ai/generate-messages", {
        objective,
      }),
    onMutate: () => {
      setIsPending(true);
      setVariants([]);
    },
    onSuccess: (data) => {
      setVariants(data.data);
    },
    onError: (error) => {
      console.error("Error generating messages:", error);
      alert("Failed to generate messages");
    },
    onSettled: () => {
      setIsPending(false);
    },
  });

  const handleGenerate = () => {
    if (!objective.trim()) return;
    generateMessages(objective);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="Enter campaign objective (e.g., 'bring back inactive users')"
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleGenerate}
          disabled={isPending}
          className="px-4 py-2 bg-purple-500 text-white rounded-r hover:bg-purple-600 disabled:bg-purple-300"
        >
          {isPending ? "Generating..." : "Suggest Messages"}
        </button>
      </div>

      {variants.length > 0 && (
        <div className="mt-2 space-y-2">
          <h4 className="text-sm font-medium">Suggested Messages:</h4>
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => onSelect(variant)}
              className="p-2 border rounded cursor-pointer hover:bg-gray-50"
            >
              {variant}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;
