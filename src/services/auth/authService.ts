/**
 * Mock Authentication Service for Rinzo Driver App
 * Simulates network requests and API responses.
 */

export interface UserSession {
  token: string;
  driverId: string;
  name: string;
  email: string;
  phone: string;
}

export const authService = {
  /**
   * Log in a driver using email and password.
   */
  loginWithEmail: async (email: string, password: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.toLowerCase().trim();
        
        // Simple mock validation rules
        if (normalizedEmail === 'error@rinzo.com') {
          return reject(new Error('Internal server error. Please try again.'));
        }
        
        if (normalizedEmail === 'driver@rinzo.com' && password === 'password123') {
          resolve({
            token: 'mock-jwt-token-12345',
            driverId: 'drv_9901',
            name: 'Hannan Khan',
            email: 'driver@rinzo.com',
            phone: '9876543210',
          });
        } else {
          reject(new Error('Invalid email or password. Please try again.'));
        }
      }, 1200);
    });
  },

  /**
   * Register a new driver.
   */
  signup: async (name: string, email: string, phone: string, password: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.toLowerCase().trim();
        
        if (normalizedEmail === 'taken@rinzo.com') {
          return reject(new Error('This email address is already registered.'));
        }
        
        resolve({
          token: 'mock-jwt-token-67890',
          driverId: 'drv_9902',
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
        });
      }, 1200);
    });
  },

  /**
   * Request a password reset link for the provided email.
   */
  requestPasswordReset: async (email: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.toLowerCase().trim();
        if (normalizedEmail.includes('@') && normalizedEmail.includes('.')) {
          resolve({
            success: true,
            message: 'Password reset link successfully sent to your email address.',
          });
        } else {
          reject(new Error('Please enter a valid email address.'));
        }
      }, 1200);
    });
  },

  /**
   * Reset password with the new password.
   */
  resetPassword: async (password: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1200);
    });
  },

  /**
   * Send/Resend OTP to phone number.
   */
  sendOTP: async (phone: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },

  /**
   * Verify phone OTP.
   */
  verifyOTP: async (phone: string, otp: string): Promise<UserSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '123456' || otp === '654321') {
          resolve({
            token: 'mock-jwt-token-99887',
            driverId: 'drv_9901',
            name: 'Hannan Khan',
            email: 'driver@rinzo.com',
            phone: phone,
          });
        } else {
          reject(new Error('Invalid OTP. Please enter the correct code.'));
        }
      }, 1200);
    });
  },
};
