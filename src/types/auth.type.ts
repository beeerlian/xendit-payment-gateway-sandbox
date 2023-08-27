import { SocialLoginProvider } from "../middlewares/validations/auth.validation";

export type SocialLoginAuthData = {
  name: string;
  email: string;
  avatar?: string;
  social_provider: SocialLoginProvider;
  social_credential: string;
};
