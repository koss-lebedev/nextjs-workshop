import { cache } from "react";
import { prisma } from "@/common/db-client";
import { Expense } from "@prisma/client";

const getAllExpenses = () => {
  return prisma.expense.findMany({
    include: {
      category: true,
    },
  });
};

const getTotalExpenses = cache(async () => {
  const result = await prisma.expense.aggregate({
    _sum: {
      cost: true,
    },
  });
  return result._sum.cost || 0;
});

const getGroupedExpenses = () => {
  return prisma.expense.groupBy({
    by: ["categoryId"],
    _sum: {
      cost: true,
    },
  });
};

const createExpense = (data: Omit<Expense, "id">) => {
  return prisma.expense.create({
    data,
  });
};

const getExpense = async (id: Expense["id"]) => {
  return prisma.expense.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

const deleteExpense = (id: Expense["id"]) => {
  return prisma.expense.delete({
    where: {
      id,
    },
  });
};

export {
  getAllExpenses,
  getTotalExpenses,
  getGroupedExpenses,
  getExpense,
  createExpense,
  deleteExpense,
};
