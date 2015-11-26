/**
 * Autogenerated base class for the Overlay model.
 * 
 * Don't change this file, since it can be overwritten.
 * Instead, change the Overlay.js file.
 *
 * @module Overlay
 */
var Q = require('Q');
var Db = Q.require('Db');

/**
 * Base class for the Overlay model
 * @namespace Base
 * @class Overlay
 * @static
 */
function Base () {
	return this;
}
 
module.exports = Base;

/**
 * The list of model classes
 * @property tableClasses
 * @type array
 */
Base.tableClasses = [
	"Overlay_Counter"
];

/**
 * This method calls Db.connect() using information stored in the configuration.
 * If this has already been called, then the same db object is returned.
 * @method db
 * @return {Db} The database connection
 */
Base.db = function () {
	return Db.connect('Overlay');
};

/**
 * The connection name for the class
 * @method connectionName
 * @return {string} The name of the connection
 */
Base.connectionName = function() {
	return 'Overlay';
};

/**
 * Link to Overlay.Counter model
 * @property Counter
 * @type Overlay.Counter
 */
Base.Counter = Q.require('Overlay/Counter');
