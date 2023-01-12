import { PrismaClient } from '.prisma/client'
const prisma = new PrismaClient()

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { role: 'admin', id: 1, master: true },
      { role: 'user', id: 2 }
    ]
  })

  await prisma.user.create({
    data: {
      name: 'Kirolos Rafaat',
      email: 'k@k.co',
      password: '$2a$10$2knyFFSLYaQaCApugZt.8evE1zO/rkKIq0.hlfjLcL/nDy8QybxaG',
      roleId: 1
    }
  })
}
main()
