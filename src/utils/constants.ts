import { State } from "./types";

export const states: State[] = [
  { label: "الرياض", key: 0 },
  { label: "مكة المكرمة", key: 1 },
  { label: "المدينة المنورة", key: 2 },
  { label: "القصيم", key: 3 },
  { label: "الشرقية", key: 4 },
  { label: "عسير", key: 5 },
  { label: "تبوك", key: 6 },
  { label: "حائل", key: 7 },
  { label: "الحدود الشمالية", key: 8 },
  { label: "جازان", key: 9 },
  { label: "نجران", key: 10 },
  { label: "الباحة", key: 11 },
  { label: "الجوف", key: 12 },
];

export const BASE_END_POINT = "https://api.aqarsas.sa";

// should be hidden for example in environment variable
export const KEY = "aqarsas_frontend";
