/* eslint-disable import/prefer-default-export */
export const httpRequest = async (url, method = "GET", data) => {
  const token = localStorage.getItem("user") || "";
  const body = data ? JSON.stringify(data) : null;
  const headers = { "Content-Type": "application/json", "x-access-token": token };
  const res = await fetch(url, { method, headers, body });
  return res;
};
