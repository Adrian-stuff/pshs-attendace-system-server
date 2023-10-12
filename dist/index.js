"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const dbManipulate_1 = require("./dbManipulate");
const serverTypes_1 = require("./types/serverTypes");
const prisma = new client_1.PrismaClient();
const server = (0, fastify_1.default)().withTypeProvider();
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int !== null && int !== void 0 ? int : this.toString();
};
const attendanceOpts = {
    schema: {
        body: serverTypes_1.LRN,
    },
};
server.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { pong: "it worked!" };
}));
server.get("/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield prisma.students.findMany();
    return { students };
}));
server.get("/attendance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield (0, dbManipulate_1.getAttendanceSection)(prisma, "DB", undefined);
    return { attendance };
}));
server.post("/attend", attendanceOpts, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lrn } = req.body;
    const [err, attendance] = yield (0, dbManipulate_1.addAttendance)(prisma, lrn);
    if (err) {
        console.log(err);
        return { status: "error", data: err };
    }
    return { status: "success", data: attendance };
}));
server.post("/add-student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return { body: req.body };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 3000 });
        const address = server.server.address();
        const port = typeof address === "string" ? address : address === null || address === void 0 ? void 0 : address.port;
        console.log("running at ", port);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
