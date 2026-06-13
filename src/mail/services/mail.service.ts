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

  private getOtpEmailTemplate(otp: string, email: string): string {
    const otpPart1 = otp.slice(0, 3);
    const otpPart2 = otp.slice(3, 6);
    const currentYear = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Código de Acceso - Norita</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 0; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f9fafb;">
    <tr>
      <td align="center">
        <table width="100%" max-width="500" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 500px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="padding: 24px; border-bottom: 1px solid #f0f0f0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="left" style="font-weight: bold; font-size: 18px; color: #111;">
                    <img src="https://api.norita-app.com/files/image/logo_original_norita.png" width="32" height="32" alt="Norita Logo" style="vertical-align: middle; margin-right: 8px; border-radius: 6px; display: inline-block;" />
                    <span style="vertical-align: middle;">Norita</span>
                  </td>
                  <td align="right" style="font-size: 12px; color: #888; letter-spacing: 1px; text-transform: uppercase;">
                    RECUPERACIÓN DE CONTRASEÑA
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 16px 0; color: #111;">Tu código de recuperación</h1>
              <p style="font-size: 15px; color: #555; line-height: 1.5; margin: 0 0 32px 0;">Usa el siguiente código para restablecer la contraseña de tu cuenta de Norita. Caduca en 10 minutos.</p>
              
              <!-- Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f6f8fa; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td align="center" style="padding: 32px 24px;">
                    <p style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 40px; font-weight: 600; letter-spacing: 8px; color: #111; margin: 0 0 16px 0;">
                      ${otpPart1}&nbsp;${otpPart2}
                    </p>
                    <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0;">
                      EXPIRA EN <span style="color: #FF4081; font-weight: 600;">10 MINUTOS</span>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Warning Box -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f6f8fa; border-radius: 8px; border: 1px solid #eaecef; margin-bottom: 8px;">
                <tr>
                  <td style="padding: 16px; font-size: 13px; color: #555; line-height: 1.5;">
                    <strong style="color: #111;">¿No solicitaste esto?</strong> Alguien pudo haber escrito tu correo por error. Ignora este mensaje — nadie puede cambiar tu contraseña sin este código.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 24px;">
              <div style="height: 1px; background-color: #f0f0f0;"></div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; font-size: 13px; color: #888;">
              Solicitado para <span style="color: #00E5FF;">${email}</span>
            </td>
          </tr>
          
          <!-- Bottom -->
          <tr>
            <td style="background-color: #f6f8fa; padding: 24px; font-size: 12px; color: #888;">
              Norita · <a href="https://norita-app.com" style="color: #888; text-decoration: underline;">norita.app</a><br><br>
              © ${currentYear} Norita
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  private getFarewellEmailTemplate(username: string, email: string): string {
    const currentYear = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hasta pronto - Norita</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 0; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f9fafb;">
    <tr>
      <td align="center">
        <table width="100%" max-width="500" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 500px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; margin: 0 auto;">
          <!-- Header -->
          <tr>
            <td style="padding: 24px; border-bottom: 1px solid #f0f0f0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="left" style="font-weight: bold; font-size: 18px; color: #111;">
                    <img src="https://api.norita-app.com/files/image/logo_original_norita.png" width="32" height="32" alt="Norita Logo" style="vertical-align: middle; margin-right: 8px; border-radius: 6px; display: inline-block;" />
                    <span style="vertical-align: middle;">Norita</span>
                  </td>
                  <td align="right" style="font-size: 12px; color: #888; letter-spacing: 1px; text-transform: uppercase;">
                    HASTA PRONTO
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 16px 0; color: #111;">Tu cuenta ha sido eliminada</h1>
              <p style="font-size: 15px; color: #555; line-height: 1.5; margin: 0 0 24px 0;">
                Hola <strong style="color: #111;">${username}</strong>, confirmamos que tu cuenta de Norita asociada a <span style="color: #00E5FF;">${email}</span> ha sido eliminada exitosamente.
              </p>
              <p style="font-size: 15px; color: #555; line-height: 1.5; margin: 0 0 32px 0;">
                Todos tus datos, progreso de lecciones, biblioteca y configuraciones han sido eliminados de nuestros sistemas de forma permanente.
              </p>

              <!-- Farewell Box -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f6f8fa; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td align="center" style="padding: 28px 24px;">
                    <p style="font-size: 32px; margin: 0 0 12px 0;">🌸</p>
                    <p style="font-size: 16px; font-weight: 600; color: #111; margin: 0 0 8px 0;">¡Hasta pronto!</p>
                    <p style="font-size: 14px; color: #666; margin: 0; line-height: 1.5;">
                      Si cambias de opinión, siempre podrás crear una nueva cuenta y continuar aprendiendo con nosotros.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f6f8fa; border-radius: 8px; border: 1px solid #eaecef; margin-bottom: 8px;">
                <tr>
                  <td style="padding: 16px; font-size: 13px; color: #555; line-height: 1.5;">
                    <strong style="color: #111;">¿No solicitaste esto?</strong> Si no eliminaste tu cuenta, por favor contáctanos de inmediato a través de <a href="https://norita-app.com" style="color: #00E5FF; text-decoration: none;">norita.app</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 24px;">
              <div style="height: 1px; background-color: #f0f0f0;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; font-size: 13px; color: #888;">
              Cuenta eliminada: <span style="color: #00E5FF;">${email}</span>
            </td>
          </tr>

          <!-- Bottom -->
          <tr>
            <td style="background-color: #f6f8fa; padding: 24px; font-size: 12px; color: #888;">
              Norita · <a href="https://norita.app" style="color: #888; text-decoration: underline;">norita.app</a><br><br>
              © ${currentYear} Norita
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  async sendFarewellEmail(email: string, username: string): Promise<void> {
    try {
      const htmlContent = this.getFarewellEmailTemplate(username, email);

      const { error } = await this.resend.emails.send({
        from: this.configService.mail.from,
        to: email,
        subject: 'Hasta pronto - Tu cuenta de Norita ha sido eliminada',
        text: `Hola ${username}, tu cuenta de Norita asociada a ${email} ha sido eliminada exitosamente. Todos tus datos han sido eliminados de nuestros sistemas. ¡Hasta pronto!`,
        html: htmlContent,
      });

      if (error) {
        Logger.error('Error sending farewell email via Resend:', error);
      }
    } catch (error) {
      Logger.error('Exception sending farewell email via Resend:', error);
    }
  }

  async sendPasswordResetOtp(email: string, otp: string): Promise<void> {
    try {
      const htmlContent = this.getOtpEmailTemplate(otp, email);

      const { error } = await this.resend.emails.send({
        from: this.configService.mail.from,
        to: email,
        subject: 'Código de acceso - Norita',
        text: `Tu código de acceso es: ${otp}. Expira en 10 minutos.`,
        html: htmlContent,
      });

      if (error) {
        Logger.error('Error sending email via Resend:', error);
      }
    } catch (error) {
      Logger.error('Exception sending email via Resend:', error);
    }
  }
}
