import { Inject, Injectable, Logger } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { FIREBASE_MESSAGING } from '../constants/firebase.constant';

@Injectable()
export class NotificationService {
  constructor(@Inject(FIREBASE_MESSAGING) private readonly fcm: messaging.Messaging) {}

  async sendPushToToken(
    token: string,
    title: string,
    body: string,

    data?: Record<string, string>,
  ): Promise<{ success: boolean; messageId: string }> {
    const message: messaging.Message = {
      notification: { title, body },
      token,
      data: data || {},
      android: { priority: 'high' },
      apns: { payload: { aps: { sound: 'default', badge: 1 } } },
    };

    try {
      const response = await this.fcm.send(message);
      return { success: true, messageId: response };
    } catch (error) {
      Logger.error('Error enviando notificación:', error, 'NotificationService');
      throw error;
    }
  }
}
