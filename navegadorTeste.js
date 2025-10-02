import http from 'k6/http';
import exec from 'k6/execution';
import { browser } from 'k6/browser';
import { sleep, check, fail } from 'k6';

const BASE_URL = 'https://qa.me.com.br/backoffice/Portal/Account.mvc/LogOn';

//Configurações do teste
export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 10,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

//Verifica se o site está no ar
export function setup(){
  let res = http.get(BASE_URL);
  if(res.status !== 200){
    exec.test.abort(`Erro de status inesperado ${res.status} ao tentar configurar. Saindo.`);
  }
}

//Teste de interface
export default async function () {
  let checkData;
  const page = await browser.newPage();

  try {
    await page.goto(BASE_URL);

    checkData = await page.locator('img[src*="logos"]').textContent();
    check(page, {
      header: checkData === 'me',
    });

    await page.locator('button[onclick*="clickLogOn"]').click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'teste.png' });

    checkData = await page.locator('span[for="inputUser"]').textContent();
    check(page, {
      recommendation: checkData === 'Campo obrigatório',
    });
  } catch (error) {
    fail(`Browser iteration failed: ${error.message}`);
  } finally {
    await page.close();
  }

  sleep(1);
}