"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRegistrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_registration_dto_1 = require("./create-registration.dto");
class UpdateRegistrationDto extends (0, swagger_1.PartialType)(create_registration_dto_1.CreateRegistrationDto) {
}
exports.UpdateRegistrationDto = UpdateRegistrationDto;
//# sourceMappingURL=update-registration.dto.js.map