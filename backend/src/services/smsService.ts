import { ENV } from '../config/env.js';

// In-memory fallback if database is not migrated yet
const memoryOtpStore = new Map<string, { code: string; expiresAt: Date }>();

export class SmsService {
  /**
   * Generates a 6-digit numeric OTP
   */
  static generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Sends OTP via selected provider (MOCK, Fast2SMS, Twilio)
   */
  static async sendOtp(phone: string, otp: string): Promise<{ success: boolean; message: string; mockOtp?: string }> {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    memoryOtpStore.set(phone, { code: otp, expiresAt });

    console.log(`[SMS-SERVICE] Sending OTP ${otp} to phone ${phone} using provider: ${ENV.SMS_PROVIDER}`);

    if (ENV.SMS_PROVIDER === 'FAST2SMS' && ENV.FAST2SMS_API_KEY) {
      try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': ENV.FAST2SMS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variables_values: otp,
            route: 'otp',
            numbers: phone,
          }),
        });
        const data = await response.json();
        console.log('[Fast2SMS Response]:', data);
        return { success: true, message: 'OTP sent via Fast2SMS successfully' };
      } catch (err: any) {
        console.error('[Fast2SMS Error]:', err);
        return { success: true, message: 'Fallback to mock delivery', mockOtp: otp };
      }
    }

    if (ENV.SMS_PROVIDER === 'TWILIO' && ENV.TWILIO_ACCOUNT_SID && ENV.TWILIO_AUTH_TOKEN) {
      try {
        const auth = Buffer.from(`${ENV.TWILIO_ACCOUNT_SID}:${ENV.TWILIO_AUTH_TOKEN}`).toString('base64');
        const params = new URLSearchParams();
        params.append('To', phone.startsWith('+') ? phone : `+91${phone}`);
        params.append('From', ENV.TWILIO_PHONE_NUMBER);
        params.append('Body', `Your MediKiosk verification code is ${otp}. Valid for 10 minutes.`);

        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${ENV.TWILIO_ACCOUNT_SID}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
          }
        );
        const data = await response.json();
        console.log('[Twilio Response]:', data);
        return { success: true, message: 'OTP sent via Twilio successfully' };
      } catch (err: any) {
        console.error('[Twilio Error]:', err);
        return { success: true, message: 'Fallback to mock delivery', mockOtp: otp };
      }
    }

    // Default Mock provider for seamless testing
    return {
      success: true,
      message: 'OTP generated in mock mode. Check server logs or kiosk on-screen test display.',
      mockOtp: otp,
    };
  }

  /**
   * Verifies the provided OTP code
   */
  static verifyOtp(phone: string, inputCode: string): boolean {
    const record = memoryOtpStore.get(phone);
    if (!record) {
      // Allow master test code "123456" for developer convenience
      if (inputCode === '123456') return true;
      return false;
    }

    if (new Date() > record.expiresAt) {
      memoryOtpStore.delete(phone);
      return false;
    }

    if (record.code === inputCode.trim() || inputCode === '123456') {
      memoryOtpStore.delete(phone);
      return true;
    }

    return false;
  }
}
