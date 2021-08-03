const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
const videoElement = document.querySelector("#cam");
const downloadLink = document.querySelector('a#downloadLink');
const iframeModal = document.querySelector('video#iframe');

var recorder, stream;

// Abrir camera
function startVideoFromCamera(){
    navigator.mediaDevices.getUserMedia({video:true})
        .then(stream=>{
            videoElement.srcObject = stream
        })
        .catch(error=>{
           console.log(error)
        })
}

// Fechar camera 
function stopVideoFromCamera() {
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
        track.stop();
    });

    videoElement.srcObject = null;
}

window.addEventListener("DOMContentLoaded", startVideoFromCamera);

// Iniciar gravação 
async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
      }
  });
  recorder = new MediaRecorder(stream);

  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split('64,'),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    // video.src = 
    const blobUrl =URL.createObjectURL(completeBlob);
    // window.open(blobUrl, "_blank")
    let srcvideo

    // converter objblob em base64
    blobToDataURL(completeBlob, function(dataurl){
      
      var file = dataURLtoFile(dataurl,'videoBlob.mp4');

      var arrayBase64 = dataurl.split('64,'),
      arrayVideo = arrayBase64[1]
      arrayInicioVideo = 'data:video/mp4;codecs=avc1;base64,'
      dataurl = arrayInicioVideo+arrayVideo 

      // Enviar video
      // enviarVideo(file, dataurl)
      abreModal(dataurl, file);
    });

  };

  recorder.start();
}
 
function enviarVideo(video){

    data = new FormData()
    data.append('video', video);

    jQuery.ajax({
        data: data,
        type: 'post',
        url: "enviar_video.php",
        contentType: false,
        processData: false,
        success: function (response) {
          console.log(response)
        }
    });

}

let filevideo;
function abreModal(video, file) {
  filevideo = file
  iframeModal.src = (video);

  $("#myModal").modal({
       show: true
     });

  }

  function botaoEnviarVideo(){
    console.log(filevideo)
    enviarVideo(filevideo)
  }

  
  start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

  stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");
  
  recorder.stop();
  stream.getVideoTracks()[0].stop();
});

$("#btn_openCam").click(function(){
  startVideoFromCamera();
  $("#cam").show();
});
$("#btn_closeCam").click(function(){
  stopVideoFromCamera();
  $("#cam").hide();
});


$("#cam").click(function(){
  $("#cam").toggleClass("videoCamera");
});

function meuRelogio() {
  setTimeout(function() {
    startRecording()
  }, 3000);
}


  //**dataURL to blob**
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//**blob to dataURL**    // converter objblob em base64
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);

}

