import http from "k6/http";
import { check, sleep } from "k6";

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
	const caminhoArquivo = './GET/smoke-reporter.html';
	return {
		stdout: textSummary(data, { indent: ' ', enableColors: true }),
		[caminhoArquivo]: htmlReport(data),
	};
}

//Opções
export const options = {
  vus: 1,
  duration: '10s'
};

//Teste de Fumaça(Smoke)
export default () => {
  const url = http.get("http://localhost:3400/api/items");

  check(url, {
    "O código do status é 200": (r) => r.status === 200,
  });

  sleep(1);
};