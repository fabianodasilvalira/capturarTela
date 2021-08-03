<?php
var_dump($_FILES);

  require 'vendor/autoload.php';
  use Vimeo\Vimeo;
  $urlV = $_FILES['video'];
  $extension = "mp4";

  $nome_arquivo = md5($_FILES['video']['name']).md5(date("d/m/Y H:i:s")).'.'.$extension;

  if(move_uploaded_file($_FILES['video']['tmp_name'], 'video/'. $nome_arquivo)){

      $client = new Vimeo("4bdf95a127b95e82d45c1018ac0fa58d1978e7fc", "Ls80F44o1fXewFQ7sF6xF43Jn7FUHaPVz6teky7pEfGJ32sj9kU48o/KK9LjJqwV+UPVm1WOAH78s92EU9MgaWRTrKsoKyNn+K3O/py7oei1qZ4hq95gCbCBQCJYKeoi", "95429f84f7ace89fc6083830fbf05555");

      $response = $client->request('/tutorial', array(), 'GET');
 
      // Enviando o video aqui
      $file_name = 'video/'. $nome_arquivo;
  
      $uri = $client->upload($file_name, array(
        "name" => "Enviando video para Vimeo",
        "description" => "Teste de envio de video para o vimeo usando o gravador de tela."
      ));
  
      $response = $client->request($uri . '?fields=transcode.status');
      // while($response['body']['transcode']['status'] === 'in_progress'){
      //   $response = $client->request($uri . '?fields=transcode.status');
      // }
      if ($response['body']['transcode']['status'] === 'complete') {
        print 'Seu vídeo terminou de transcodificação.';
      } elseif ($response['body']['transcode']['status'] === 'in_progress') {
        print ' Seu vídeo ainda está sendo transcodificado.  ';
      } else {
        print 'Seu vídeo encontrou um erro durante a transcodificação.';
      }
  
      $response = $client->request($uri . '?fields=link');
      echo $linkvideo = $response['body']['link'];
  } else {
    echo "não moveu";
  }
 

 


?>