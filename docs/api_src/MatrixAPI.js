/**
 * @module DivSugar
 */

/**
 * @class Matrix
 * @namespace DivSugar
 */

/**
 * @property UNIT
 * @type {DivSugar.Matrix}
 * @final
 * @static
 */

/**
 * @property xAxis
 * @type {DivSugar.Vector}
 * @default DivSugar.Vector.X_UNIT
 */

/**
 * @property yAxis
 * @type {DivSugar.Vector}
 * @default DivSugar.Vector.Y_UNIT
 */

/**
 * @property zAxis
 * @type {DivSugar.Vector}
 * @default DivSugar.Vector.Z_UNIT
 */

/**
 * @property trans
 * @type {DivSugar.Vector}
 * @default DivSugar.Vector.ZERO
 */

/**
 * @method _constructor
 */

/**
 * @method _constructor
 * @param {DivSugar.Matrix} mat
 */

/**
 * @method _constructor
 * @param {Number} m11
 * @param {Number} m12
 * @param {Number} m13
 * @param {Number} m21
 * @param {Number} m22
 * @param {Number} m23
 * @param {Number} m31
 * @param {Number} m32
 * @param {Number} m33
 * @param {Number} m41
 * @param {Number} m42
 * @param {Number} m43
 */

/**
 * @method set
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Matrix} this
 */

/**
 * @method set
 * @param {Number} m11
 * @param {Number} m12
 * @param {Number} m13
 * @param {Number} m21
 * @param {Number} m22
 * @param {Number} m23
 * @param {Number} m31
 * @param {Number} m32
 * @param {Number} m33
 * @param {Number} m41
 * @param {Number} m42
 * @param {Number} m43
 * @return {DivSugar.Matrix} this
 */

/**
 * @method fromQuaternion
 * @param {DivSugar.Quaternion} quat
 * @return {DivSugar.Matrix} this
 */

/**
 * @method orthonormalize
 * @return {DivSugar.Matrix} this
 */

/**
 * @method translate
 * @param {Number} offsetX
 * @param {Number} offsetY
 * @param {Number} offsetZ
 * @return {DivSugar.Matrix} this
 */

/**
 * @method rotate
 * @param {Number} rotateX
 * @param {Number} rotateY
 * @param {Number} rotateZ
 * @return {DivSugar.Matrix} this
 */

/**
 * @method scale
 * @param {Number} scaleX
 * @param {Number} scaleY
 * @param {Number} scaleZ
 * @return {DivSugar.Matrix} this
 */

/**
 * @method slerp
 * @param {DivSugar.Matrix} to
 * @param {Number} ratio
 * @return {DivSugar.Matrix} this
 */

/**
 * @method slerp_noTrans
 * @param {DivSugar.Matrix} to
 * @param {Number} ratio
 * @return {DivSugar.Matrix} this
 */

/**
 * @method toLocal
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Matrix} this
 */

/**
 * @method toGlobal
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Matrix} this
 */

/**
 * @method toLocal_noTrans
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Matrix} this
 */

/**
 * @method toGlobal_noTrans
 * @param {DivSugar.Matrix} mat
 * @return {DivSugar.Matrix} this
 */

/**
 * @method lookAt
 * @param {DivSugar.Vector} from
 * @param {DivSugar.Vector} to
 * @param {DivSugar.Vector} up
 * @return {DivSugar.Matrix} this
 */

/**
 * @method equal
 * @param {DivSugar.Matrix} mat
 * @return {Boolean}
 */

/**
 * @method toString
 * @return {String}
 */

/**
 * @method toCSSTransform
 * @return {String}
 */
