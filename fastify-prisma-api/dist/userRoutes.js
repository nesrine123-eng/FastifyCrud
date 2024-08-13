"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userRoutes = async (fastify) => {
    // Route pour créer un utilisateur
    fastify.post('/users', async (request, reply) => {
        const { name, email } = request.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        reply.status(201).send(user);
    });
    // Route pour obtenir tous les utilisateurs
    fastify.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        reply.send(users);
    });
    // Route pour obtenir un utilisateur par ID
    fastify.get('/users/:id', async (request, reply) => {
        const { id } = request.params;
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            reply.status(404).send({ message: 'User not found' });
        }
        else {
            reply.send(user);
        }
    });
    // Route pour mettre à jour un utilisateur par ID
    fastify.put('/users/:id', async (request, reply) => {
        const { id } = request.params;
        const { name, email } = request.body;
        const user = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
            },
        });
        reply.send(user);
    });
    // Route pour supprimer un utilisateur par ID
    fastify.delete('/users/:id', async (request, reply) => {
        const { id } = request.params;
        const user = await prisma.user.delete({
            where: { id },
        });
        reply.send(user);
    });
};
exports.default = userRoutes;
