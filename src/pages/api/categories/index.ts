import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getAllCategories } from "@/modules/categories/service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const categories = await getAllCategories();

  switch (method) {
    case "GET":
      res.status(200).json({ categories });
      break;
    case "POST":
      const category = await createCategory(body);
      res.status(200).json({ category });
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
