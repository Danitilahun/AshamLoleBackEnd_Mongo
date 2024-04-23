const { Storage } = require("@google-cloud/storage");

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
  private_key:
    "",
};

const storage = new Storage({
  credentials: serviceAccount,
});

const uploadProfileImage = async (profileImage, uuid, collection) => {
  if (!profileImage || profileImage.size === 0) {
    console.log("empty image");
    return ""; // Empty image URL
  }

  const downLoadPath =
    "https://firebasestorage.googleapis.com/v0/b/crud-e108b.appspot.com/o/";
  const bucket = storage.bucket("gs://crud-e108b.appspot.com/");

  try {
    const imageResponse = await bucket.upload(profileImage.path, {
      destination: `${collection}/${profileImage.name}`,
      resumable: true,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });

    return (
      downLoadPath +
      encodeURIComponent(imageResponse[0].name) +
      "?alt=media&token=" +
      uuid
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload image.");
  }
};

module.exports = uploadProfileImage;
