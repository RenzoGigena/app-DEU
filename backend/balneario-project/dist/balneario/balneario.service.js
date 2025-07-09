"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalnearioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BalnearioService = class BalnearioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.balneario.findMany({ include: { servicios: true } });
    }
    async findOne(id) {
        return this.prisma.balneario.findUnique({
            where: { id },
            include: { servicios: true },
        });
    }
    async create(data) {
        return this.prisma.balneario.create({
            data: {
                ...data,
                servicios: {
                    create: data.servicios,
                },
            },
            include: { servicios: true },
        });
    }
    async update(id, data) {
        const { servicios, ...balnearioData } = data;
        await this.prisma.balneario.update({
            where: { id },
            data: balnearioData,
        });
        if (servicios) {
            await this.prisma.servicio.deleteMany({
                where: { balnearioId: id },
            });
            for (const servicio of servicios) {
                await this.prisma.servicio.create({
                    data: {
                        ...servicio,
                        balnearioId: id,
                    },
                });
            }
        }
        return this.prisma.balneario.findUnique({
            where: { id },
            include: { servicios: true },
        });
    }
    async remove(id) {
        return this.prisma.balneario.delete({
            where: { id },
            include: { servicios: true },
        });
    }
};
exports.BalnearioService = BalnearioService;
exports.BalnearioService = BalnearioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BalnearioService);
//# sourceMappingURL=balneario.service.js.map