import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Resend } from 'resend';
import configuration from '../../config/configuration';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(
    @Inject(configuration.KEY) private readonly configService: ConfigType<typeof configuration>,
  ) {
    this.resend = new Resend(this.configService.resend.apiKey);
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    try {
      const { error } = await this.resend.emails.send({
        from: this.configService.mail.from,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your OTP for password reset is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
      });

      if (error) {
        Logger.error('Error sending email via Resend:', error);
      }
    } catch (error) {
      Logger.error('Exception sending email via Resend:', error);
    }
  }
}
