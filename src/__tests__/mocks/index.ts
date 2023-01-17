import { CategoryProductCreate } from "../../interfaces/category/categoryFood.interface";
import { CategoryMovieCreate } from "../../interfaces/category/categoryMovie.Interface";
import { MovieRegisters } from "../../interfaces/movie/movies.Interfaces";
import { RoomCreate } from "../../interfaces/movie/rooms.Interfaces";
import { OrderCreate } from "../../interfaces/order.intercaes";
import { ProductCreate } from "../../interfaces/products/product.Interface";
import {
  EmployeeRegister as IEmployeeRegister,
  IEmployeeLogin,
} from "../../interfaces/user/empoyee.Interface";
import {
  IUserRequest,
  IUserLogin,
} from "../../interfaces/user/users.Interfaces";

export const mockedUser: IUserRequest = {
  name: "Joana",
  email: "joana@mail.com",
  password: "123456",
  age: 25,
  cpf: "99999999999",
};

export const mockedUser2: IUserRequest = {
  name: "Joao",
  email: "joao@mail.com",
  password: "123456",
  age: 25,
  cpf: "99999999999",
};

export const mockedAdmin: IEmployeeRegister = {
  name: "Felipe",
  registration: "1",
  password: "123456",
  age: 25,
  isAdm: true,
};

export const mockedEmployee: IEmployeeRegister = {
  name: "Pedro",
  registration: "2",
  password: "123456",
  age: 20,
  isAdm: false,
};

export const mockedEmployee2: IEmployeeRegister = {
  name: "Jana",
  registration: "3",
  password: "123456",
  age: 21,
  isAdm: false,
};

export const mockedUserLogin: IUserLogin = {
  email: "joana@mail.com",
  password: "123456",
};

export const mockedUserLogin2: IUserLogin = {
  email: "joao@mail.com",
  password: "123456",
};

export const mockedAdminLogin: IEmployeeLogin = {
  registration: "1",
  password: "123456",
};

export const mockedEmployeeLogin: IEmployeeLogin = {
  registration: "2",
  password: "123456",
};

export const mockedEmployeeLogin2: IEmployeeLogin = {
  registration: "3",
  password: "123456",
};

export const mockedCategoryMovieCreate: CategoryMovieCreate = {
  name: "fantasy",
};

export const mockedCategoryMovieCreate2: CategoryMovieCreate = {
  name: "action",
};

export const mockedCategoryMovieCreate3: CategoryMovieCreate = {
  name: "terror",
};

export const mockedMovieCreate: MovieRegisters = {
  name: "Harry Potter",
  director: "J.K Rowling",
  synopsis: "A wizzard",
  release_date: "10/02/2023",
  categoryMovie_id: "",
};

export const mockedMovieCreate2: MovieRegisters = {
  name: "Harry Potter 2",
  director: "J.K Rowling",
  synopsis: "A wizzard",
  release_date: "10/02/2023",
  categoryMovie_id: "",
};

export const mockedMovieCreate3: MovieRegisters = {
  name: "Harry Potter 3",
  director: "J.K Rowling",
  synopsis: "A wizzard",
  release_date: "10/02/2023",
  categoryMovie_id: "",
};

export const mockedCategoryProductCreate: CategoryProductCreate = {
  name: "Beverage",
};

export const mockedCategoryProductCreate2: CategoryProductCreate = {
  name: "Sweets",
};

export const mockedCategoryProductCreate3: CategoryProductCreate = {
  name: "Popcorn",
};

export const mockedProductCreate: ProductCreate = {
  name: "tic tac",
  price: 10,
  stock: 50,
  categoryFoodId: "",
};

export const mockedProductCreate2: ProductCreate = {
  name: "medium popcorn",
  price: 10,
  stock: 50,
  categoryFoodId: "",
};

export const mockedProductCreate3: ProductCreate = {
  name: "large soda",
  price: 10,
  stock: 50,
  categoryFoodId: "",
};

export const mockedRoomCreate: RoomCreate = {
  name: "1",
  is3D: true,
  seats: 200,
  movie_id: "",
};

export const mockedRoomCreate2: RoomCreate = {
  name: "2",
  is3D: true,
  seats: 200,
  movie_id: "harry potter 2",
};

export const mockedRoomCreate3: RoomCreate = {
  name: "3",
  is3D: true,
  seats: 200,
  movie_id: "harry potter 3",
};

export const mockedOrderCreate: OrderCreate = {
  user: "",
  food: [
    {
      name: "pipoca",
      price: 10,
      stock: 100,
    },
  ],
  status: "StandBy",
  total: 2,
};
