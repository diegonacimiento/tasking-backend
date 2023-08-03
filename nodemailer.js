import nodemailer from "nodemailer";

async function sendMail() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "diegonacimientoJWT@gmail.com",

      pass: "zicmkpfoqlcxssuf",
    },
  });

  let info = await transporter.sendMail({
    from: 'diegonacimientoJWT@gmail.com',
    to: "diegonacimiento18@gmail.com",
    subject: "Recuperación de contraseña",
    html: "<b>Hola Diego</b>",
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
sendMail();
