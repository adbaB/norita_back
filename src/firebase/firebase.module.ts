import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as admin from 'firebase-admin';
import config from 'src/config/configuration';
import { FIREBASE_ADMIN_INJECT, FIREBASE_MESSAGING } from './constants/firebase.constant';
import { NotificationService } from './service/notification.service';

@Global()
@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN_INJECT,
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>): admin.app.App => {
        const { project_id, client_email, private_key } = configService.google.firebase;
        if (!project_id || !client_email || !private_key) {
          throw new Error(
            'Firebase configuration is incomplete. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY env vars.',
          );
        }

        const firebaseConfig: admin.ServiceAccount = {
          projectId: project_id,
          clientEmail: client_email,
          privateKey: private_key?.replace(/\\n/g, '\n'),
        };

        return admin.apps.length
          ? admin.app()
          : admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });
      },
    },
    {
      provide: FIREBASE_MESSAGING,
      inject: [FIREBASE_ADMIN_INJECT],
      useFactory: (app: admin.app.App): admin.messaging.Messaging => app.messaging(),
    },
    NotificationService,
  ],
  exports: [FIREBASE_ADMIN_INJECT, FIREBASE_MESSAGING, NotificationService],
})
export class FirebaseModule {}
