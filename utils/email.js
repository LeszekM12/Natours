const sgMail = require('@sendgrid/mail');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Leszek Mikrut <${process.env.EMAIL_FROM}>`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(template, subject) {
    // 1) Render HTML z Pug
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Opcje maila
    const msg = {
      to: this.to,
      from: this.from,
      subject,
      html,
      text: htmlToText(html)
    };

    // 3) Wyślij maila przez SendGrid API
    try {
      await sgMail.send(msg);
      console.log('✅ Email send to:', this.to);
    } catch (err) {
      console.error('❌ Email send error:', err.response?.body || err);
      throw err;
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
