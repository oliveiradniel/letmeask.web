import { Button } from "@/components/ui/button";

import errorIcon from "../assets/icons/error-page.svg";

export function ErrorPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-12">
      {/** biome-ignore lint/correctness/useImageSize: <Image for information> */}
      <img alt="" aria-hidden="true" className="size-40" src={errorIcon} />

      <div className="flex flex-col justify-center gap-4">
        <p>Houve um erro ao carregar a aplicação.</p>

        <Button onClick={() => window.location.reload()}>Recarregar</Button>
      </div>
    </div>
  );
}
