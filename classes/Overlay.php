<?php
/**
 * Overlay model
 * @module Overlay
 * @main Overlay
 */
/**
 * Static methods for the Overlay models.
 * @class Overlay
 * @extends Base_Overlay
 */
abstract class Overlay extends Base_Overlay
{
	/*
	 * This is where you would place all the static methods for the models,
	 * the ones that don't strongly pertain to a particular row or table.
	 * If file 'Overlay.php.inc' exists, its content is included
	 * * * */

	/* * * */
	
	static function counter($increment = null)
	{
		$criteria = array('name' => 'Overlay');
		if (!$increment) {
			return (new Overlay_Counter($criteria))->retrieve()->counter - 1;
		}
		return Overlay_Counter::update()->set(array(
			'counter' => new Db_Expression('counter + 1')
		))->where($criteria)->execute();
	}
};