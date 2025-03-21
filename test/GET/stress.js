import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//Report
export function handleSummary(data) {
  return {
    "GET-k6-stress.html": htmlReport(data),
  };
}

export const options = {
  stages: [
    { duration: '10m', target: 200 }, // Rampa sobe e fica 10min com 200 users
    { duration: '30m', target: 200 }, // Fica 30min com 200 users
    { duration: '5m', target: 0 }, // fica 5min sem nada, como se tivesse caido
  ],
};

export default () => {
  const url = http.get("http://localhost:3400/api/items");

  check(url, {
    "O código do status é 200": (r) => r.status === 200,
  })
  sleep(1);
};