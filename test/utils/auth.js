import encoding from 'k6/encoding';

export function pegaAutorizacaoCabecalho(usuario,token){
  const encoded = encoding.b64encode(`${usuario}:${token}`)

  return{
    Authorization: `Basic ${encoded}`
  };
}