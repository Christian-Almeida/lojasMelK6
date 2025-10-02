import http from 'k6/http';
import { sleep } from 'k6';
import { pegaAutorizacaoCabecalho } from '../../utils/auth.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const env = JSON.parse(open('../../config/env.dev.json'));
const { endPoint, usuario, token } = env;

//Relátorio do Teste
export function handleSummary(data) {
  const caminhoArquivo = './results/ME/request.html';
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    [caminhoArquivo]: htmlReport(data),
  };
}

//Configuração do Teste
export const options = {
  vus: 5,
  duration: '10s'
}

//Main Function
export default function () {
  let headers = pegaAutorizacaoCabecalho(usuario, token);
  http.get(endPoint, { headers });
  sleep(1);
}