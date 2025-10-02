import http from 'k6/http';
import { sleep } from 'k6';
import { pegaAutorizacaoCabecalho } from '../../utils/auth.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

//End-point do ME
const env = JSON.parse(open('../../config/env.dev.json'));
const { endPoint, usuario, token } = env;

//Relátorio do Teste
export function handleSummary(data) {
  const caminhoArquivo = './results/ME/load.html';
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    [caminhoArquivo]: htmlReport(data),
  };
}

//Configuração do Teste
export const options = {
  //Definir Estagios para a Ramba
  stages: [
    {
      duration:'1m',
      target:100
    },
    {
      duration:'5m',
      target:100
    },
    {
      duration:'1m',
      target:0
    },
  ]
}

//Main Function
export default function () {
  let headers = pegaAutorizacaoCabecalho(usuario, token);
  http.get(endPoint, { headers });
  sleep(1);
}