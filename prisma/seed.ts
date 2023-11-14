import {db } from '../src/server/db'

const products = [
    { name: 'SABIA ESPECIAL', sellPricePerKg: 10.0 },
    { name: 'CAMPINA ESPECIAL', sellPricePerKg: 10.0 },
    { name: 'BELGA ESPECIAL', sellPricePerKg: 10.0 },
    { name: 'CURRUPIAO', sellPricePerKg: 10.0 },
    { name: 'CURIO', sellPricePerKg: 10.0 },
    { name: 'GRAUNA ESPECIAL', sellPricePerKg: 10.0 },
    { name: 'CALOPSITA', sellPricePerKg: 10.0 },
    { name: 'GALO ESPECIAL', sellPricePerKg: 10.0 },
    { name: 'PAPAGAIO ESPECIAL', sellPricePerKg: 10.0 },
    { name: 'MISTURA FINA', sellPricePerKg: 10.0 }
  ];

const ingredients = [
    'ALPISTE',
    'AMENDOIM COM CASCA',
    'AMENDOIM QUEBRADO',
    'AMENDOIM SEM CASCA',
    'ANTI-MOFO (AMMO CURB)',
    'AROMA ARTIFICIAL',
    'ARROZ C/CASCA',
    'AVEIA COM CASCA',
    'AVEIA SEM CASCA',
    '(PREMIX)BISCOITO FINO',
    '(PREMIX)BISCOITO MÉDIO',
    '(PREMIX)BISCOITO GROSSO',
    '(PREMIX)PÓ AMARELO',
    '(PREMIX)PÓ COLORIDO',
    'CASTANHA TRITURADA FINA',
    'CASTANHA TRITURADA GROSSA',
    'CASTANHA TRITURADA MEDIA',
    'FAROFA DE CASTANHA',
    'FAROFA DE AMENDOIM',
    'COLZA',
    'ERVILHA INTEIRA P/RACAO',
    'ERVILHA PARTIDA P/RACAO',
    'PRESENCE(EXTRAMUDA)',
    'PRESENCE(BANANA)',
    'PRESENCE(BANANA TRITURADA)',
    'LINHAÇA',
    'MILHETO',
    'MILHO EM GRÃO',
    'NABÃO',
    'NIGER',
    'OLEO VEGETAL',
    'OLEO DE SOJA',
    'PAINÇO COMUM',
    'PAINÇO PRETO',
    'PAINÇO VERDE',
    'PAINÇO VERMELHO',
    'PAINÇO PORTUGUES',
    'PREFRAN',
    'PROEQUI(MELAÇADA)',
    'PROEQUI(EQUIMIX)',
    'GIRASSOL PEQUENO',
    'SEMENTE GIRASSOL GRANDE',
    'SENHA FRANCESA',
    'SOJA GRÃO',
    'SORGO BRANCO',
    'SORGO VERMELHO',
    'TRIGO SARRACENO',
    'TRIGUILHO',
    'VITAMINA AMARELA',
    'XEREM FINO',
    'XEREM GROSSO',
    'MASSA DE MILHO',
    'SAL COMUM'
  ];
  

async function main() {
  for (const name of ingredients) {
    await db.ingredient.create({
      data: {
        name: name,
        costPerKg: 1.0,
      },
    });
  }
  for (const product of products) {
    await db.product.create({
      data: {
        name: product.name,
        sellPricePerKg: product.sellPricePerKg,
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(() => {
    db.$disconnect()
    .catch((err)=>console.log('Error to disconnect123', err));
  });