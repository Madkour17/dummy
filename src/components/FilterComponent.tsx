import { useState } from "react";
import { State } from "../utils/types";
import { states } from "../utils/constants";

interface FilterComponentProps {
  getData: (args: any) => void;
}
const FilterComponent = ({ getData }: FilterComponentProps) => {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleApply = () =>
    getData({
      statType: "number_of_deals",
      date: selectedDate,
      state: selectedState!,
    });

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md ">
      <label htmlFor="city" className="text-right text-blue-500">
        :المنطقة
      </label>
      <select
        id="city"
        className="border p-2"
        defaultValue={""}
        onChange={(e) => {
          if (e.target.value === "") {
            setSelectedState({
              key: 0,
              label: "all",
            });
            return;
          }

          setSelectedState(states[Number(e.target.value)]);
        }}
      >
        <option value="" disabled>
          اختر مدينة
        </option>
        <option value={""} key={""}>
          الكل
        </option>
        {states.map((state) => (
          <option value={state.key} key={state.key}>
            {state.label}
          </option>
        ))}
      </select>

      <label htmlFor="date" className="text-right text-blue-500">
        :الفترة الزمنية
      </label>
      <input
        type="date"
        id="date"
        className="border p-2"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />

      <button
        onClick={handleApply}
        className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
        disabled={!selectedDate || !selectedState}
      >
        تطبيق
      </button>
    </div>
  );
};

export default FilterComponent;
