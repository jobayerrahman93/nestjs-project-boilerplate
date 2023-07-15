import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { allStrings } from '../miscellaneous/constants';

class Lib {
  private static configService = new ConfigService();

  public static async hashPass(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * verify password
   */
  public static async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // create token
  public static createToken(
    creds: object,
    secret: string,
    maxAge: number | string,
  ) {
    // console.log(creds, secret, maxAge);
    return sign(creds, secret, { expiresIn: maxAge });
  }

  // verify token
  public static verifyToken(token: string, secret: string) {
    try {
      return verify(token, secret);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // generate random Number

  public static otpGenNumber(length: number) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      otp += numbers[randomNumber];
    }

    return otp;
  }

  // generate random Number and alphabet
  public static otpGenNumberAndAlphabet(length: number) {
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      otp += allStrings[randomNumber];
    }

    return otp;
  }

  // send email by nodemailer
  public static async sendEmail(
    email: string,
    emailSub: string,
    emailBody: string,
  ) {
    try {
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: Lib.configService.get('APPSETTING_EMAIL_SEND_EMAIL_ID'),
          pass: Lib.configService.get('APPSETTING_EMAIL_SEND_PASSWORD'),
        },
      });

      const info = await transporter.sendMail({
        from: Lib.configService.get('APPSETTING_EMAIL_SEND_EMAIL_ID'),
        to: email,
        subject: emailSub,
        html: emailBody,
      });

      console.log('Message send: %s', info);

      return true;
    } catch (err: any) {
      console.log({ err });
      return false;
    }
  }

  // getnerate email otp html
  public static generateHtmlOtpPage(otp: string, otpFor: string) {
    return `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ZERO4SPORTS OTP VERIFY</title>
    </head>
    <body
      style="
        font-family: Helvetica, Arial, sans-serif;
        margin: 0px;
        padding: 0px;
        background-color: #ffffff;
      "
    >
      <table
        role="presentation"
        style="
          width: 100%;
          border-collapse: collapse;
          border: 0px;
          border-spacing: 0px;
          font-family: Arial, Helvetica, sans-serif;
          background-color: rgb(239, 239, 239);
        "
      >
        <tbody>
          <tr>
            <td
              align="center"
              style="padding: 1rem 2rem; vertical-align: top; width: 100%"
            >
              <table
                role="presentation"
                style="
                  max-width: 600px;
                  border-collapse: collapse;
                  border: 0px;
                  border-spacing: 0px;
                  text-align: left;
                "
              >
                <tbody>
                  <tr>
                    <td style="padding: 40px 0px 0px">
                      <div style="text-align: left">
                        <div style="padding-bottom: 20px">
                          <img
                            src="https://www.ZERO4SPORTS.org.bd/images/logo.png"
                            alt="ZERO4SPORTS Logo"
                            style="width: 100px"
                          />
                        </div>
                      </div>
                      <div
                        style="
                          padding: 20px;
                          background-color: rgb(255, 255, 255);
                        "
                      >
                        <div style="color: rgb(0, 0, 0); text-align: left">
                          <h1 style="margin: 1rem 0">Verification code</h1>
                          <p style="padding-bottom: 16px">
                            Please use the verification code below to ${otpFor}.
                          </p>
                          <p style="padding-bottom: 16px">
                            <strong style="font-size: 130%">${otp}</strong>
                          </p>
                          <p style="padding-bottom: 16px">
                            Validity for OTP is 3 minutes
                          </p>
                          <p style="padding-bottom: 16px">
                            Thanks,<br />
                            <b
                              >ZERO4SPORTS</b
                            >
                          </p>
                        </div>
                      </div>
                      <div
                        style="
                          padding-top: 20px;
                          color: rgb(153, 153, 153);
                          text-align: center;
                        "
                      >
                        <a href="https://www.ZERO4SPORTS.org.bd" style="padding-bottom: 16px; text-decoration: none; font-weight: bold;">www.ZERO4SPORTS.org.bd<a/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
  }
}
export default Lib;
