<div class='section'>
	<div class="margin-fixer">&nbsp;</div>
	<h1 id="slogan"><div>Customize your profile picture.</div></h1>
	
	<div class="explanation">
		<?php echo Q_Html::img('img/photo.jpg') ?>
		<span>+</span>
		<?php echo Q_Html::img('img/flag.jpg') ?>
		<span>&#8594;</span>
		<?php echo Q_Html::img('img/result.jpg') ?>
	</div>
	<div class="login">
		<?php echo Q_Html::img('img/facebook.png', 
			'login with facebook', 
			array('id' => 'login', 'class' => 'Q_clickable Overlay_login')
		) ?>
	</div>
	<div class="section counter">
		<?php echo $counter + 4000 ?> people have customized their photo
	</div>
	<div class="videoArea">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/2amNdUzhldM?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
	</div>
	
</div>
