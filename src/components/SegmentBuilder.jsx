import { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import axios from "axios";

const RuleBlock = ({ rule, index, onUpdate, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RULE",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 border rounded-lg bg-white ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <select
          value={rule.field}
          onChange={(e) => onUpdate(index, { ...rule, field: e.target.value })}
          className="mr-2 p-1 border rounded"
        >
          <option value="totalSpent">Total Spent</option>
          <option value="totalOrders">Total Orders</option>
          <option value="lastPurchaseDate">Last Purchase Date</option>
        </select>

        <select
          value={rule.operator}
          onChange={(e) =>
            onUpdate(index, { ...rule, operator: e.target.value })
          }
          className="mr-2 p-1 border rounded"
        >
          <option value="equals">Equals</option>
          <option value="notEquals">Not Equals</option>
          <option value="greaterThan">Greater Than</option>
          <option value="lessThan">Less Than</option>
          <option value="inLast">In Last (days)</option>
          <option value="notInLast">Not In Last (days)</option>
        </select>

        <input
          type={
            ["inLast", "notInLast"].includes(rule.operator) ? "number" : "text"
          }
          value={rule.value}
          onChange={(e) => onUpdate(index, { ...rule, value: e.target.value })}
          className="mr-2 p-1 border rounded"
        />

        <button onClick={() => onRemove(index)} className="text-red-500">
          Remove
        </button>
      </div>
    </div>
  );
};

const ConditionDropArea = ({
  condition = "AND",
  rules = [],
  onDrop = () => {},
  onUpdateGroup = () => {},
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "RULE",
    drop: (item) => onDrop(item.index, condition),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 mb-4 border-2 rounded-lg ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <div className="flex items-center mb-2">
        <span className="font-semibold mr-2">Condition:</span>
        <select
          value={condition}
          onChange={(e) => onUpdateGroup(e.target.value)}
          className="p-1 border rounded"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {rules.map((rule, index) => (
        <RuleBlock
          key={index}
          rule={rule}
          index={index}
          onUpdate={(idx, updatedRule) => {
            const updatedRules = [...rules];
            updatedRules[idx] = updatedRule;
            onUpdateGroup(condition, updatedRules);
          }}
          onRemove={(idx) => {
            const updatedRules = [...rules];
            updatedRules.splice(idx, 1);
            onUpdateGroup(condition, updatedRules);
          }}
        />
      ))}

      <button
        onClick={() =>
          onUpdateGroup(condition, [
            ...rules,
            { field: "totalSpent", operator: "greaterThan", value: 0 },
          ])
        }
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Rule
      </button>
    </div>
  );
};

const SegmentBuilder = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ruleGroups, setRuleGroups] = useState([
    { condition: "AND", rules: [] },
  ]);
  const [nlpInput, setNlpInput] = useState("");
  const [isGeneratingRules, setIsGeneratingRules] = useState(false);
  const [error, setError] = useState(null);

  const handleDrop = (fromIndex, toCondition) => {
    const fromGroupIndex = ruleGroups.findIndex((group) =>
      group.rules.some((_, idx) => idx === fromIndex)
    );

    if (fromGroupIndex === -1) return;

    const fromGroup = ruleGroups[fromGroupIndex];
    const movedRule = fromGroup.rules[fromIndex];

    const updatedFromGroup = {
      ...fromGroup,
      rules: fromGroup.rules.filter((_, idx) => idx !== fromIndex),
    };

    const toGroupIndex = ruleGroups.findIndex(
      (group) => group.condition === toCondition
    );
    const updatedToGroup = {
      ...ruleGroups[toGroupIndex],
      rules: [...ruleGroups[toGroupIndex].rules, movedRule],
    };

    const newRuleGroups = [...ruleGroups];
    newRuleGroups[fromGroupIndex] = updatedFromGroup;
    newRuleGroups[toGroupIndex] = updatedToGroup;
    setRuleGroups(newRuleGroups);
  };

  const handleUpdateGroup = (groupIndex, condition, rules) => {
    const newRuleGroups = [...ruleGroups];
    newRuleGroups[groupIndex] = { condition, rules };
    setRuleGroups(newRuleGroups);
  };

  const addGroup = () => {
    setRuleGroups([...ruleGroups, { condition: "AND", rules: [] }]);
  };

  const removeGroup = (index) => {
    if (ruleGroups.length <= 1) return;
    setRuleGroups(ruleGroups.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({ name, description, rules: ruleGroups });
    } catch (error) {
      console.error("Error saving segment:", error);
      setError("Failed to save segment. Please try again.");
    }
  };

  const   handleGenerateRules = async () => {
    if (!nlpInput.trim()) return;

    setIsGeneratingRules(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ai/generate-rules",
        {
          description: nlpInput,
        }
      );
      const validatedRules = Array.isArray(response.data)
        ? response.data.map((group) => ({
            condition: ["AND", "OR"].includes(group.condition)
              ? group.condition
              : "AND",
            rules: Array.isArray(group.rules) ? group.rules : [],
          }))
        : [{ condition: "AND", rules: [] }];
      setRuleGroups(validatedRules);
      const hasRules = validatedRules.some((group) => group.rules.length > 0);
      if (!hasRules) {
        setError(
          "No rules could be generated. Please try a more specific description."
        );
      }
    } catch (error) {
      console.error("Error generating rules:", error);
      setError("Failed to generate rules. Please try again.");
    } finally {
      setIsGeneratingRules(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create Customer Segment</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Segment Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Natural Language to Rules
        </h3>
        <div className="flex">
          <input
            type="text"
            value={nlpInput}
            onChange={(e) => setNlpInput(e.target.value)}
            placeholder="e.g., People who spent over ₹5000 in last 30 days"
            className="flex-1 p-2 border rounded-l"
          />
          <button
            onClick={handleGenerateRules}
            disabled={isGeneratingRules}
            className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isGeneratingRules ? "Generating..." : "Generate Rules"}
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Segment Rules</h3>

      {ruleGroups.map((group, groupIndex) => (
        <ConditionDropArea
          key={groupIndex}
          condition={group.condition}
          rules={group.rules}
          onDrop={(index, condition) => handleDrop(index, condition)}
          onUpdateGroup={(condition, rules) =>
            handleUpdateGroup(groupIndex, condition, rules)
          }
        />
      ))}

      <div className="flex space-x-2 mt-4">
        <button
          onClick={addGroup}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Add Condition Group
        </button>

        {ruleGroups.length > 1 && (
          <button
            onClick={() => removeGroup(ruleGroups.length - 1)}
            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Remove Last Group
          </button>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Segment
        </button>
      </div>
    </div>
  );
};

export default SegmentBuilder;
