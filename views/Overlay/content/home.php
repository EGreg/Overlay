<div class='section'>
	<div class="margin-fixer">&nbsp;</div>
	<h1 id="slogan"><div>Step 1. Select your profile photo</div></h1>
	<div class="photos">
		<?php echo Q::tool('Streams/photoSelector', array(
			'oneLine' => true,
			'onSelect' => 'Overlay.onPhotoSelect'
		)) ?>
	</div>
</div>

<div class='section Overlay_compressed'>
	<div class="margin-fixer">&nbsp;</div>
	<h1 id="slogan"><div>Step 2. Select a picture to overlay</div></h1>
	<div class="overlays">
		<select id="countries">
		<?php foreach ($countries as $src => $title): ?>
			<option value="<?php echo $src ?>"><?php echo Q_Html::text($title) ?></option>
		<?php endforeach; ?>
		</select>
		<div id="preview">
			<?php echo Q_Html::img('', 'background', array('id' => 'background', 'crossorigin' => 'anonymous')) ?>
			<?php echo Q_Html::img($firstCountrySrc, 'foreground', array('id' => 'foreground')) ?>
		</div>
	</div>
	<div class="buttons">
		<label for="opacity">Opacity:</label>
		<select id="opacity">
		<?php for ($f=0.1; $f<0.9; $f+=0.1): ?>
			<option value="<?php echo $f ?>" <?php if ($f===0.5) echo 'selected="selected"' ?>><?php echo $f ?></option>
		<?php endfor; ?>
		</select>
		<button id="upload" class="Q_button">Looks Good, Post It!</button>
	</div>
</div>

<div class='section Overlay_compressed'>
	<div class="margin-fixer">&nbsp;</div>
	<h1 id="slogan"><div>Step 3. Upload new profile photo</div></h1>
	
	<div class="photo">

	</div>
</div>

<div class="section counter">
	<?php echo $counter + 4000 ?> people have customized their photo
</div>

<div class="videoArea">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/2amNdUzhldM?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
</div>
