import { requireUser } from "@/modules/auth/service";
import { AddButton } from "../components/add-button";
import { Button } from "@/components/button";
import { findCredentialsByUserId } from "../service";
import { deleteCredentialAction } from "../actions";

const PasskeyList = async () => {
  const user = await requireUser();
  const passkeys = await findCredentialsByUserId(user.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-slate-800">Passkeys</h1>
      <div className="overflow-hidden min-w-full my-4">
        <table className="w-full">
          <thead className="border-b">
            <tr className="h-14">
              <th className="text-left text-gray-900 px-6">Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {passkeys.map((record) => (
              <tr key={record.id} className="bg-white border-b">
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4 text-right">
                  <form action={deleteCredentialAction}>
                    <input type="hidden" name="id" value={record.id} />
                    <Button size="sm" type="submit">
                      Delete
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddButton />
    </div>
  );
};

export { PasskeyList };
