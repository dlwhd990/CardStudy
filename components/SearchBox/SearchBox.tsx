import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { showAlert } from "../../store/alert";
import { useAppDispatch } from "../../store/hooks";
import { closeMobileMenu } from "../../store/popup";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");

  const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput === "") {
      dispatch(showAlert("검색어를 입력해주세요!"));
      return;
    }
    router.push(`/search/${searchInput}`);
    dispatch(closeMobileMenu());
  };
  return (
    <form onSubmit={searchHandler} className={styles.search_box}>
      <input
        value={searchInput}
        onChange={changeSearchInput}
        type="text"
        placeholder="검색"
        autoFocus
      />
      <button>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.search_icon}
        />
      </button>
    </form>
  );
};

export default SearchBox;
