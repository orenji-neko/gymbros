import { Elysia } from "elysia";
import Program from "./api/program";
import Equipment from "./api/equipment";
import Auth from "./api/auth";
import Booking from "./api/booking";

const app = new Elysia({ prefix: "/api" })
  .use(Auth)
  .use(Program)
  .use(Equipment)
  .use(Booking)
  .listen(3000)
;

console.log(
  `[server]: 🦊 Running at ${app.server?.hostname}:${app.server?.port}`
);