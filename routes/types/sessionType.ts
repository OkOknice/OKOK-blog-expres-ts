import type { Session } from "express-session";

export interface INewSession extends Session {
  captcha: string;
}
