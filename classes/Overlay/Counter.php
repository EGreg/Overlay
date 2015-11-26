<?php
/**
 * @module Overlay
 */
/**
 * Class representing 'Counter' rows in the 'Overlay' database
 * You can create an object of this class either to
 * access its non-static methods, or to actually
 * represent a counter row in the Overlay database.
 *
 * @class Overlay_Counter
 * @extends Base_Overlay_Counter
 */
class Overlay_Counter extends Base_Overlay_Counter
{
	/**
	 * The setUp() method is called the first time
	 * an object of this class is constructed.
	 * @method setUp
	 */
	function setUp()
	{
		parent::setUp();
		// INSERT YOUR CODE HERE
		// e.g. $this->hasMany(...) and stuff like that.
	}

	/* 
	 * Add any Overlay_Counter methods here, whether public or not
	 * If file 'Counter.php.inc' exists, its content is included
	 * * * */

	/* * * */
	/**
	 * Implements the __set_state method, so it can work with
	 * with var_export and be re-imported successfully.
	 * @method __set_state
	 * @static
	 * @param {array} $array
	 * @return {Overlay_Counter} Class instance
	 */
	static function __set_state(array $array) {
		$result = new Overlay_Counter();
		foreach($array as $k => $v)
			$result->$k = $v;
		return $result;
	}
};