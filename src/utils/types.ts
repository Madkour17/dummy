export interface State {
  label: string;
  key: number;
}
export type StatType = "number_of_deals" | "value_of_deals";
export type Calendar = "hijri" | "gregorian";

export type StatResponse = {
  Stat: number;
  Category: string;
  Dtype: "تجاري" | "سكني";
};
export type ResponseData = {
  Error_code: number;
  Error_msg: string;
  Stats_list: StatResponse[];
};
