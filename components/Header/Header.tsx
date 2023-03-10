import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCube,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UserBox from "../UserBox/UserBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeMobileMenu,
  changeObjectionPreview,
  changeUserBoxState,
  closeObjectionPreview,
  closeUserBox,
} from "../../store/popup";
import ObjectionPreview from "../ObjectionPreview/ObjectionPreview";
import React, { useEffect, useState } from "react";
import Objection from "../../model/objection";
import NumberBadge from "../NumberBadge/NumberBadge";
import { useRouter } from "next/router";
import { showAlert } from "../../store/alert";

const Header = () => {
  const [showSearchInput, setShowSearchInput] = useState(false); // 다른 곳에서 이것을 조작할 필요가 없기 떄문에 useState로 사용
  const [searchInput, setSearchInput] = useState("");
  const [newObjectionCount, setNewObjectionCount] = useState(0);
  const showUserBox = useAppSelector((state) => state.popup.userBox);
  const userObjectionList = useAppSelector((state) => state.userObjection.list);
  const showObjectionPreview = useAppSelector(
    (state) => state.popup.objectionPreview
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const changeShowSearchInput = () => {
    setShowSearchInput((state) => !state);
  };

  const changeShowUserBox = () => {
    if (showObjectionPreview) {
      dispatch(closeObjectionPreview());
    }
    dispatch(changeUserBoxState());
  };

  const changeShowObjectionPreview = () => {
    if (showUserBox) {
      dispatch(closeUserBox());
    }
    dispatch(changeObjectionPreview());
  };

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput === "") {
      dispatch(showAlert("검색어를 입력해주세요!"));
      return;
    }
    router.push(`/search/${searchInput}?page=1`);
    setSearchInput("");
  };

  const searchIconSelector = () => {
    if (showSearchInput) return faXmark;
    return faMagnifyingGlass;
  };

  const onToggleClickHandler = () => {
    dispatch(changeMobileMenu());
  };

  useEffect(() => {
    if (!userObjectionList) return;
    const newObjectionList = userObjectionList.filter(
      (objection: Objection) => !objection.read
    );
    setNewObjectionCount(newObjectionList.length);
  }, [userObjectionList]);

  return (
    <header className={styles.header}>
      <FontAwesomeIcon
        icon={faBars}
        className={styles.toggle_button}
        onClick={onToggleClickHandler}
      />
      <div className={styles.header_body}>
        <Link href="/" className={styles.logo}>
          <FontAwesomeIcon icon={faCube} className={styles.logo_icon} />
          <h1>카드스터디</h1>
        </Link>
        <div className={styles.header_main}>
          <div className={styles.left}>
            <nav className={styles.navbar}>
              <ul>
                <li>
                  <Link href="/study?page=1" className={styles.link}>
                    공부하기
                  </Link>
                </li>
                <li>
                  <Link href="/mystudy?page=1" className={styles.link}>
                    나의공부
                  </Link>
                </li>
                {/* <li>
              <Link href="/study" className={styles.link}>
                문의하기
              </Link>
            </li> */}
              </ul>
            </nav>
          </div>
          <div className={styles.right}>
            <div className={styles.search_container}>
              <form onSubmit={searchHandler}>
                <input
                  value={searchInput}
                  onChange={changeSearchInput}
                  type="text"
                  placeholder="검색"
                  className={`${styles.search_input} ${
                    showSearchInput
                      ? `${styles.search_input_on}`
                      : `${styles.search_input_off}`
                  }`}
                  autoFocus
                />
              </form>
              <div
                className={`${styles.search_icon_container} ${
                  showSearchInput
                    ? `${styles.search_icon_container_on}`
                    : `${styles.search_icon_container_off}`
                }`}
              >
                <FontAwesomeIcon
                  icon={searchIconSelector()}
                  className={`${styles.header_icon} ${
                    showSearchInput
                      ? `${styles.close_icon}`
                      : `${styles.search_icon}`
                  }`}
                  onClick={changeShowSearchInput}
                />
              </div>
            </div>
            <div className={styles.user_container}>
              <FontAwesomeIcon
                icon={faUser}
                className={styles.header_icon}
                onClick={changeShowUserBox}
              />
              {showUserBox && <UserBox />}
            </div>
            <div className={styles.objection_container}>
              <FontAwesomeIcon
                icon={faBell}
                className={styles.header_icon}
                onClick={changeShowObjectionPreview}
              />
              {newObjectionCount > 0 && (
                <div className={styles.badge_container}>
                  <NumberBadge num={newObjectionCount} />
                </div>
              )}
              {showObjectionPreview && <ObjectionPreview />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
