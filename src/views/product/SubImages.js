import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { uploadImageWithStatus } from "src/services/image";
import { useEffect } from "react";

const SubImages = ({ setSubImages, subImages }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleUploadAvatar = (e) => {
    uploadImageWithStatus(e.file.name, e.file, setAvatarURL);
  };

  const handleRemove = (e) => {
    setSubImages(subImages.filter((item) => item.id != e.id));
  };

  useEffect(() => {
    if (avatarURL) {
      setSubImages([
        ...subImages.filter((item) => item.status == "done"),
        {
          id: subImages.length,
          name: `Image ${subImages.length}`,
          status: avatarURL.status,
          url: avatarURL.url,
        },
      ]);
    }
  }, [avatarURL]);

  const UploadBtn = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={subImages}
        onPreview={handlePreview}
        customRequest={handleUploadAvatar}
        onRemove={handleRemove}
      >
        {subImages.length >= 8 ? null : UploadBtn}
      </Upload>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          id="FUCK_ME_NOW"
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default SubImages;
