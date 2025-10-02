import http from 'k6/http';
import { check, sleep } from 'k6';
import { pegaAutorizacaoCabecalho } from '../../utils/auth.js';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

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
  vus: 100,
  duration: '5s'
  // iterations: 1000,
  // thresholds:{
  //   http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  //   http_req_duration: ['p(99)<200'], // 95% of requests should be below 200
  // }
}

//Main Function
export default function () {
  let headers = pegaAutorizacaoCabecalho(usuario, token);
  http.get(endPoint, { headers });
  sleep(1);

  // describe('Requisição GET', () => {

  //   // ASSERÇÃO TRADICIONAL DO K6
  //   // check(res, {
  //   //   'status code is 200': (r) => r.status == 200
  //   // })


  //   // ASSERÇÃO COM CHAI
  //   // let body = res.json()

  //   // expect(res.body.length, 'Resposta possui corpo?').to.be.above(0)
  //   // expect(res.body, 'Resposta não pode ter corpo vazio').to.not.be.empty;

  //   // expect(body,'Resposta deve conter valor "data"').to.have.property('data');
  //   // expect(body.data,'Resposta deve ser um array').to.be.a('array')
  //   // expect(body.data.length,'Resposta: o Array não pode estar vazio').to.not.be.empty;

  //   // //Valida primeiro item
  //   // let primeiroObj = body.data[0];
  //   // expect(primeiroObj,'Resposta: Primeiro Objeto deve existir').to.exist;
  //   // expect(primeiroObj,'Resposta: obejto deve ter a chave').to.have.property('isCanceled');
  //   // expect(primeiroObj.isCanceled,'Resposta: o valor dessa propriedade deve ser').to.be.a('boolean');
  //   // expect(primeiroObj.isCanceled,'Resposta: o valor dessa propriedade tem que ser igual a').to.equal(true);



  // })





}