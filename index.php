<?php
$doc = new DOMDocument();
$doc->loadHTMLFile("swede-generator.html");
echo $doc->saveHTML();
?>