# TRYIT-PoseNet
## Introduction

This is a javascript based application that augments clothes on body. This application is made using the ml5.js library which is built on top of tensorflow.js. Tensorflow.js allows you to perform the inference at client side in the browser itself. <br><br>Following are the advantages :  
- Data-security<br>
Since the data need not to be transfered to the server the privacy of the user is maintained. All the data is capture using the webcam and it is infered on the browser itself.

- Reduced-latency<br>
Since data need not to travel back and forth between the server and client the latency is reduced. This help in providing system with real-time inference.

## Working

Posenet is used to identify 17 keypoints on the human body which are nose , eyes, elbows, etc. Now base on this keypoints co-ordinates are calculated to augment the image of t-shirt on the body. Also certain ratios are taken into consideration in order to adjust the image of the t-shirt and resize it. The images of the t-shirt used are in png format with transparent background.
