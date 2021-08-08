import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { useOutsideClick } from "@customeHooks";
import { Avatar, Clickable, Loader } from "@components";

const useStyles = makeStyles(() => ({
  triangleUp: {
    position: "absolute",
    top: "-4.2%",
    width: "1px",
    height: "0px",
    left: "45%",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "20px solid #fff",
  },
}));

const SearchResult = ({ closeModal }) => {
  const classes = useStyles();
  const history = useHistory();
  const wrapperRef = useRef(null);

  const { users, loading } = useSelector(({ Foodbook }) => Foodbook.search);

  useOutsideClick(wrapperRef, () => {
    closeModal();
  });

  return (
    <div
      className="p-4 absolute bg-white rounded-lg "
      ref={wrapperRef}
      style={{
        zIndex: 1000,
        height: "32vh",
        width: "20vw",
        top: "10%",
        left: "19%",
        boxShadow: "0px 0px 20px #dbdbdb",
      }}
    >
      <div className={classes.triangleUp}></div>
      {loading ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {users?.length > 0 &&
            users?.map((singleUser) => (
              <Clickable
                onClick={() =>
                  history.push({
                    pathname: "/profile",
                    state: { userId: singleUser?._id },
                  })
                }
              >
                <div
                  className="flex flex-row items-center mb-3 pb-2"
                  style={{ borderBottom: "1px solid #dbdbdb" }}
                >
                  <Avatar uri={singleUser?.image} size="60" noCircle />
                  <div>
                    <p className="ml-3 font-semibold font-sans text-sm">
                      {singleUser?.userName}
                    </p>
                    <p
                      className="ml-3 
                 font-sans text-sm"
                    >
                      {singleUser?.email}
                    </p>
                  </div>
                </div>
              </Clickable>
            ))}
        </>
      )}
    </div>
  );
};

export default SearchResult;
