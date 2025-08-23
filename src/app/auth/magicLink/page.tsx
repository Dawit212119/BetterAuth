import { apiKey } from "better-auth/plugins";
import { redirect } from "next/navigation";

interface serarchParamsProps {
  searchParams: Promise<{ error: string }>;
}

const MagicLink = async ({ searchParams }: serarchParamsProps) => {
  const sp = await searchParams;
  if (!sp.error) redirect("/profile");
  return <div>{sp.error === "INVALID_TOKEN" && <p>{sp.error}</p>}</div>;
};

export default MagicLink;
