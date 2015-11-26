<?php

function Overlay_notFound_response_content($params)
{
    header("HTTP/1.0 404 Not Found");
    $url = Q_Request::url();
	if (Q_Request::isAjax()) {
		throw new Q_Exception_NotFound(compact('url'));
	}
    return Q::view("Overlay/content/notFound.php", compact('url'));
}

