import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import jwt from "../middleware";

const app = new Elysia({ prefix: "/programs" })
  .decorate("prisma", new PrismaClient())
  .use(jwt)
  .derive(
    async ({ headers, jwt, prisma }) => {
      const auth = headers["authorization"];
      const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

      if (!bearer) {
        throw new Error("Unauthorized: No token");
      }

      try {
        const decoded = await jwt.verify(bearer);
        if(!decoded)
          throw new Error("Invalid token");

        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(decoded.id)
          },
          include: {
            trainer: true,
            member: true
          }
        });

        return { user: user };
      } catch {
        throw new Error("Unauthorized: Invalid token");
      }
    }
  )
  .get(
    "/", 
    async ({ prisma, user }) => {
      let programs;
      let joinedPrograms = [];

      if(user?.trainer) {
        programs = await prisma.program.findMany({
          where: {
            trainerId: user.trainer.id
          }, 
          include: {
            equipment: true,
            bookings: true
          }
        });
      }
      else {
        programs = await prisma.program.findMany({
          include: {
            equipment: true,
            bookings: true
          }
        });
        
        joinedPrograms = await prisma.program.findMany({
          where: {
            bookings: {
              some: {
                memberId: user.member.id,
                OR: [
                  { status: "Pending" },
                  { status: "Ongoing" }
                ]
              }
            }
          },
          include: {
            equipment: true,
            bookings: true
          }
        });

        // add isJoined
        programs = programs.map((prog) => {

          return {
            ...prog,
            isJoined: joinedPrograms.find((jprog) => jprog.id === prog.id ) ? true : false
          };
        });
      }
      
      return {
        type: "success",
        data: programs,
      };
    }
  )
  .get(
    "/:id", 
    async ({ prisma, params }) => {
      const programs = await prisma.program.findMany({
        where: {
          id: parseInt(params.id)
        }
      });
      
      return {
        type: "success",
        data: programs
      };
    }
  )
  .post(
    "/", 
    async({ prisma, body, user }) => {
      if(!user?.trainer || user.member) {
        return {
          type: "error"
        };
      }

      const { 
        name, 
        type, 
        targetMuscleGroup, 
        description, 
        duration, 
        difficulty,
        equipment
      } = body;

      const program = await prisma.program.create({
        data: {
          name: name,
          type: type,
          targetMuscleGroup: targetMuscleGroup,
          description: description,
          duration: duration,
          difficulty: difficulty,
          equipment: { 
            connect: equipment.map(eq => ({ id: eq.id })) 
          },
          trainer: {
            connect: {
              id: user.trainer.id
            }
          }
        }
      });

      return {
        type: "success",
        data: program
      };
    },
    {
      body: t.Object({
        name: t.String(),
        type: t.String(),
        targetMuscleGroup: t.String(),
        description: t.String(),
        duration: t.Integer(),
        difficulty: t.Integer(),
        equipment: t.Array(t.Object({
          id: t.Integer()
        }))
      })
    }
  )
  .put(
    "/:id", 
    async({ body, prisma, params }) => {
      const { 
        name, 
        type, 
        targetMuscleGroup, 
        description, 
        duration, 
        difficulty,
        equipment
      } = body;
      const { id } = params;
      const temp = await prisma.program.findUnique({ 
        where: {
          id: parseInt(id)
        },
        select: {
          equipment: true
        }
      });

      // disconnect programs
      await prisma.program.update({
        where: {
          id: parseInt(id)
        },
        data: {
          equipment: {
            // Disconnect the equipment not in the current list
            disconnect: temp?.equipment.map(eq => ({ id: eq.id }))
          }
        }
      });

      // connect
      const program = await prisma.program.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name: name,
          type: type,
          targetMuscleGroup: targetMuscleGroup,
          description: description,
          duration: duration,
          difficulty: difficulty,
          equipment: {
            // Connect the new equipment
            connect: equipment.map(eq => ({ id: eq.id }))
          }
        }
      });

      return {
        type: "success",
        data: program
      };
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        type: t.Optional(t.String()),
        targetMuscleGroup: t.Optional(t.String()),
        description: t.Optional(t.String()),
        duration: t.Optional(t.Integer()),
        difficulty: t.Optional(t.Integer()),
        equipment: t.Array(t.Object({
          id: t.Integer(),
        }))
      })
    }
  )
  .delete(
    "/:id", 
    async({ prisma, params }) => {
      const { id } = params;

      const program = await prisma.program.delete({
        where: {
          id: parseInt(id)
        }
      });

      return {
        type: "success",
        data: program
      };
    }
  );

export default app;