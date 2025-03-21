import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//Report
export function handleSummary(data) {
  return {
    "GET-k6-spike.html": htmlReport(data),
  };
}

//Opções
export const options = {
  stages: [
    { duration: '30s', target: 2000 },
    { duration: '10s', target: 0 },
  ],
};

//Teste de Pico
export default () => {
  const url = http.get("http://localhost:3400/api/items");

  check(url, {
    "O código do status é 200": (r) => r.status === 200,
  })
  sleep(1);

};