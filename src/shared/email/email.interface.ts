export abstract class IEmailService {
  abstract send(
    to: string,
    subject: string,
    from: string,
    html?: string,
  ): Promise<void>;
}
