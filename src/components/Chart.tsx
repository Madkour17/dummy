import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ResponseData } from "../utils/types";
import { getChartOptions } from "../utils/chart";

const Chart = ({ responseData }: { responseData?: ResponseData }) => {
  const options = getChartOptions({ responseData });
  const noData = responseData && responseData?.Stats_list.length === 0;
  const error = !responseData || responseData.Error_msg;

  return (
    <div className="w-full m-auto">
      {error ? (
        <p className="text-center">{error}</p>
      ) : noData ? (
        <p className="text-center">لا يوجد بيانات</p>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default Chart;
