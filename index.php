<!DOCTYPE html>
<html>
<head>
    <title>Gravação de tela</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="src/styles.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</head>
  <body>
      <div>
          <button id="start">Iniciar Gravação</button>
          <button id="stop" type="button" disabled data-toggle="modal" data-target="#myModal">Parar Gravação</button>
          <!-- <button id='btn_openCam'>cam</button> -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Open modal
          </button>

      </div>
      <button id='btn_openCam'>Abrir Camera</button>
      <button id='btn_closeCam'>Fechar Camera</button>

    <a id="downloadLink" download="mediarecorder.webm" name="mediarecorder.webm" href></a>
    
    <div id="divVideoCamera" style="display: block;">
        <video id="cam" autoplay></video>
    </div>

    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Enviando video para o vimeo</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
            <div >
              <video id="iframe" controls autoplay></video>
            </div>
          </div>
          
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="botaoEnviarVideo()">Enviar vídeo</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">fechar</button>
          </div>
          
        </div>
      </div>
    </div>
    <script src="src/index.js"></script>
    <script type="text/javascript"></script>
  </body>
</html>
