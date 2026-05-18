import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import configuration from '../../config/configuration';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    @Inject(configuration.KEY) private readonly configService: ConfigType<typeof configuration>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.mail.host || 'smtp.gmail.com',
      port: this.configService.mail.port || 587,
      secure: this.configService.mail.port === 465,
      auth: {
        user: this.configService.mail.user,
        pass: this.configService.mail.pass,
      },
    });
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: this.configService.mail.from,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP for password reset is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      Logger.error('Error sending email:', error);
    }
  }
}
