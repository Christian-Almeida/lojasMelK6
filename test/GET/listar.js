import http from "k6/http";
import { check, sleep } from "k6";


export const options = {
  vus: 1,
  duration: "5s",
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  const url = "http://localhost:3400/api/items";

  const res = http.get(url);

  check(res, {
    "O código do status é 200": (r) => r.status === 200,
  });

  sleep(1);
}
