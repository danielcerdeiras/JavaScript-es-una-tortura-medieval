import charger from './charger.js';
import shooter from './shooter.js';
import square from './square.js';
import zigzag from './zigzag.js';
import block from './block.js';

//Lista de valores usados para las matrices
export const R = 'right'
export const L = 'left'
export const U = 'up'
export const D = 'down'

export const F = { type: 'floor' }
export const V = { type: 'void' }
export const P = { type: 'player' }
export const E = { type: 'finish' }
export const W = { type: 'wall' }

export const SR2 = { type: 'shooter', constructor: shooter, facing: R, mod: 2 }
export const SR6 = { type: 'shooter', constructor: shooter, facing: R, mod: 6 }
export const SL6 = { type: 'shooter', constructor: shooter, facing: L, mod: 6 }
export const SD4 = { type: 'shooter', constructor: shooter, facing: D, mod: 4 }

export const CD1 = { type: 'charger', constructor: charger, facing: D, mod: 1 }

export const SQLD = { type: 'square', constructor: square, facing: L, mod: D }
export const SQDL = { type: 'square', constructor: square, facing: D, mod: L }

export const ZDL = { type: 'zigzag', constructor: zigzag, facing: D, mod: L }
export const ZUR = { type: 'zigzag', constructor: zigzag, facing: U, mod: R }

export const B00 = { type: 'block', constructor: block, facing: 0, mod: 0 }