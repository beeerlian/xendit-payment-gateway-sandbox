import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { AuthException } from "../../../exceptions";
import { Idb } from "../prisma";

export type PassportProps = {
  idb: Idb;
};
export type UserJWTPayload = {
  id: number;
  uuid: string;
  email: string;
  logged_at: string;
};

export class Passport {
  private idb: Idb;
  public instance: passport.PassportStatic;
  constructor(props: PassportProps) {
    this.idb = props.idb;
    this.initLocalStrategy();
    this.instance = passport;
  }

  private initLocalStrategy() {
    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.APP_SECRET || "unsecured_jwt",
        },
        (payload: UserJWTPayload, callback) => {
          if (payload?.uuid) {
            return callback(null, payload);
          } else {
            return callback(
              new AuthException({
                status: 401,
                name: "UNAUTHORIZED",
                message: "Request unauthorized",
              })
            );
          }
        }
      )
    );

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, callback) => {
          const user = await this.idb.client.users.findFirst({
            where: { email, password },
            select: this.idb.exclude("users", [
              "created_at",
              "updated_at",
              "deleted_at",
              "social_credential",
              "password",
            ]),
          });
          if (user) {
            if (!user.email_verified_at) {
              return callback(
                new AuthException({
                  status: 401,
                  name: "EMAIL_NOT_VERIFIED",
                  message:
                    "Your email hasnt been verified, please verify your account.",
                })
              );
            } else return callback(null, user, { message: "Login success" });
          } else {
            return callback(
              new AuthException({
                status: 401,
                name: "INVALID_CREDENTIAL",
                message: "Invalid email and password",
              })
            );
          }
        }
      )
    );
  }
}
