<?php

function Overlay_home_response_content($params)
{
	$countries = array();
	$files = glob(APP_WEB_DIR.DS.'img'.DS.'squareflags'.DS.'*');
	foreach ($files as $file) {
		$basename = basename($file);
		$src = Q_Request::baseUrl()."/img/squareflags/$basename";
		$src = str_replace(' ', '%20', $src);
		if (empty($firstCountrySrc)) {
			$firstCountrySrc = $src;
		}
		$parts = explode('.', $basename);
		$parts2 = explode('_', $parts[0]);
		foreach ($parts2 as &$v) {
			$v = strtoupper($v[0]) . substr($v, 1);
		}
		$countries[$src] = implode(' ', $parts2);
	}
	$counter = Overlay::counter();
	$proxyHost = 'http://' . $_SERVER['HTTP_HOST'] 
		. ':' . Q_Config::get('Q', 'node', 'port', '80');
	Q_Response::setScriptData('Overlay.proxyHost', $proxyHost);
	return Q::view('Overlay/content/home.php', compact(
		'countries', 'firstCountrySrc', 'counter'
	));
}

