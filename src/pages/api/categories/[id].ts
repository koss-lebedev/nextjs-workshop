import { NextApiRequest, NextApiResponse } from "next";
import { deleteCategory } from "@/modules/categories/service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  const id = query.id as string;

  switch (method) {
    case "DELETE":
      await deleteCategory(id);
      res.status(204).end();
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
