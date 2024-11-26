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
exports.UpdateOrderInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_order_info_dto_1 = require("./create-order_info.dto");
const class_validator_1 = require("class-validator");
class UpdateOrderInfoDto extends (0, swagger_1.PartialType)(create_order_info_dto_1.CreateOrderInfoDto, {
    skipNullProperties: true,
}) {
}
exports.UpdateOrderInfoDto = UpdateOrderInfoDto;
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.someField !== undefined),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrderInfoDto.prototype, "someField", void 0);
//# sourceMappingURL=update-order_info.dto.js.map