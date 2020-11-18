#!/bin/bash
#
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly TEST_DATA_URL=https://github.com/google-coral/edgetpu/raw/master/test_data

sudo apt-get update

# Install curl npm
sudo apt-get install -y curl python3-pip npm
sudo python3 -m pip install numpy Pillow

# Install Shenzhou driver and library
echo "deb https://packages.cloud.google.com/apt coral-edgetpu-stable main" | sudo tee /etc/apt/sources.list.d/coral-edgetpu.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt update
sudo apt-get install -y gasket-dkms libedgetpu1-std
sudo sh -c "echo 'SUBSYSTEM==\"apex\", MODE=\"0660\", GROUP=\"apex\"' >> /etc/udev/rules.d/65-apex.rules"
sudo groupadd apex
sudo adduser $USER apex

# Install python3-dev
sudo apt-get install -y python3-dev

# Install just the TensorFlow Lite interpreter
python3_version=$(python3 --version | awk '{ print $2}' | awk -F '.' '{ print $1$2}')
echo "Python3 version: "$(python3 --version)
if [ $python3_version = "36" ] || [ $python3_version = "37" ] || [ $python3_version = "38" ] ; then
        sudo pip3 install  "https://dl.google.com/coral/python/tflite_runtime-2.1.0.post1-cp"$python3_version"-cp"$python3_version"m-linux_x86_64.whl"
else
	echo "Python version"$(python3 --version)"not support the TensorFlow Lite interpreter"
	exit 0
fi

# Install Node-red
sudo apt-get install -y nodejs
sudo npm install -g --unsafe-perm node-red node-red-admin
sudo ufw allow 1880

# Install inference node
sudo apt-get install -y python3-opencv
sudo apt-get install -y python3-edgetpu
npm install --prefix ~/.node-red ../node-red-contrib-edge-tpu

# Get TF Lite model and labels
MODEL_DIR="${SCRIPT_DIR}/models"
mkdir -p "${MODEL_DIR}"
(cd "${MODEL_DIR}"
curl -OL "${TEST_DATA_URL}/mobilenet_ssd_v2_coco_quant_postprocess_edgetpu.tflite" \
     -OL "${TEST_DATA_URL}/mobilenet_ssd_v2_coco_quant_postprocess.tflite" \
     -OL "${TEST_DATA_URL}/coco_labels.txt")

(cd "${MODEL_DIR}" && \
curl -OL "${TEST_DATA_URL}/inception_v4_299_quant_edgetpu.tflite" \
     -OL "${TEST_DATA_URL}/inception_v4_299_quant.tflite" \
     -OL "${TEST_DATA_URL}/imagenet_labels.txt")

echo "Enter the y/Y to reboot system for the TPU driver work normally and n/N to reboot system later:[y/n]"
while read -r -n1 key
do
        if [ $key = "y" ] || [ $key = "Y" ] ; then
		echo ""
                echo "Reboot System"
		#sudo reboot
                break
        else
                echo "Not reboot"
                break
        fi
done

