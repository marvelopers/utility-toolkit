import React from "react";

const enum CategoryType {
  Redux = "redux",
  TanStackQuery = "tanStackQuery",
  Recoil = "recoil",
}

const enum ClassifyKey {
  React = "react",
  Asynchronous = "asynchronous",
  Predictable = "predictable",
}

const init = {
  [CategoryType.Redux]: [],
  [CategoryType.TanStackQuery]: [],
  [CategoryType.Recoil]: [],
};

const useClassifyCategory = (
  initData: { value: string; keyword: string; concept: string }[]
) => {
  const [data, setData] = useState<{
    [key in CategoryType]: {
      value: string;
      keyword: string;
      concept: string;
    }[];
  }>(init);

  const classify = useCallback(() => {
    initData.forEach((data) => {
      const type = ClassifyKey[data.keyword];
      setData((prev) => ({
        ...prev,
        [type]: [...prev[type], data],
      }));
    });
  }, [initData]);

  useEffect(() => {
    setData(init);
    if (initData.length > 0) {
      classify();
    }
  });
};

export default useClassifyCategory;
