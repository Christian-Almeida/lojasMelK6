import http from "k6/http";
import { check, sleep } from "k6";


export const options = {
  vus: 1,
  duration: "5s",
};

export default function () {
  const url = "http://localhost:3400/api/items";

  const res = http.get(url);

  check(res, {
    "O código do status é 200": (r) => r.status === 200,
  });

  sleep(1);
}
