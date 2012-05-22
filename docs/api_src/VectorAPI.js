/**
 * @module DivSugar
 */

/**
 * @class Vector
 * @namespace DivSugar
 */

/**
 * @property ZERO
 * @type {DivSugar.Vector}
 * @final
 * @static
 */

/**
 * @property X_UNIT
 * @type {DivSugar.Vector}
 * @final
 * @static
 */

/**
 * @property Y_UNIT
 * @type {DivSugar.Vector}
 * @final
 * @static
 */

/**
 * @property Z_UNIT
 * @type {DivSugar.Vector}
 * @final
 * @static
 */

/**
 * @property x
 * @type {Number}
 * @default 0
 */

/**
 * @property y
 * @type {Number}
 * @default 0
 */

/**
 * @property z
 * @type {Number}
 * @default 0
 */

/**
 * @method _constructor
 */

/**
 * @method _constructor
 * @param {DivSugar.Vector} vec
 */

/**
 * @method _constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 */

/**
 * @method set
 * @param {DivSugar.Vector} vec
 * @return {DivSugar.Vector} this
 */

/**
 * @method set
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {DivSugar.Vector} this
 */

/**
 * @method neg
 * @return {DivSugar.Vector} this
 */

/**
 * @method add
 * @param {DivSugar.Vector} vec
 * @return {DivSugar.Vector} this
 */

/**
 * @method sub
 * @param {DivSugar.Vector} vec
 * @return {DivSugar.Vector} this
 */

/**
 * @method mul
 * @param {Number} s
 * @return {DivSugar.Vector} this
 */

/**
 * @method div
 * @param {Number} s
 * @return {DivSugar.Vector} this
 */

/**
 * @method norm
 * @return {Number}
 */

/**
 * @method sqNorm
 * @return {Number}
 */

/**
 * @method dist
 * @param {DivSugar.Vector} vec
 * @return {Number}
 */

/**
 * @method sqDist
 * @param {DivSugar.Vector} vec
 * @return {Number}
 */

/**
 * @method dot
 * @param {DivSugar.Vector} vec
 * @return {Number}
 */

/**
 * @method cross
 * @param {DivSugar.Vector} vec
 * @return {DivSugar.Vector} this
 */

/**
 * @method normalize
 * @return {DivSugar.Vector} this
 */

/**
 * @method rotate
 * @param {Number} rotateX
 * @param {Number} rotateY
 * @param {Number} rotateZ
 * @return {DivSugar.Vector} this
 */

/**
 * @method lerp
 * @param {DivSugar.Vector} to
 * @param {Number} ratio
 * @return {DivSugar.Vector} this
 */

/**
 * @method toLocal
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Vector} this
 */

/**
 * @method toGlobal
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Vector} this
 */

/**
 * @method toLocal_noTrans
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Vector} this
 */

/**
 * @method toGlobal_noTrans
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Vector} this
 */

/**
 * @method equal
 * @param {DivSugar.Vector} vec
 * @return {Boolean}
 */

/**
 * @method toString
 * @return {String}
 */
