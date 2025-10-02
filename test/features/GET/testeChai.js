import http from "k6/http";
import { sleep } from "k6";
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

export const options = {
  vus: 100,
  iterations: 200,
  duration: "30s",
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(100)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {

  describe('Status 200', () => {

    const url = "http://localhost:3400/api/items";

    const res = http.get(url);

    expect(res.status, 'O status retornado pela API está correto!').to.equal(200)

    sleep(1);

  })
}