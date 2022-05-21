import { useState } from "react";

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    showModal,
    hideModal,
  };
};
export default useModal;
