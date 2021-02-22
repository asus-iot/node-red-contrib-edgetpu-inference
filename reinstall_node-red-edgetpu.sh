cd ~/.node-red
npm uninstall node-red-contrib-edgetpu-inference
sudo apt-get update
sudo apt-get install -y python3-pycoral
sudo pip3 install "https://github.com/google-coral/pycoral/releases/download/release-frogfish/tflite_runtime-2.5.0-cp36-cp36m-linux_x86_64.whl"
cd -
npm install --prefix=~/.node-red ../node-red-contrib-edgetpu-inference
