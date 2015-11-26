/**
 * Overlay model
 * @module Overlay
 * @main Overlay
 */
var Q = require('Q');

/**
 * Static methods for the Overlay model
 * @class Overlay
 * @extends Base.Overlay
 * @static
 */
function Overlay() { };
module.exports = Overlay;

var Base_Overlay = Q.require('Base/Overlay');
Q.mixin(Overlay, Base_Overlay);

/*
 * This is where you would place all the static methods for the models,
 * the ones that don't strongly pertain to a particular row or table.
 * Just assign them as methods of the Overlay object.
 * If file 'Overlay.js.inc' exists, its content is included
 * * * */

/* * * */