<div id='dashboard'>
	<h1>Overlay</h1>

	<div id="dashboard_user">
		<?php if ($user): ?>
			<?php echo Q::tool("Users/avatar", array('userId' => $user->id, 'icon' => 50, 'short' => true), 'dashboard') ?>
		<?php else: ?>
			<a href="#login" class="Overlay_login">log in</a>
		<?php endif; ?>
		<div id="dashboard_user_contextual" class="Q_contextual" data-handler="Overlay.userContextual">
			<ul class="Q_listing">
				<?php if ($user): ?>
					<?php if (!$user->mobileNumber): ?>
						<li data-action="setIdentifier">set mobile number</li>
					<?php elseif (!$user->emailAddress): ?>
						<li data-action="setIdentifier">set email address</li>
					<?php endif ?>
				<?php endif ?>
				<li data-action="logout">log out</li>
			</ul>
		</div>
	</div>
	
	<?php echo Q::tool('Q/tabs', array(
		'vertical' => !Q_Request::isMobile(),
		'overflow' => '{{html}}',
		'compact' => true,
		'tabs' => array(
			'welcome' => 'Welcome',
			'about' => 'About'
		),
		'urls' => array(
			'welcome' => 'Overlay/welcome',
			'about' => 'Overlay/about'
		)
	))?>
</div>
