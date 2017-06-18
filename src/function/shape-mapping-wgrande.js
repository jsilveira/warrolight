// import {Func} from "./rainbow";
const _ = require('lodash')

export function getShapes(mapping) {
  const inv = arr => [].concat(arr).reverse()

  const quiebre_abajo = 30;
  const quiebre_abajo_left = quiebre_abajo - 3;
  const quiebre_abajo_right = quiebre_abajo + 1;

  const centroOffsetLeft = -2;
  const centroOffsetRight = -1;

  const quiebre_arriba = 33;

  const pataLeft = _.range(quiebre_abajo_left, 150)
  const pataRight = _.range(450+quiebre_abajo_right, 600)

  const basePataLeft =  _.range(0, quiebre_abajo_left);
  const basePataRight =  _.range(450, 450+quiebre_abajo_right);

  const trianguloBottomLeft = _.range(150, 210 + centroOffsetLeft);
  const trianguloBottomRight
    = _.range(300, 360 + centroOffsetRight);
  const trianguloBottomBottom = inv(basePataLeft).concat(basePataRight);
  const trianguloBottom = _.flatten([basePataRight, trianguloBottomRight, inv(trianguloBottomLeft), inv(basePataLeft)])

  const trianguloTopLeft = _.range(360 + centroOffsetRight, 450-quiebre_arriba);
  const trianguloTopRight = _.range(210 + centroOffsetLeft, 300-quiebre_arriba);
  const trianguloTopTop = _.range(300-quiebre_arriba, 300).concat(inv(_.range(450-quiebre_arriba, 450)));
  const trianguloTop = _.flatten([trianguloTopLeft, inv(trianguloTopTop), inv(trianguloTopRight)])

  // Una permutación random de todas las luces. PSYCHO MIND FUCK
  const shuffle = _.shuffle(_.range(0,600))

  const mini_w = _.flatten([
    _.range(quiebre_abajo, 150),
    inv(_.range(450+quiebre_abajo, 600)),
    _.range(300, 360),
    inv(_.range(150, 210)),
  ])

  // Una permutación random de pedazos de a 20 luces
  const shuffleSegments5 = _.flatten(_.shuffle(_.map(_.range(0,120), i => _.range(i*5, (i+1)*5))))
  const shuffleSegments10 = _.flatten(_.shuffle(_.map(_.range(0,60), i => _.range(i*10, (i+1)*10))))
  const shuffleSegments20 = _.flatten(_.shuffle(_.map(_.range(0,30), i => _.range(i*20, (i+1)*20))))
  const trianguloBottomShuffle = _.shuffle(trianguloBottom)

  // La W warra
  const Warro = _.flatten([inv(pataLeft), _.range(150,300), inv(_.range(300, 450)), pataRight])

  // Las V V
  const V1L = pataLeft;
  let V1R = _.range(150,300-quiebre_arriba);
  const V2R = pataRight;
  let V2L = _.range(300,450-quiebre_arriba);

  const V1 = inv(V1L).concat(V1R)
  const V2 = inv(V2L).concat(V2R)

  // Reloj de arena
  const reloj = _.flatten([basePataLeft, _.range(150, 300), inv(_.range(300, 450)), inv(basePataRight)])

  const allOfIt = _.range(0, 600)
  // Numeros y letras
  const char_1 = _.range(150, 300)
  const char_2 = _.flatten([inv(trianguloBottomBottom), trianguloBottomLeft, trianguloTopRight, trianguloTopTop])
  const char_3 = _.flatten([trianguloBottomBottom, trianguloBottomRight, trianguloTopRight, trianguloTopTop])

  const char_a = _.flatten([trianguloBottom, trianguloTopRight, trianguloTopTop, inv(_.range(450-quiebre_arriba-10,450-quiebre_arriba))])
  const char_o = _.flatten([reloj.slice(0,90-20), reloj.slice(90+20,270-20), reloj.slice(270+20,360)]) // El reloj sin el centro
  const char_r = _.flatten([trianguloBottomLeft, trianguloTop, inv(trianguloBottomRight)])
  const char_w = Warro


  return {
    pataLeft, pataRight,
    trianguloBottom, trianguloTop, trianguloBottomLeft, trianguloBottomRight, trianguloTopRight, trianguloTopLeft,
    trianguloBottomBottom, trianguloTopTop,
    Warro, reloj, V1, V2, V1L, V1R, V2L, V2R,
    shuffle, shuffleSegments10, shuffleSegments20, shuffleSegments5, trianguloBottomShuffle,
    char_1, char_2, char_3, char_a, char_o, char_r, char_w,
    mini_w, allOfIt
  };
}


