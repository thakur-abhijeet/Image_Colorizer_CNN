import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "../styles/heroSection.css";
import { AiFillGithub } from "react-icons/ai";

import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import AlertBox from "./AlertBox";

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
  const [changeAlert, setChangeAlert] = useState(false);

  const [alert, setAlert] = useState<{
    type: "error" | "message";
    message: string;
  }>({
    type: "error",
    message: "",
  });

  useEffect(() => {
    (async () => {
      await new Promise((r) => setTimeout(r, 2500));
      setAlert({
        type: "error",
        message: "",
      });
    })();
  }, [changeAlert]);

  const onSubmit = async () => {
    const typesToAccept = ["jpeg", "jpg", "png", "tiff", "jfif"];

    if (!typesToAccept.includes(selectedImage.type.split("/")[1])) {
      setAlert({
        type: "error",
        message: "file type not accepted",
      });
      setChangeAlert((prev) => !prev);
      return;
    }

    const base64 = await convertBase64(selectedImage);

    setLoading(true);
    try {
      const res = await axios.post<string>(
        `${import.meta.env.VITE_SERVER_ENDPOINT}`,
        {
          image: base64.split(",")[1],
          type: selectedImage.type.split("/")[1],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (res.data) {
        setResultb64Image(res.data);
        setAlert({
          type: "message",
          message: "image converted",
        });
        setChangeAlert((prev) => !prev);
      }
    } catch (e) {
      setLoading(false);
      setAlert({
        type: "error",
        message: "failed to connect to servers",
      });
      setChangeAlert((prev) => !prev);
    }
  };

  const onUploadClick = () => {
    inputFileRef.current?.click();
    setResultb64Image(null);
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {alert.message.trim() !== "" && (
        <AlertBox message={alert.message} type={alert.type} />
      )}
      <div className="heroSectionContainer">
        <div className="header">
          <div className="team_logo"></div>
          <div className="github">
            <a
              href="https://github.com/AavashGyawali/image-Colorization"
              target={"_blank"}
            >
              <AiFillGithub size={"4rem"} />
            </a>
          </div>
        </div>
        <div className="content">
          <div className="desc">
            <div className="title">Flower's Image Colorizer</div>
            <div className="sub_title">
              Our AI based image colorizer helps you to colorize any black and
              white images of flowers, automatically using auto encoder. Add
              realistic colors to your black and white photographs of flowers.
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
                  className="display-image"
                  src={URL.createObjectURL(selectedImage)}
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
                    className="display-image"
                    src={`data:image/png;base64,${resultb64Image}`}
                  />
                </div>
              )}
            </div>
          )}
          <div className="learn-more">
            <div className="text">
              <a href="#learn-more" style={{ textDecoration: "none" }}>
                Learn More
              </a>
            </div>
            <a href="#learn-more" style={{ textDecoration: "none" }}>
              <div className="arrow-logo">
                <MdKeyboardArrowDown size={"3rem"} />{" "}
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
