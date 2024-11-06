"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEngineerInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_engineer_info_dto_1 = require("./create-engineer-info.dto");
class UpdateEngineerInfoDto extends (0, swagger_1.PartialType)(create_engineer_info_dto_1.CreateEngineerInfoDto) {
}
exports.UpdateEngineerInfoDto = UpdateEngineerInfoDto;
//# sourceMappingURL=update-engineer-info.dto.js.map