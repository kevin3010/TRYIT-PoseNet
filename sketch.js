var image = document.getElementById('img1');
var video = document.getElementById('video');
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');

var flag = 0;

var poses = [];

const poseNet = ml5.poseNet(video,()=>{
	console.log("Model Ready to Infer");
});


poseNet.on('pose',(predictions)=>{
	poses = predictions;
});

function startStop(fg)
{
	flag = fg;
	if(fg==0)
		video.srcObject.getTracks()[0].stop();
	else if(fg==1)
	{
	  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
		    video.srcObject=stream;
		    video.play();
		  });
		}
	}
} 

function setImage(img){
	image = document.getElementById(img);
}

function displayInCanvas()
{
	if(flag==1)
	{
		ctx1.drawImage(video, 0, 0, 640, 480);
		ctx2.drawImage(video, 0, 0, 640, 480);

		drawTshirt();
		drawKeypoints();
	}
	else
	{
		ctx1.fillStyle = "black";
		ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
		ctx1.fillStyle = "white";
		ctx1.textAlign = "center";
		ctx1.font = "30px Arial";
		ctx1.fillText("Press 'start' to start webcam",320,240);
		ctx1.fillText("Press t-shirts to change",320,280);

		ctx2.fillStyle = "black";
		ctx2.fillRect(0, 0, canvas1.width, canvas1.height);
		ctx2.fillStyle = "white";
		ctx2.textAlign = "center";
		ctx2.font = "30px Arial";
		ctx2.fillText("Press 'stop' to stop webcam",320,240);
		ctx2.fillText("Press t-shirts to change",320,280);
	}

	window.requestAnimationFrame(displayInCanvas);
	
}

// The most time consuming part
function drawTshirt()
{
	if(poses.length>0)
	{
		var rightShoulder = poses[0].pose.rightShoulder;
		var leftShoulder = poses[0].pose.leftShoulder;
		var nose = poses[0].pose.nose;
		var leftHip = poses[0].pose.leftHip;
		var rightHip = poses[0].pose.rightHip;
		var rightElbow = poses[0].pose.rightElbow;

		var width = Math.abs(rightShoulder.x - leftShoulder.x)/0.5; 

		var x = rightShoulder.x-width*0.25;
		var y = (nose.y + 0.50*nose.y + rightShoulder.y + leftShoulder.y)/3.5;
		  
		var height = Math.abs(2*y - leftHip.y - rightHip.y)*1.2/2;
		
    	ctx1.drawImage(image,x,y,width,height);
	}
}

function drawKeypoints()
{
	if(poses.length>0)
    for (let j = 0; j < poses[0].pose.keypoints.length; j++) {
      let keypoint = poses[0].pose.keypoints[j];
      ctx2.fillStyle = "#00FF00";
      if (keypoint.score > 0.2) {
        ctx2.beginPath();
        ctx2.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
        ctx2.fill();
      }
    }
}

displayInCanvas();

