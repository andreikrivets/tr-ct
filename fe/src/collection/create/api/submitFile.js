import env from "react-dotenv";

const submitFile = async (file) => {
  const url = "https://upload.imagekit.io/api/v1/files/upload";
  const publicKey = env.IK_KEY_PUBLIC;
  const authEndpoint = "/api/ik/auth";

  const params = await fetch(authEndpoint);
  const json = await params.json();
  const { expire, signature, token } = json;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("expire", expire);
  formData.append("signature", signature);
  formData.append("token", token);
  formData.append("publicKey", publicKey);

  const post = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return post;
};
export default submitFile;
