import { EntityTarget, ObjectLiteral } from "typeorm";
import AppDataSource from "../../data-source";
import { Employee } from "../../entities/employeeEntity";
import { Order } from "../../entities/orderEntity";
import { User } from "../../entities/userEntity";
import { AppError } from "../../error";
import { OrderCreate } from "../../interfaces/order.intercaes";

export async function createEmployeeOrUser(
  entity: EntityTarget<ObjectLiteral>,
  id: string
) {
  const entityRepository = AppDataSource.getRepository(entity);
  const findEntity = await entityRepository.findOneBy({ id });

  if (!findEntity) {
    throw new AppError("ID not found", 404);
  }
  return findEntity;
}

export async function createOrderService(order: any, tokenId: string) {
  if (order.employee !== tokenId && order.user !== tokenId) {
    throw new AppError("Must be user same user ID to create order");
  }
  const orderRepository = AppDataSource.getRepository(Order);

  let entity: User | Employee;
  // let newOrder: Order;
  let newOrder: any;
  if (order.user) {
    entity = (await createEmployeeOrUser(User, order.user)) as User;

    const userId = entity.id;
    const newUserOrder = { ...order, user: userId };

    newOrder = orderRepository.create(newUserOrder);
  } else {
    entity = (await createEmployeeOrUser(Employee, order.employee)) as Employee;

    const employeeId = entity.id;
    const newEmployeeOrder = { ...order, employee_id: employeeId };

    newOrder = orderRepository.create(newEmployeeOrder);
  }

  await orderRepository.save(newOrder);

  return newOrder;
}
