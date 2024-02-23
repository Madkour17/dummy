import { SeriesColumnOptions, XAxisOptions } from "highcharts";
import { ResponseData, StatResponse } from "./types";

const defaultChartOptions: Highcharts.Options = {
  chart: {
    type: "column",
    className: "chart",
  },
  title: {
    text: "",
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    column: {
      stacking: "normal",
      dataLabels: {
        enabled: true,
      },
    },
  },
  yAxis: {
    title: {
      text: "",
    },
  },
  noData: {
    style: {
      fontWeight: "bold",
      fontSize: "15px",
      color: "#303030",
    },
  },
};

export const getChartOptions = ({
  responseData,
}: {
  responseData?: ResponseData;
}) => {
  const { Stats_list } = responseData || {};

  const options = { ...defaultChartOptions };

  options.xAxis = getXaxis();
  options.series = getSeries({ Stats_list });

  return options;
};

const getXaxis = (): XAxisOptions => {
  return {
    categories: [
      "قطعة أرض",
      "شقة",
      "معرض/محل",
      "بيت",
      "مرفق",
      "أرض زراعية",
      "إستراحة",
      "عماره",
      "فيلا",
      "مركز تجاري",
      "قصر",
    ],
  };
};

const getSeries = ({ Stats_list }: { Stats_list?: StatResponse[] }) => {
  const commercialData = getFilteredData(Stats_list, "تجاري");
  const residentialData = getFilteredData(Stats_list, "سكني");

  const commercialSeries: SeriesColumnOptions = {
    name: "تجاري",
    type: "column",
    data: commercialData,
    color: "#f9b358",
  };

  const residentialSeries: SeriesColumnOptions = {
    name: "سكني",
    type: "column",
    data: residentialData,
    color: "#2984ca",
  };

  // return [commercialSeries, residentialSeries];
  return [
    ...(commercialData.length > 0 ? [commercialSeries] : []),
    ...(residentialData.length > 0 ? [residentialSeries] : []),
  ];
};

const getFilteredData = (data?: StatResponse[], key?: string) => {
  const filteredData = data
    ?.filter((statItem) => statItem.Dtype === key)
    .map((statItem) => {
      return {
        y: +statItem.Stat,
        category: statItem.Category,
      };
    });

  return filteredData || [];
};
