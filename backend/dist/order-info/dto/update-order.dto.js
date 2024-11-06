"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_order_dto_1 = require("./create-order.dto");
class UpdateOrderDTO extends (0, swagger_1.PartialType)(create_order_dto_1.CreateOrderDTO) {
}
exports.UpdateOrderDTO = UpdateOrderDTO;
//# sourceMappingURL=update-order.dto.js.map