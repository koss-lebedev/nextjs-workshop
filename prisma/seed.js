const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const main = async () => {
  const [food, fun, bills] = await Promise.all(
    ["Food", "Fun", "Bills"].map((category) =>
      prisma.category.create({
        data: {
          name: category,
        },
      })
    )
  );

  const user = await prisma.user.create({
    data: {
      email: "user@test.com",
      passwordHash: bcrypt.hashSync("Admin000", 10),
    },
  });

  await Promise.all(
    [
      { name: "La Patrona", cost: 14, categoryId: food.id, userId: user.id },
      { name: "Vacation", cost: 850, categoryId: fun.id, userId: user.id },
      { name: "Rent", cost: 1200, categoryId: bills.id, userId: user.id },
    ].map((expense) =>
      prisma.expense.create({
        data: expense,
      })
    )
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
