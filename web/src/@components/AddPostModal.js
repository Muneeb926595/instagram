import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CustomModal, Icon } from "@components";
import { lighterImage } from "@helpers/imageCompression";
import { setShowAddPostModal } from "@store/modals/ModalsActions";
import { createPost } from "@store/post/PostActions";

const AddPostModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const { addPostModal } = useSelector(({ Foodbook }) => Foodbook.modals);

  useEffect(() => {
    if (files?.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [files]);

  const isVideo = (type) => {
    const mimeTypes = [
      "video/mp4",
      "video/x-flv",
      "video/MP2T",
      "video/3gpp",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
    ];
    return mimeTypes.includes(type);
  };

  const isImage = (type) => {
    const mimeTypes = ["image/gif", "image/jpeg", "image/png"];
    return mimeTypes.includes(type);
  };

  const uploadFile = (event) => {
    let pickedFiles = event.target.files;

    if (files) {
      setFiles([...files, ...pickedFiles]);
    } else {
      setFiles([...pickedFiles]);
    }
  };

  const closeModal = () => {
    dispatch(
      setShowAddPostModal({
        isVisible: false,
        modalPayload: {},
      })
    );
  };

  const handleSubmitPost = async () => {
    for (let i = 0; i < files.length; i++) {
      if (isImage(files[i].type)) {
        let newfile = await lighterImage(files[i]);
        files[i] = newfile;
      }
    }
    dispatch(
      createPost({
        userId: localStorage.getItem("userId"),
        imageFile: files,
        history: history,
      })
    );
  };

  return (
    <CustomModal
      onCloseModal={closeModal}
      showModal={addPostModal.isVisible}
      veryDark
    >
      <div
        className="flex flex-col p-10 bg-white rounded-xl items-center"
        style={{ minWidth: "30vw" }}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-bold font-sans text-gray-600 text-lg">Add Post</p>
          <div className="cursor-pointer" onClick={closeModal}>
            <Icon type="cancel" size="24px" />
          </div>
        </div>
        <div className="flex flex-row items-center mt-6">
          {files?.length > 0 ? (
            <div className="flex flex-row overflow-scroll overflow-y-hidden no-scrollbar">
              {files?.length > 0 &&
                files.map((image) => (
                  <div className="flex flex-row flex-wrap relative mr-2 p-2">
                    <div style={{ width: "80px", height: "80px" }}>
                      {isVideo(image && image.type) ? (
                        <video width="100%" height="100%" controls>
                          <source
                            src={URL.createObjectURL(image)}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          alt="recipeImage"
                          src={URL.createObjectURL(image)}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "16px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>{" "}
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (image) {
                          let newarr = files.filter(
                            (rm) => rm.name !== image.name
                          );
                          setFiles(newarr);
                        }
                      }}
                    >
                      <Icon type="red-cancel" size="18" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              <input
                type="file"
                id="uploadImages"
                accept="image/*,video/mp4,video/x-m4v,video/*"
                style={{ display: "none" }}
                value={""}
                multiple={true}
                onChange={uploadFile}
              />
              <label htmlFor="uploadImages">
                <div
                  className=" flex flex-col justify-center items-center rounded-lg mr-6 flex-shrink-0 flex-grow flex-nowrap border-2 border-gray-300 cursor-pointer "
                  style={{
                    maxWidth: "9rem",
                    minWidth: "9rem",
                    height: "18vh",
                  }}
                >
                  <Icon type="add-images" size="40px" />
                  <p className=" font-bold font-sans text-gray-400 text-sm mt-8">
                    Add Images
                  </p>
                </div>
              </label>
            </>
          )}
        </div>
        <buton
          onClick={isDisabled ? null : handleSubmitPost}
          className="cursor-pointer mt-6 py-2 px-32 rounded-3xl text-white  text-lg font-sans font-semibold "
          style={{
            background: isDisabled
              ? "gray"
              : "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
          }}
        >
          Post
        </buton>
      </div>
    </CustomModal>
  );
};

export default AddPostModal;
