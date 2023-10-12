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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceSection = exports.getAttendance = exports.addAttendance = void 0;
const client_1 = require("@prisma/client");
function addAttendance(prisma, studentLrn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const attendance = yield prisma.attendance.create({
                data: {
                    student_id: studentLrn,
                    attendance_status: (yield prisma.$queryRaw `SELECT LOCALTIME < '07:00:00'`)
                        ? client_1.status.LATE
                        : client_1.status.ONTIME,
                },
            });
            return [0, attendance];
        }
        catch (error) {
            return [error, null];
        }
    });
}
exports.addAttendance = addAttendance;
function getAttendance(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const attendance = yield prisma.attendance.findMany();
            return attendance;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAttendance = getAttendance;
function getAttendanceSection(prisma, section, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const attendance = yield prisma.$queryRaw(client_1.Prisma.sql `SELECT * FROM attendance
    INNER JOIN students
    ON students.lrn = attendance.student_id
    WHERE section_id = ${section.toUpperCase()}`);
            console.log(attendance);
        }
        catch (error) { }
    });
}
exports.getAttendanceSection = getAttendanceSection;
