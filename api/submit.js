// 发送邮件需要的库（Vercel 自动安装，不用你管）
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '仅允许 POST 请求' });
  }

  try {
    // 1. 获取前端提交的表单数据
    const body = JSON.parse(req.body);
    const name = body.name;
    const msg = body.msg;

    // ==========================================
    // 2. 配置发邮件（这里只需要改你的邮箱）
    // ==========================================
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',         // QQ 邮箱
      port: 465,
      secure: true,
      auth: {
        user: '你的QQ邮箱@qq.com',   // 👈 改成你的邮箱
        pass: 'QQ邮箱授权码',        // 👈 改成你的授权码（我下面教你拿）
      },
    });

    // 3. 邮件内容
    const mailOptions = {
      from: `"网站留言" <你的QQ邮箱@qq.com>`, // 👈 改这里
      to: '你的QQ邮箱@qq.com',               // 👈 改这里（收到邮件的邮箱）
      subject: '你的网站收到新留言！',
      text: `名字：${name}\n留言：${msg}`,
    };

    // 4. 发送邮件
    await transporter.sendMail(mailOptions);

    // 5. 返回成功
    res.status(200).json({
      message: '留言提交成功！我会尽快回复你～',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '提交失败，请稍后再试' });
  }
}