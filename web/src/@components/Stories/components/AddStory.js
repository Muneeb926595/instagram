import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { Icon } from "@components";
import { lighterImage } from "@helpers/imageCompression";
import { isImage, isVideo } from "@helpers/utils";
import { addStory } from "@store/stories/StoriesActions";

const AddStory = () => {
  const dispatch = useDispatch();
  const uploadFile = async (event) => {
    let file1 = event.target.files[0];
    if (file1.type.split("/")[0] === "image") {
      if (!isImage(file1.type)) {
        toast.error("Choosen image file formate is not supported.");
        return;
      }
    } else if (file1.type.split("/")[0] === "video") {
      if (!isVideo(file1.type)) {
        toast.error("Choosen video file formate is not supported.");
        return;
      }
    } else {
      toast.error("Choosen file formate is not supported.");
      return;
    }
    if (Math.floor(file1.size / 1048576) > 60) {
      toast.error("File size is too big please upload file less then 60MB");
      return;
    }
    if (!isVideo(file1.type)) {
      file1 = await lighterImage(file1);
    }
    dispatch(
      addStory({ userId: localStorage.getItem("userId"), imageFile: file1 })
    );
  };
  const userImage =
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  return (
    <>
      <input
        type="file"
        id="uploadStory1"
        accept="image/*,video/mp4,video/x-m4v,video/*"
        value={""}
        style={{ display: "none" }}
        onChange={uploadFile}
      />
      <label htmlFor="uploadStory1" style={{ cursor: "pointer" }}>
        <div
          className="rounded-lg mr-4 flex-shrink-0 flex-grow flex-nowrap"
          style={{
            maxWidth: "9rem",
            minWidth: "9rem",
            height: "22vh",
            position: "relative",
            backgroundImage: `url(${userImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            className="rounded-lg cursor-pointer "
            style={{
              background:
                "linear-gradient(140deg, rgba(228, 62, 104, 0.7) 0%,  rgba(250, 164, 73, 0.67) 100%)",
              height: "100%",
              position: "absolute",
              top: "0",
              lef: "0",
              right: "0",
              bottom: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Icon type="plus" size="36px" />
          </div>
        </div>
      </label>
    </>
  );
};

export default AddStory;
