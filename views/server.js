const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Lưu trữ mã xác nhận tạm thời
let verificationCodes = {};

// Cấu hình tài khoản Gmail để gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Thay bằng email của bạn
    pass: 'your-app-password', // Thay bằng mật khẩu ứng dụng của bạn
  },
});

// Endpoint gửi mã xác nhận
app.post('/send-verification-code', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email là bắt buộc.' });
  }

  // Tạo mã xác nhận (6 chữ số ngẫu nhiên)
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Gửi email
    await transporter.sendMail({
      from: '"Your App" <your-email@gmail.com>',
      to: email,
      subject: 'Mã xác nhận đăng ký tài khoản',
      text: `Mã xác nhận của bạn là: ${verificationCode}`,
      html: `<p>Mã xác nhận của bạn là: <b>${verificationCode}</b></p>`,
    });

    // Lưu mã xác nhận vào bộ nhớ tạm
    verificationCodes[email] = verificationCode;

    return res.json({ message: 'Mã xác nhận đã được gửi.' });
  } catch (error) {
    console.error('Lỗi khi gửi email:', error);
    return res.status(500).json({ message: 'Không thể gửi email xác nhận.' });
  }
});

// Endpoint xác minh mã xác nhận
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email và mã xác nhận là bắt buộc.' });
  }

  const storedCode = verificationCodes[email];

  if (storedCode && storedCode === code) {
    // Xóa mã sau khi xác minh thành công
    delete verificationCodes[email];
    return res.json({ message: 'Xác minh thành công!' });
  }

  return res.status(400).json({ message: 'Mã xác nhận không đúng hoặc đã hết hạn.' });
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
