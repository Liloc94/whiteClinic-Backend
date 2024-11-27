"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_order_info_dto_1 = require("./create-order_info.dto");
class UpdateOrderInfoDto extends (0, swagger_1.PartialType)(create_order_info_dto_1.CreateOrderInfoDto, {
    skipNullProperties: true,
}) {
}
exports.UpdateOrderInfoDto = UpdateOrderInfoDto;
//# sourceMappingURL=update-order_info.dto.js.map