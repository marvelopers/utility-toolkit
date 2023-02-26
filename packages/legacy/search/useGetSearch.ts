import React from "react";

const useGetSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");

  const debounceOnChange = debounce(setKeyword, 200);

  const handleChange = (e) => {
    const word = e.target.value.trim();
    setSearchKeyword(word);
    debounceOnChange(word);
  };

  const handleCancel = () => {
    setSearchKeyword("");
    setKeyword("");
  };

  return { searchKeyword, keyword, handleChange, handleCancel };
};

export default useGetSearch;
