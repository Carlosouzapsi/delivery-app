const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const STRIPE_KEY = require("../config");

module.exports.nodeMailerConfig = async (email, link) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: testAccount.user,
    to: email,
    subject: "reset password",
    text: `Clique aqui para redefinir sua senha ${link}`,
  };

  return await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

module.exports.createPasswordResetLink = async (payload) => {
  const token = await this.GenerateSignature(payload);
  const resetLink = `http://localhost:4000/reset-password/${token}`;
  return resetLink;
};

// Image Storage Engine
module.exports.ManageUpload = (image_file) => {
  const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
  return upload.single(image_file);
};

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, "jg_youtube_tutorial", { expiresIn: "30d" });
    // return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    // console.log(signature);
    // const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    const payload = await jwt.verify(
      signature.split(" ")[1],
      "jg_youtube_tutorial"
    );
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.createStripeLineItems = async (newOrderId, items) => {
  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "brl",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });
    const stripe = new Stripe(
      "sk_test_51PTm7TP5lvVWbXsyeqjjtLb0VWho4Zw8lkL8Krgwr5nCyxsBTacN21uqzdBwfM28kSwgjphPmluzhHgReIyXTpX300PxutEibY"
    );
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      // verify frontend url
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrderId}`,
      // verify frontend url
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrderId}`,
    });
    const sessionUrl = session.url;
    return sessionUrl;
  } catch (err) {
    console.error(err);
    throw new Error("payment integration error");
  }
};
