const { PrismaClient } = require("@prisma/client");

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

  await Promise.all(
    [
      { name: "La Patrona", cost: 14, categoryId: food.id },
      { name: "Vacation", cost: 850, categoryId: fun.id },
      { name: "Rent", cost: 1200, categoryId: bills.id },
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
