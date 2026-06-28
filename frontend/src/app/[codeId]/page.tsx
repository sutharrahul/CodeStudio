import { IdeWorkspace } from "@/components/IdeWorkspace";

type Props = {
  params: Promise<{ codeId: string }>;
};

export default async function SavedCodePage({ params }: Props) {
  const { codeId } = await params;
  return <IdeWorkspace codeId={codeId} />;
}
