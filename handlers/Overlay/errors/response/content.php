<?php

function Overlay_errors_response_content($params)
{
	header('HTTP/1.0 503 Server Encountered Error');
	$url = Q_Request::url();
	return Q::view('Overlay/content/errors.php', compact('url'));
}
