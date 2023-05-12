const ROUTES = {
  Dashboard: "/",
  Expenses: "/expenses",
  Expense: (id: string) => `/expenses/${id}`,
  ExpensesNew: "/expenses/new",
  Categories: "/categories",
  CategoriesNew: "/categories/new",
};

export { ROUTES };
