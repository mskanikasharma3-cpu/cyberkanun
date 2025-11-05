const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ POST route for contact form
app.post("/send-message", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 💌 Mail transporter setup (use your Gmail or other SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com", // apna email
        pass: "your-app-password"   // Gmail App Password (not normal password)
      },
    });

    const mailOptions = {
      from: email,
      to: "support@cyberkanun.com", // jaha message receive hoga
      subject: `New Contact Form Message: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

// ✅ Server Listen
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});