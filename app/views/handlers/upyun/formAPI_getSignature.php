<?php

$bucket = 'mypicwebsite';

$form_api_secret = 'gvuRNOZu/DM9fdtCp5zlzhrTHLk='; 

$options = array();

$options['bucket'] = $bucket;

$options['expiration'] = time()+600;

$options['save-key'] = 'mypic_{year}{mon}{day}{hour}{min}{sec}_{random}{.suffix}';

$options['allow-file-type'] = 'jpg,jpeg,gif,png';

$options['return-url'] = 'http://mypic.io/';

$policy = base64_encode(json_encode($options));

$signature = md5($policy.'&'.$form_api_secret);

$arr = array("policy" => $policy, "signature" => $signature);

echo json_encode($arr);

?>