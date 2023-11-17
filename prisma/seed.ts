import {db } from '../src/server/db'

  
const products = [
  { name: 'SABIA COMUM', costPerKg: 2.53, sellPricePerKg: 3.89 },
  { name: 'SABIA ESPECIAL', costPerKg: 2.79, sellPricePerKg: 4.29 },
  { name: 'NOVO SABIA ESPECIAL', costPerKg: 1.97, sellPricePerKg: 3.03 },
  { name: 'CAMPINA COMUM', costPerKg: 4.27, sellPricePerKg: 6.57 },
  { name: 'CAMPINA ESPECIAL', costPerKg: 5.16, sellPricePerKg: 7.94 },
  { name: 'NOVA CAMPINA ESPECIAL', costPerKg: 3.10, sellPricePerKg: 4.77 },
  { name: 'BELGA COMUM', costPerKg: 5.22, sellPricePerKg: 8.03 },
  { name: 'BELGA ESPECIAL', costPerKg: 5.78, sellPricePerKg: 8.89 },
  { name: 'NOVO BELGA ESPECIAL', costPerKg: 5.00, sellPricePerKg: 7.70 },
  { name: 'CURRUPIAO', costPerKg: 1.84, sellPricePerKg: 2.83 },
  { name: 'CURIO', costPerKg: 5.77, sellPricePerKg: 8.88 },
  { name: 'VITAMINA AMARELA', costPerKg: 2.13, sellPricePerKg: 3.27 },
  { name: 'GRAUNA COMUM', costPerKg: 2.83, sellPricePerKg: 4.35 },
  { name: 'GRAUNA ESPECIAL', costPerKg: 3.10, sellPricePerKg: 4.77 },
  { name: 'CALOPSITA', costPerKg: 4.35, sellPricePerKg: 6.68 },
  { name: 'GALO COMUM', costPerKg: 2.90, sellPricePerKg: 4.47 },
  { name: 'GALO ESPECIAL', costPerKg: 3.46, sellPricePerKg: 5.32 },
  { name: 'NOVO GALO ESPECIAL', costPerKg: 2.80, sellPricePerKg: 4.30 },
  { name: 'PAPAGAIO ESPECIAL', costPerKg: 4.62, sellPricePerKg: 7.11 },
  { name: 'MISTURA FINA', costPerKg: 4.48, sellPricePerKg: 6.90 },
  { name: 'NOVA MISTURA FINA', costPerKg: 3.20, sellPricePerKg: 4.93 }
];


  const ingredients = [
    { name: 'ALPISTE', costPerKg: 6 },
    { name: 'AMENDOIM COM CASCA', costPerKg: 6 },
    { name: 'AMENDOIM QUEBRADO', costPerKg: 6 },
    { name: 'AMENDOIM SEM CASCA', costPerKg: 6 },
    { name: 'ANTI-MOFO (AMMO CURB)', costPerKg: 16.8 },
    { name: 'AROMA ARTIFICIAL', costPerKg: 27 },
    { name: 'ARROZ C/CASCA', costPerKg: 3.95 },
    { name: 'AVEIA COM CASCA', costPerKg: 2.5 },
    { name: 'AVEIA SEM CASCA', costPerKg: 3.7 },
    { name: '(PREMIX)BISCOITO FINO', costPerKg: 6.45 },
    { name: '(PREMIX)BISCOITO MÉDIO', costPerKg: 6 },
    { name: '(PREMIX)BISCOITO GROSSO', costPerKg: 6 },
    { name: '(PREMIX)PÓ AMARELO', costPerKg: 6 },
    { name: '(PREMIX)PÓ COLORIDO', costPerKg: 6 },
    { name: 'CASTANHA TRITURADA FINA', costPerKg: 1.1 },
    { name: 'CASTANHA TRITURADA GROSSA', costPerKg: 1.1 },
    { name: 'CASTANHA TRITURADA MEDIA', costPerKg: 1.1 },
    { name: 'FAROFA DE CASTANHA', costPerKg: 1.1 },
    { name: 'FAROFA DE AMENDOIM', costPerKg: 2.05 },
    { name: 'COLZA', costPerKg: 4.6 },
    { name: 'ERVILHA INTEIRA P/RACAO', costPerKg: 3.4 },
    { name: 'ERVILHA PARTIDA P/RACAO', costPerKg: 3.75 },
    { name: 'PRESENCE(EXTRAMUDA)', costPerKg: 2 },
    { name: 'PRESENCE(BANANA)', costPerKg: 2 },
    { name: 'PRESENCE(BANANA TRITURADA)', costPerKg: 2 },
    { name: 'LINHAÇA', costPerKg: 6.9 },
    { name: 'MILHETO', costPerKg: 1 },
    { name: 'MILHO EM GRÃO', costPerKg: 0.85 },
    { name: 'NABÃO', costPerKg: 4.3 },
    { name: 'NIGER', costPerKg: 9.2 },
    { name: 'OLEO VEGETAL', costPerKg: 2 },
    { name: 'OLEO DE SOJA', costPerKg: 2 },
    { name: 'PAINÇO COMUM', costPerKg: 5.35 },
    { name: 'PAINÇO PRETO', costPerKg: 6 },
    { name: 'PAINÇO VERDE', costPerKg: 4.55 },
    { name: 'PAINÇO VERMELHO', costPerKg: 6 },
    { name: 'PAINÇO PORTUGUES', costPerKg: 5.8 },
    { name: 'PREFRAN', costPerKg: 0 },
    { name: 'PROEQUI(MELAÇADA)', costPerKg: 1.2 },
    { name: 'PROEQUI(EQUIMIX)', costPerKg: 1.2 },
    { name: 'GIRASSOL PEQUENO', costPerKg: 5.7 },
    { name: 'SEMENTE GIRASSOL GRANDE', costPerKg: 5.9 },
    { name: 'SENHA FRANCESA', costPerKg: 6.35 },
    { name: 'SOJA GRÃO', costPerKg: 4.5 },
    { name: 'SORGO BRANCO', costPerKg: 2.3 },
    { name: 'SORGO VERMELHO', costPerKg: 1.7 },
    { name: 'TRIGO SARRACENO', costPerKg: 2.6 },
    { name: 'TRIGUILHO', costPerKg: 1.6 },
    { name: 'VITAMINA AMARELA', costPerKg: 5.2 },
    { name: 'XEREM FINO', costPerKg: 0.8 },
    { name: 'XEREM GROSSO', costPerKg: 0.8 },
    { name: 'MASSA DE MILHO', costPerKg: 0.8 },
    { name: 'SAL COMUM', costPerKg: 0.6 }
  ];
  

async function main() {
  for (const ingredient of ingredients) {
    await db.ingredient.create({
      data: {
        name: ingredient.name,
        costPerKg: ingredient.costPerKg,
      },
    });
  }
  for (const product of products) {
    await db.product.create({
      data: {
        name: product.name,
        sellPricePerKg: product.sellPricePerKg,
        costPerKg: product.costPerKg,
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