import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {}
}
