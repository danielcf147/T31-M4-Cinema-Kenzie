import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  OrderCreate,
  OrderProductCreate,
} from "../../interfaces/order/order.intercaes";

const orderProductCreateSerializer: SchemaOf<OrderProductCreate> = yup
  .object()
  .shape({
    id: yup.string().required(),
    total: yup.number().required(),
  });

const orderCreateSerializer: SchemaOf<OrderCreate> = yup.object().shape({
  employee_id: yup.string().uuid().notRequired(),
  user_id: yup.string().uuid().notRequired(),
  food: yup.array(orderProductCreateSerializer),
  status: yup.string().required(),
  total: yup.number().required(),
});

export { orderCreateSerializer };
