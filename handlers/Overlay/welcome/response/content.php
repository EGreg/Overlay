<?php

function Overlay_welcome_response_content($params)
{
	$counter = Overlay::counter();
	return Q::view('Overlay/content/welcome.php', compact('counter'));
}

