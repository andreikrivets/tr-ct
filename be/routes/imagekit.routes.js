const { Router } = require('express')
const ImageKit = require("imagekit");
const fs = require('fs');

const router = Router()

const imagekit = new ImageKit({
  publicKey : process.env.IK_KEY_PUBLIC,
  privateKey : process.env.IK_KEY_PRIVATE,
  urlEndpoint : process.env.IK_URL_ENDPOINT
});


router.get(
  '/auth',
  [],
  async(req, res) => {
    try {
      console.log(req.body)
      const authenticationParameters = imagekit.getAuthenticationParameters();
      const { token, expire, signature} = authenticationParameters
      res.status(200).json({token, expire, signature})

    } catch (e) {
      res.status(500).json({ message: e.message })
    }
})


module.exports = router