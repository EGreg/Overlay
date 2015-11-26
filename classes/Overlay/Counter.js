/**
 * Class representing counter rows.
 *
 * This description should be revised and expanded.
 *
 * @module Overlay
 */
var Q = require('Q');
var Db = Q.require('Db');
var Counter = Q.require('Base/Overlay/Counter');

/**
 * Class representing 'Counter' rows in the 'Overlay' database
 * @namespace Overlay
 * @class Counter
 * @extends Base.Overlay.Counter
 * @constructor
 * @param {Object} fields The fields values to initialize table row as
 * an associative array of `{column: value}` pairs
 */
function Overlay_Counter (fields) {

	// Run mixed-in constructors
	Overlay_Counter.constructors.apply(this, arguments);

	/*
	 * Add any privileged methods to the model class here.
	 * Public methods should probably be added further below.
	 * If file 'Counter.js.inc' exists, its content is included
	 * * * */

	/* * * */
}

Q.mixin(Overlay_Counter, Counter);

/*
 * Add any public methods here by assigning them to Overlay_Counter.prototype
 */

/**
 * The setUp() method is called the first time
 * an object of this class is constructed.
 * @method setUp
 */
Overlay_Counter.prototype.setUp = function () {
	// put any code here
	// overrides the Base class
};

module.exports = Overlay_Counter;