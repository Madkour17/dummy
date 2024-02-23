import { useState } from "react";
import "./App.scss";
import FilterComponent from "./components/FilterComponent";
import { getChartOptions } from "./utils/chart";
import { getNumberOfDeals } from "./utils/service";
import { ResponseData, State, StatType } from "./utils/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

  const options = getChartOptions({ responseData });
  const noData = responseData && responseData?.Stats_list.length === 0;
  const error = !responseData || responseData.Error_msg;

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
      <div className="w-full m-auto">
        {error ? (
          <p className="text-center">{error}</p>
        ) : noData ? (
          <p className="text-center">لا يوجد بيانات</p>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </div>
    </div>
  );
}

export default App;
