// https://www.devkkiri.com/post/56578a18-d1fc-4c67-a2c4-6d64e21cf70c 블로그 참고하여 작성
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
