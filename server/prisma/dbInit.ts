import { PrismaClient } from '.prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.role.createMany({
    data: [
      { role: 'admin', id: 1, master: true },
      { role: 'user', id: 2 }
    ]
  })

  await prisma.user.createMany({
    data: [
      {
        name: 'Kirolos Rafaat',
        email: 'k@k.co',
        password:
          '$2a$10$2knyFFSLYaQaCApugZt.8evE1zO/rkKIq0.hlfjLcL/nDy8QybxaG',
        roleId: 1
      },
      {
        name: 'Ann Christine',
        email: 'ac@ac.co',
        password:
          '$2a$10$2knyFFSLYaQaCApugZt.8evE1zO/rkKIq0.hlfjLcL/nDy8QybxaG',
        roleId: 2
      }
    ]
  })

  await prisma.taskStatus.createMany({
    data: [
      {
        id: 'todo',
        name: 'TO DO',
        order: 1
      },
      {
        id: 'in_progress',
        name: 'In Progress',
        order: 2
      },
      {
        id: 'in_review',
        name: 'In Review',
        order: 3
      },
      {
        id: 'done',
        name: 'Done',
        order: 4
      }
    ]
  })
}
main()
