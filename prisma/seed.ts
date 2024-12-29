import { prismaTransaction, prisma } from "@/backend";

const main = async () => {
  await prismaTransaction(async () => {
    console.info("creating dev. role");
    if (!(await prisma.role.findUnique({ where: { id: 1 } })))
      await prisma.role.create({
        data: {
          id: 1,
          name: "Dev.",
          note: "Acesso ao desenvolvimento e manutenção do sistema",
        },
      });

    console.info("creating admin. role");
    if (!(await prisma.role.findUnique({ where: { id: 2 } })))
      await prisma.role.create({
        data: {
          id: 2,
          name: "Admin.",
          note: "Acesso total ao sistema",
        },
      });

    console.info("creating member role");
    if (!(await prisma.role.findUnique({ where: { id: 3 } })))
      await prisma.role.create({
        data: {
          id: 3,
          name: "Membro",
          note: "Acesso limitado ao sistema",
        },
      });

    console.info("creating root user");
    if (!(await prisma.user.findUnique({ where: { id: 1 } })))
      await prisma.user.create({
        data: {
          id: 1,
          name: "RodrigoDev",
          email: "rodrigomarqribeiro@gmail.com",
          role_id: 1,
          password:
            "$2a$10$4LKt3sxs0/i5vBirA6k9sOhp7KLkYBNIf48Je.4qDyx2i1bEn2q96", // 123456
        },
      });
  });
};

main()
  .then(() => console.info("seeds successfully created."))
  .catch(console.error);
