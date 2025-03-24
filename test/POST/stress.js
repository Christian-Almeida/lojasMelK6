import http, { post } from "k6/http";
import { check, sleep } from "k6";
import uuid from "../libs/uuid.js";

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

//Report
export function handleSummary(data) {
	const caminhoArquivo = './POST/stress-reporter.html';
	return {
		stdout: textSummary(data, { indent: ' ', enableColors: true }),
		[caminhoArquivo]: htmlReport(data),
	};
}

export const options = {
  stages: [
    { duration: "5m", target: 200 }, // Rampa sobe e fica 5min com 200 users
    { duration: "10m", target: 200 }, // Fica 10min com 200 users
    { duration: "2m", target: 0 }, // fica 2min sem nada, como se tivesse caido
  ],
};

export default () => {
  const url = "http://localhost:3400/api/items";

  const json = JSON.stringify({
    nome: `Stress - ${uuid.v4().substring(20)}`,
    descricao: "Loren Ipsuum",
  });

  const cabecallho = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const res = http.post(url, json, cabecallho);

  check(res, {
    "O código do status é 201": (r) => r.status === 201,
  });
  sleep(1);
};
