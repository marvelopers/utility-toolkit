import React from "react";
type Params = {
  asset: string;
  type: string;
};
const useGetUrlParams = () => {
  const { pathname, search } = useLocation();
  const params = qs.parse(search, { ingnoreQuePrefix }) as Params;
  return params;
};

export default useGetUrlParams;
