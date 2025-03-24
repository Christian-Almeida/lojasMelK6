import http from 'k6/http';
import { check, sleep } from 'k6';

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

//Report
export function handleSummary(data) {
	const caminhoArquivo = './GET/stress-reporter.html';
	return {
		stdout: textSummary(data, { indent: ' ', enableColors: true }),
		[caminhoArquivo]: htmlReport(data),
	};
}

export const options = {
  stages: [
    { duration: '5m', target: 200 }, // Rampa sobe e fica 10min com 200 users
    { duration: '10m', target: 200 }, // Fica 30min com 200 users
    { duration: '2m', target: 0 }, // fica 5min sem nada, como se tivesse caido
  ],
};

export default () => {
  const url = http.get("http://localhost:3400/api/items");

  check(url, {
    "O código do status é 200": (r) => r.status === 200,
  })
  sleep(1);
};