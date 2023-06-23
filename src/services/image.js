import { storage } from "src/firebase";
import { notification } from "antd";
//@params func here is a setState in react hook
export const uploadImage = (filename, file, func) => {
  const uploadTask = storage.ref(`images/${filename}`).put(file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      if (progress == 100) {
        notification.success({
          message: `Notification`,
          description: "Add avatar successfully!",
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          func(url);
        });
    }
  );
};
