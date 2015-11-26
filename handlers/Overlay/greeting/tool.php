<?php

function Overlay_greeting_tool($options)
{
	$defaults = array('greeting' => 'Default greeting');
	extract(array_merge($defaults, $options));
	return '<h1 class="Overlay_greeting_tool tool">' . Q_Html::text($greeting) . '</h1>';
}
