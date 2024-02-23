import { useState } from "react";
import FilterComponent from "./components/FilterComponent";
import { getNumberOfDeals } from "./utils/service";
import { ResponseData, State, StatType } from "./utils/types";
import Chart from "./components/Chart";

interface GetDataProps {
  statType: StatType;
  date: string;
  state: State;
}

function App() {
  const [responseData, setResponseData] = useState<ResponseData>();
  const [showFilter, setShowFilter] = useState<Boolean>(false);

  const getData = async ({ statType, date, state }: GetDataProps) => {
    const response = await getNumberOfDeals({
      statType,
      state,
      date,
    });

    setResponseData(response);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-end p-8">
      <div className="w-full flex flex-col items-end">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400 w-fit mb-4"
        >
          تصفية النتائج
        </button>
        {showFilter ? <FilterComponent getData={getData} /> : null}
      </div>
      <Chart responseData={responseData} />
    </div>
  );
}

export default App;
