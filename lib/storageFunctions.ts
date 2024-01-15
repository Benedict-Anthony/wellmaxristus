function saveToStore() {
  localStorage.setItem("isLogin", JSON.stringify(true));
}

function removeFromStore() {
  localStorage.removeItem("isLogin");
}

function isLogin() {
  "use client";
  const isLogin = JSON.parse(localStorage.getItem("isLogin") as any);
  return isLogin === null ? false : true;
}

export { saveToStore, removeFromStore, isLogin };
