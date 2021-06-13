import { useEffect } from "react";

const useOutsideClick = (ref, setNotifications) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setNotifications(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, setNotifications]);
};

export default useOutsideClick;