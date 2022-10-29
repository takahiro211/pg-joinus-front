import * as React from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

/**
 * スクロール位置を画面最上部に設定する
 * @returns null
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * クッキーからログイン状態を取得
 * @returns boolean ログイン状態
 */
export function GetAuthState() {
  let ret: boolean = false;
  try {
    const [cookies] = useCookies(["XSRF-TOKEN"]);
    const value = cookies["XSRF-TOKEN"];
    if (value == "false" || value === void 0) {
      ret = false;
    } else {
      ret = true;
    }
  } catch (e) {
    ret = false;
  }
  return ret;
}

export function DateFormat(dateTime: Date): string {
  const newDate = new Date(dateTime);
  const year = newDate.getFullYear();
  const month = 1 + newDate.getMonth();
  const month2 = month < 10 ? "0" + month : month;
  const date = newDate.getDate();
  const date2 = date < 10 ? "0" + date : date;
  return `${year}年${month2}月${date2}日`;
}
