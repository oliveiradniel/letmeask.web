import { Loader2Icon } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-2">
      <Loader2Icon className="animate-spin" />
      <span>Carregando...</span>
    </div>
  );
}
