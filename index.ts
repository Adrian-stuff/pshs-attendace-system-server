import Fastify, { RouteShorthandOptions } from "fastify";
import { PrismaClient } from "@prisma/client";
import { addAttendance, getAttendanceSection } from "./dbManipulate";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { LRN, LRNType } from "./types/serverTypes";
const prisma = new PrismaClient();
const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
const attendanceOpts: RouteShorthandOptions = {
  schema: {
    body: LRN,
  },
};

server.get("/", async (request, reply) => {
  return { pong: "it worked!" };
});

server.get("/students", async (req, res) => {
  const students = await prisma.students.findMany();

  return { students };
});

server.get("/attendance", async (req, res) => {
  const attendance = await getAttendanceSection(prisma, "DB", undefined);
  return { attendance };
});

server.post<{ Body: LRNType }>("/attend", attendanceOpts, async (req, res) => {
  const { lrn } = req.body;
  const [err, attendance] = await addAttendance(prisma, lrn);
  if (err) {
    console.log(err);
    return { status: "error", data: err };
  }
  return { status: "success", data: attendance };
});

server.post("/add-student", async (req, res) => {
  return { body: req.body };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log("running at ", port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
