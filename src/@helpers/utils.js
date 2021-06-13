import ReactGA from "react-ga";
import _clone from "lodash/clone";
import _escapeRegExp from "lodash/escapeRegExp";
import _uniqBy from "lodash/uniqBy";

export const isVideo = (type) => {
  const mimeTypes = [
    "video/mp4",
    "video/x-flv",
    "video/MP2T",
    "	video/3gpp",
    "video/quicktime",
    "	video/x-msvideo",
    "	video/x-ms-wmv",
  ];
  return mimeTypes.includes(type);
};
export const isImage = (type) => {
  const mimeTypes = ["image/gif", "image/jpeg", "image/png"];
  return mimeTypes.includes(type);
};

export const pageAnalytics = (window) => {
  if (process.env.REACT_APP_IS_PRODUCTION === "true") {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

export function swapTags(text) {
  let displayText = _clone(text);
  const tags = text.match(/@{{[^}]+}}/gi) || [];
  tags.map((myTag) => {
    const tagData = myTag.slice(3, -2);
    const tagDataArray = tagData.split("||");
    const tagDisplayValue = tagDataArray[2];
    displayText = displayText.replace(
      new RegExp(_escapeRegExp(myTag), "gi"),
      "@" + tagDisplayValue
    );
    return null;
  });
  return displayText;
}

export function getUsersFromTags(text) {
  const tags = text.match(/@{{[^}]+}}/gi) || [];
  const allUserIds = tags.map((myTag) => {
    const tagData = myTag.slice(3, -2);
    const tagDataArray = tagData.split("||");
    return { _id: tagDataArray[1], name: tagDataArray[2] };
  });
  return _uniqBy(allUserIds, (myUser) => myUser._id);
}

export const checkImageExist = (imageUrl) => {
  let request = new XMLHttpRequest();

  request.open("HEAD", imageUrl, false);
  request.send();
  return request.status !== 404;
};
