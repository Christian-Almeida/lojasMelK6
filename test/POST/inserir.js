import http from "k6/http";
import { check, sleep } from "k6";
import uuid from "../libs/uuid.js"


export const options = {
  vus: 2,
  duration: "2s",
};

export default function () {
  const url = "http://localhost:3400/api/items";

  const jsonApk = JSON.stringify(
    {
      nome: `UA - ${uuid.v4().substring(20)}`,
      descricao: "Loren Ipsulum"
    }
  )
 
  const cabecalho = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const res = http.post(url, jsonApk, cabecalho);

  check(res, {
    "O código do status é 201": (r) => r.status === 201,
  });

  sleep(1);
}
