import { BASE_END_POINT, KEY } from "./constants";
import { ResponseData, State, StatType } from "./types";

interface GetNumberOfDealsArgs {
  statType: StatType;
  date: string;
  state: State;
}

export const getNumberOfDeals = async ({
  statType,
  date,
  state,
}: GetNumberOfDealsArgs): Promise<ResponseData> => {
  const response = await fetch(`${BASE_END_POINT}/stats/`, {
    method: "POST",
    body: JSON.stringify({
      key: KEY,
      stat_type: statType,
      end_date: date,
      start_date: date,
      ...(state.label === "all" ? null : { state: state.key }),
    }),
  })
    .then((response) => response.json())
    .then((data: ResponseData) => {
      return data;
    });

  return response;
};
