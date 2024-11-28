"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAuthDTO = void 0;
const create_auth_dto_1 = require("./create-auth.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterAuthDTO extends (0, swagger_1.PartialType)(create_auth_dto_1.CreateAuthDto) {
}
exports.RegisterAuthDTO = RegisterAuthDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'admin_id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterAuthDTO.prototype, "admin_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'admin_pw' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterAuthDTO.prototype, "admin_pw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'role' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterAuthDTO.prototype, "role", void 0);
//# sourceMappingURL=register-auth.dto.js.map