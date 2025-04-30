import { useState } from "react";
import "./App.css";
import axios from "axios";
import HeroSection from "./components/HeroSection";
import InfoHolder from "./components/InfoHolder";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <HeroSection />
        <div id="learn-more">
          <InfoHolder title="General Explanation">
            <p>
              Image colorization is the process of adding color to a grayscale
              image. It is a challenging task in computer vision since it
              requires the network to understand the relationship between the
              grayscale and colored version of the same image.
            </p>
            <br />
            <p>
              One approach to this task is to use a convolutional neural network
              (CNN) autoencoder, which is a type of neural network that learns
              to encode the input image into a lower-dimensional representation
              and then decode it back into the output image. To train a CNN
              autoencoder for image colorization, the input image is first
              converted from the RGB color space to the LAB color space. LAB
              color space separates the color information from the brightness
              information, making it easier for the network to learn the
              colorization task. The grayscale image is used as the input to the
              encoder CNN, which learns to compress the image into a
              lower-dimensional feature representation. The encoded features are
              then decoded by the decoder CNN, which generates the colorized
              image.
            </p>
            <br />
            <p>
              The network is trained on a large dataset of colored images and
              their corresponding grayscale and LAB versions. During training,
              the network learns to minimize the difference between the
              predicted and ground-truth color images using a loss function such
              as mean squared error. By doing so, the network learns to predict
              the correct color information for each pixel in the grayscale
              image.
            </p>
            <br />
            <p>
              Once the network is trained, it can be used to colorize new
              grayscale images. To colorize a new image, the grayscale image is
              first encoded by the encoder CNN, producing a lower-dimensional
              feature representation. The feature representation is then decoded
              by the decoder CNN, generating a colorized LAB image. Finally, the
              LAB image is converted back to the RGB color space to obtain the
              final colorized image.
            </p>
            <br />
            <p>
              Learn More
              <a
                href="https://blog.floydhub.com/colorizing-b-w-photos-with-neural-networks/?fbclid=IwAR3Nqy2e3gj8ROQWe0HJwQgZbx2nabZJTWEYLYeSdiya_p5-qIdd2btAmPg"
                target={"_blank"}
              >
                <b> Here</b>
              </a>
            </p>
          </InfoHolder>
        </div>
      </div>
      <footer>
        <h2>Made By</h2>
        <ul>
          <li>Aakash Khanal</li>
          <li>Aavash Gyawali</li>
          <li>Abhijeet Thakur</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
