"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const order_info_dto_1 = require("./order-info.dto");
class UpdateOrderDTO extends (0, swagger_1.PartialType)(order_info_dto_1.OrderInfoDTO) {
}
exports.UpdateOrderDTO = UpdateOrderDTO;
//# sourceMappingURL=update-order.dto.js.map