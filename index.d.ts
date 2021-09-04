declare module "yotest-web-sdk" {
  type Option = {
    accessId: string;
    product?: "float" | "popup" | "bind" | "custom" | string;
    area?: string;
    bgColor?: string;
    enforced?: boolean;
  };

  export type ValidateResult = {
    token: string | null;
    verified: boolean;
  };

  export type ValidateError = {
    code: number;
    message: string;
  };

  export interface Captcha {
    appendTo(selector: string): this;
    getValidate(): ValidateResult;
    reset(): this;
    verify(): this;
    onReady(callback: () => void): this;
    onSuccess(callback: (result: ValidateResult) => void): this;
    onError(callback: (error: ValidateError) => void): this;
    onClose(callback: () => void): this;
    destroy(): void;
  }

  export default function initYoTest(option: Option, callback: (captcha: Captcha | null) => void): Captcha | void;
}
