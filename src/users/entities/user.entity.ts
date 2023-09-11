import { v4 } from 'uuid';
import { Replace } from 'src/shared/replace';

export interface UserProps {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  salt: number;
  isEmailVerified: boolean;
  accountAccessFailCount: number;
  emailConfirmToken: string;
  resetPasswordStamp: string;
  resetPasswordDate: Date;
}

export class User {
  public props: UserProps;
  private _id: string;

  constructor(
    props: Partial<UserProps> = {}, // @TODO: Fix this. email, name, password and salt are required parameters!!
    id?: string,
  ) {
    this._id = !id ? v4() : id;

    this.props = {
      name: props.name || '', // Provide default values for all properties
      email: props.email || '',
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      password: props.password || '',
      isEmailVerified: props.isEmailVerified || false,
      salt: props.salt,
      emailConfirmToken: props.emailConfirmToken,
      resetPasswordDate: props.resetPasswordDate,
      resetPasswordStamp: props.resetPasswordStamp,
      accountAccessFailCount: props.accountAccessFailCount,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  public set isEmailVerified(isEmailVerified: boolean) {
    this.props.isEmailVerified = isEmailVerified;
  }

  public setUpdatedAt() {
    this.props.updatedAt = new Date();
  }

  public setCreatedAt() {
    this.props.createdAt = new Date();
  }
}
