import { useCallback } from "react";
import { message } from "antd";

const useMessage = () => {
  const showMessage = useCallback((msg, type = "info") => {
    message[type](msg);
  }, []); // No dependencies, this callback never changes

  return showMessage;
};

export default useMessage;
