import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import jwt from "../middleware";

const Equipment = new Elysia({ prefix: "/equipment" })
  .decorate("prisma", new PrismaClient())
  .use(jwt)
  .derive(
    async ({ headers, jwt }) => {
      const auth = headers["authorization"];
      const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

      if (!bearer) {
        throw new Error("Unauthorized: No token");
      }

      try {
        const decoded = await jwt.verify(bearer);
        if(!decoded)
          throw new Error("Invalid token");
        
        return { user: decoded };
      } catch {
        throw new Error("Unauthorized: Invalid token");
      }
    }
  )
  .get(
    "/", 
    async ({ prisma }) => {
      const equipment = await prisma.equipment.findMany();
      
      return {
        type: "success",
        data: equipment
      };
    }
  )
  .get(
    "/:id", 
    async ({ prisma, params }) => {
      const equipment = await prisma.equipment.findMany({
        where: {
          id: parseInt(params.id)
        }
      });
      
      return {
        type: "success",
        data: equipment
      };
    }
  )
  .post(
    "/", 
    async({ prisma, body }) => {
      const { 
        name, 
        type
      } = body;

      const equipment = await prisma.equipment.create({
        data: {
          name: name,
          type: type
        }
      });

      return {
        type: "success",
        data: equipment
      };
    },
    {
      body: t.Object({
        name: t.String(),
        type: t.String(),
      })
    }
  )
  .put(
    "/:id", 
    async({ body, prisma, params }) => {
      const { 
        name, 
        type
      } = body;
      const { id } = params;

      let insert = {};
      if(name) {
        insert = {...insert, name: name};
      }
      if(type) {
        insert = {...insert, type: type};
      }

      const equipment = await prisma.equipment.update({
        where: {
          id: parseInt(id)
        },
        data: insert
      });

      return {
        type: "success",
        data: equipment
      };
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        type: t.Optional(t.String())
      })
    }
  )
  .delete(
    "/:id", 
    async({ prisma, params }) => {
      const { id } = params;

      const equipment = await prisma.equipment.delete({
        where: {
          id: parseInt(id)
        }
      });

      return {
        type: "success",
        data: equipment
      };
    }
  );

export default Equipment;