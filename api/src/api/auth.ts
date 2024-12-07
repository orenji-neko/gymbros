import { Elysia, t } from "elysia";
import middleware from "../middleware";
import { PrismaClient } from "@prisma/client";

const Auth = new Elysia({ prefix: "/auth" })
  .use(middleware)
  .decorate("prisma", new PrismaClient())
  .post("/login", async ({ prisma, jwt, body, set }) => {
    const { email, password } = body;

    const target = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        trainer: true,
        member: true
      }
    });

    if (!target) {
      set.status = 401;
      return { message: "Invalid credentials" };
    }

    if(target.password !== password) {
      set.status = 401;
      return { message: "Invalid credentials" };
    }

    const token = await jwt.sign({
      id: target.id,
      email: target.email,
    });

    return { 
      token,
      user: { 
        id: target.id, 
        email: target.email,
        isTrainer: target.trainer ? true : false
      }
    };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  });

export default Auth;