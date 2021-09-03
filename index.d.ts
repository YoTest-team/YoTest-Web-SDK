declare module "yotest-web-sdk" {
  type Option = {
    accessId: String;
    product?: "float" | "popup" | "bind" | "custom";
    area?: String;
    bgColor?: String;
    enforced?: Boolean;
  };

  export type ValidateResult = {
    token: String | null;
    verified: Boolean;
  };

  export type ValidateError = {
    code: Number;
    message: String;
  };

  export interface Captcha {
    appendTo(selector: String): this;
    getValidate(): ValidateResult;
    reset(): this;
    verify(): this;
    onReady(callback: () => void): this;
    onSuccess(callback: (result: ValidateResult) => void): this;
    onError(callback: (error: ValidateError) => void): this;
    onClose(callback: () => void): this;
    destroy(): void;
  }

  export function initYoTest(option: Option, callback: (captcha: Captcha | null) => void): Captcha | void;
}
