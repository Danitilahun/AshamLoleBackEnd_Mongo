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
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDeC+qAFFTTMZaN\no4XiTuBk/3nHinUlo6EThTZ/nOHn5+EzgOO6EbURHsYqDkZutw2MKaNqYB0aE6j+\nkted5s1FHVKe692rGTRWxvC9Y/HCAC3A/B5bzW5Fyi7Lzbv0WB35tIBVXw3hPLL7\nFjRlmLsD4CGEbA1pl+Il9vh3OQWA18pXlrkYLVg882xnrpraCq4vG3WLzyrAmmFt\n6fkTolFv9UEp8cFIkxRZGg/mqddCjvbM4p/STNW9nh/Yaryia7LLMpgbL23Vkoh2\nliwlR3btWfTRdT/u2hpbSt7MKj1jrf366SVoILtqINd9HFYa1op99X7GSpiSIy77\nLhhQfJJrAgMBAAECggEARXiz80OpMHSE1qbRVjd4dJEL8Hbs5QxXcqyMmwuiEHUX\nnA4Y8dflb0hSFslllvE1z2MdqkQNBuIczx1xUYlrMtMUTP2d2pDls7rFinPRKXH1\n3rni47UX6cTytDgXtMC3DC/BsTQuuwhLNUzCswDAjltbETvfTGjFTDyDi4WvJ5qG\nu4Zcdf9jSviaUyHAvBW34Le50TD/tpkmiXNJYG3vHXHhnEpLYJ7BxRmONgT32BnH\nSjCmReYH6N9M06geO7sN1XwfTij0z9GYS/9utATwmO0QagAzp72KNpDQ+q1VH2Wa\n3qAmrRZYfiDpqMQB9iR4LLSNLnJ1BrSTFmr+DQ1tlQKBgQD/ft9QL6LcM2cT1B3R\n+nDxnL1GCvcZcv5Jvv4ngKQ7Ns+PptdmDcVnueKhuEibkNMtj/cjn1Ut8wzZadtv\nnUfA6rD1s1UFaeteh6vQtXMPUJVCNk56JMpagfmg4JSb0uK5YdynCFq5/rXIDFfb\nG1A6EWHC6ocw2x0MMzXGq5dp3QKBgQDefCN2Q02Sj+a78sgtIwOkQgTcWPmqhMbV\nXIJsAWgUBWi//7eygfKoDEaW8agOcPjTsdF6rnp1JZZUP0RcUom45qF/t/kIu0cT\nyjNEdwTx+Tl3W30ZQK+YpPxfxHCfJACoMc8+kPOsxwW1juxPrFAE1l3P7zg0B+6i\npAl3sRl85wKBgFIYMCURyWC724kRhSttL1FTLbYN2+v/eRm1FvEWcq7cI8FiuJ+A\nGUgFAH86OYpS9KgVNDHsBnCnQh+x1eJ9RQsF3ip0nwMIT6qmKVz8kKYBHJST4o94\nttRyIwXAY7/V+Sfb/AxnsM9Gup426RvsINEnuKPqu9nE7gZ3hfX6OMK5AoGAO1up\nZmsMbjbgW3Kpv4kg9pj6jQNcEQd9uP0GeuRhLT5INTl3fDO5VuZ3itwMd1XivTAq\n8G1OlKSjl/SNO4h14BQAMIAX/CFjFD+VMAYFFr3kfBi3pp4gezxBbReO6JaFalpn\nrYykxosO1eK834DclH3Q56IuP4uCOnhDYmCoqS8CgYEA93GrqhCY1dwqFn7Ss0nV\nTlG8YoO+QQrkctjIV+osGrs0MlfzANiJ5WHFmc8Ynn77c6L2zIglFxHuMDDAJ3Fp\nIRN5fyvaCllIPQexAch5tGgVzrauT3H85zdPNCeln6jH/ye7SE2wE9apG/ha1pNR\n6hXs1QB3BMGZBOZPQoYb144=\n-----END PRIVATE KEY-----\n",
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
