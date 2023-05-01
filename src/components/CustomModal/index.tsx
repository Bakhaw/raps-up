import React, { useState } from "react";
import { Button, Modal } from "react-daisyui";

interface CustomModalProps {
  body: React.ReactNode | string;
  closeButton?: React.ReactNode | string;
  header: React.ReactNode | string;
  openButton: React.ReactNode | string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  body,
  closeButton,
  header,
  openButton,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="font-sans">
      <Button onClick={toggleVisible}>{openButton}</Button>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <Modal.Header className="font-bold">{header}</Modal.Header>

        <Modal.Body>{body}</Modal.Body>

        {closeButton && (
          <Modal.Actions>
            <Button onClick={toggleVisible}>{closeButton}</Button>
          </Modal.Actions>
        )}
      </Modal>
    </div>
  );
};

export default CustomModal;
