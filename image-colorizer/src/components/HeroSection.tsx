import React, { ChangeEvent, useRef, useState } from "react";
import "../styles/heroSection.css";
import { AiFillGithub } from "react-icons/ai";

import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";

const convertBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

const HeroSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [resultb64Image, setResultb64Image] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    // console.log(file.type.split("/")[1]);

    const base64 = await convertBase64(selectedImage);

    setLoading(true);
    const res = await axios.post<string>(
      `http://113e-34-171-191-42.ngrok.io`,
      {
        image: base64.split(",")[1],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    console.log(typeof res.data);
    if (res.data) {
      setResultb64Image(res.data);
    }
  };

  const onUploadClick = () => {
    inputFileRef.current?.click();
    setResultb64Image(null);
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="heroSectionContainer">
      <div className="header">
        <div className="team_logo">TEAM NAME</div>
        <div className="github">
          <AiFillGithub size={"4rem"} />
        </div>
      </div>
      <div className="content">
        <div className="desc">
          <div className="title">Image Colorizer</div>
          <div className="sub_title">
            Our AI based image colorizer helps you to colorize black and white
            images, automatically . Add realistic colors to your black and white
            photographs
          </div>
        </div>
        <input
          className="file-uploader"
          type={"file"}
          ref={inputFileRef}
          onChange={(e) => {
            if (e.target.files) {
              setSelectedImage(e.target.files[0]);
            }
          }}
        />
        {selectedImage === null && (
          <div className="uploader">
            <button onClick={onUploadClick}>Upload an Image</button>
          </div>
        )}

        {selectedImage !== null && (
          <div className="displayContainer">
            <div className="display">
              <img
                src={URL.createObjectURL(selectedImage)}
                width={256}
                height={256}
              />
              <div className="change-image" onClick={onUploadClick}>
                Change Image
              </div>
            </div>
            <button
              className="convertBtn"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Convert Image"}
            </button>
            {resultb64Image !== null && (
              <div className="outputDisplay">
                <img
                  src={`data:image/png;base64,${resultb64Image}`}
                  width={256}
                  height={256}
                />
              </div>
            )}
          </div>
        )}
        <div className="learn-more">
          <div className="text">Learn More</div>
          <div className="arrow-logo">
            <MdKeyboardArrowDown size={"3rem"} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
