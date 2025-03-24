  import http from "k6/http";
  import { check, sleep } from "k6";
  import uuid from "../libs/uuid.js";

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

//Report
export function handleSummary(data) {
	const caminhoArquivo = './POST/smoke-reporter.html';
	return {
		stdout: textSummary(data, { indent: ' ', enableColors: true }),
		[caminhoArquivo]: htmlReport(data),
	};
}

  //Opções
  export const options = {
    vus: 1,
    duration: "5s",
  };

  //Teste de Fumaça(Smoke)
  export default () => {
    const url = "http://localhost:3400/api/items";

    const jsonAPK = JSON.stringify({
      nome: `Smoke - ${uuid.v4().substring(20)}`,
      descricao: "teste",
    });

    const cabecalho = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = http.post(url, jsonAPK, cabecalho);

    check(res, {
      "O código do status é 201": (r) => r.status === 201,
    });

    sleep(1);
  };
