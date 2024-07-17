import { regex } from "../../config";

export class LoginDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!regex.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password too short"];

    return [undefined, new LoginDto(email, password)];
  }
}
