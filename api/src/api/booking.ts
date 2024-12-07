import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import jwt from "../middleware";

const Booking = new Elysia({ prefix: "/bookings" })
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

      let booking = [];
      if(user?.member) {
        booking = await prisma.booking.findMany({
          where: {
            memberId: user.member.id
          },
          include: {
            program: true
          }
        });
        return {
          type: "success",
          data: booking
        };
      }
      else if (user?.trainer) {
        booking = await prisma.booking.findMany({
          where: {
            program: {
              trainerId: user.trainer.id
            }
          },
          include: {
            program: true
          }
        });
      }

      return {
        type: "success",
        data: booking
      };
    }
  )
  .post(
    "/",
    async ({ body, prisma, user }) => {
      const { programId } = body;

      // First, verify the user and program exist
      const program = await prisma.program.findUnique({
        where: { id: programId }
      });

      if (!program) {
        return {
          type: "error",
          message: "Program not found"
        };
      }

      // Verify user has a valid member record
      const member = await prisma.member.findUnique({
        where: { userId: user.id }
      });

      if (!member) {
        return {
          type: "error",
          message: "Member profile not found"
        };
      }

      // Now create the booking using confirmed member and program
      const booking = await prisma.booking.create({
        data: {
          program: {
            connect: { id: programId }
          },
          member: {
            connect: { id: member.id }
          }
        }
      });

      return {
        type: "success",
        data: booking
      };
    },
    {
      body: t.Object({
        programId: t.Number(),
      })
    }
  )
  /**
   * Features: 
   * - TRAINER
   * - update booking status
   */
  .put(
    "/:id",
    async ({ prisma, params, body }) => {
      const { id } = params; // booking id
      const { status } = body;

      const booking = await prisma.booking.update({
        where: {
          id: parseInt(id)
        },
        data: {
          status: status
        }
      });

      return {
        type: "success",
        data: booking
      };
    },
    {
      body: t.Object({
        status: t.String()
      })
    }
  );

export default Booking;