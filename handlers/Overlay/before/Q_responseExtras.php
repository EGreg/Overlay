<?php

function Overlay_before_Q_responseExtras()
{
	$app = Q_Config::expect('Q', 'app');	
	
	Q_Response::addStylesheet('plugins/Q/css/Q.css');
	Q_Response::addStylesheet('css/Overlay.css', '@end');
	
	Q_Response::addStylesheet('http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,700');

	if (Q_Config::get('Q', 'firebug', false)) {
		Q_Response::addScript("https://getfirebug.com/firebug-lite-debug.js");
	}
	Q_Response::addScript('js/Overlay.js');
	
	Q_Response::setMeta("title", "Customize My Pic!");
	Q_Response::setMeta("description", "Make a statement on Facebook by customizing your profile picture, even from your smartphone.");
	Q_Response::setMeta("image", Q_Html::themedUrl('img/icon/icon.png'));
	
	if (Q_Request::isIE()) {
		header("X-UA-Compatible", "IE=edge");
	}
	header('Vary: User-Agent');
	
	// running an event for loading action-specific extras (if there are any)
	$uri = Q_Dispatcher::uri();
	$module = $uri->module;
	$action = $uri->action;
	$event = "$module/$action/response/responseExtras";
	if (Q::canHandle($event)) {
		Q::event($event);
	}
}
