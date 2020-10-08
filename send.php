<?php
	function safe($str){
		return htmlspecialchars(strip_tags(addslashes(trim($str))));
	}

	// Do some magic here


	mail('stas@goshovsky.com', $subject, $message, $headers);

?>