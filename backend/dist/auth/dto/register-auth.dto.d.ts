import { CreateAuthDto } from './create-auth.dto';
declare const RegisterAuthDTO_base: import("@nestjs/common").Type<Partial<CreateAuthDto>>;
export declare class RegisterAuthDTO extends RegisterAuthDTO_base {
    readonly adminID: string;
    readonly adminPW: string;
    readonly role: string;
}
export {};
