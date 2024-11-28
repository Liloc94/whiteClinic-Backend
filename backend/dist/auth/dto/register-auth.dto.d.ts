import { CreateAuthDto } from './create-auth.dto';
declare const RegisterAuthDTO_base: import("@nestjs/common").Type<Partial<CreateAuthDto>>;
export declare class RegisterAuthDTO extends RegisterAuthDTO_base {
    readonly admin_id: string;
    readonly admin_pw: string;
    readonly role: string;
}
export {};
