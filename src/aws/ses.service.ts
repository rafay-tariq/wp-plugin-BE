import * as AWS from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SesService {
  private ses: AWS.SES;

  constructor() {
    this.ses = new AWS.SES({
      // accessKeyId: process.env.AWS_ACCESS_KEY_ID, // SDK automatically picked up these values from your EC2 instance IAM role
      // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: process.env.SENDER_EMAIL,
    };

    try {
      const result = await this.ses.sendEmail(params).promise();
      Logger.debug(result);
      return result;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }
}
