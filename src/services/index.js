const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

exports.sendMail =  async (email, token) => {
  var message = {
    to: email,
    from: "passwordReset@demo.com",
    subject: "Confrim Email",
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:
      http://localhost:4000/reset?token=${token}
      If you did not request this, please ignore this email and your password will remain unchanged<p>`
  };

  await sgMail.send(message);
};
