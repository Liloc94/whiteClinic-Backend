"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEngineerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_engineer_dto_1 = require("./create-engineer.dto");
class UpdateEngineerDto extends (0, swagger_1.PartialType)(create_engineer_dto_1.CreateEngineerDto) {
}
exports.UpdateEngineerDto = UpdateEngineerDto;
//# sourceMappingURL=update-engineer.dto.js.map