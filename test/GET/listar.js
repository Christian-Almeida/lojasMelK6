import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "k6-results.html": htmlReport(data),
  };
}

export const options = {
  vus: 1,
  duration: "5s",
};

export default function () {
  const url = "http://localhost:3400/api/items";

  const res = http.get(url);

  check(res, {
    "O código do status é": (r) => r.status === 200,
  });

  sleep(1);
}
