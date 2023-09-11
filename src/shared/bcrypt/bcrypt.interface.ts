export abstract class IBcrypt {
  abstract validatePassword(password: string, hash: string): Promise<boolean>;
  abstract hash(password: string, salt: number): Promise<string>;
}
