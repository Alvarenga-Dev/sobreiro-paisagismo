import { useState } from "react";
import { renderWithUser } from "../test-utils";
import { MenuTrigger } from "./MenuTrigger";

function ControlledMenuTrigger() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <MenuTrigger expanded={expanded} controlsId="menu-panel" onExpandedChange={setExpanded} />
      <div id="menu-panel">Painel de teste</div>
    </>
  );
}

describe("MenuTrigger", () => {
  afterEach(() => jest.resetAllMocks());

  it("expõe o contrato controlado e alterna o estado acessível", async () => {
    const { user, getByRole } = renderWithUser(<ControlledMenuTrigger />);
    const trigger = getByRole("button", { name: "Abrir menu" });

    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-expanded", "true");
    expect(getByRole("button", { name: "Fechar menu" })).toHaveAttribute("aria-controls", "menu-panel");
  });

  it("não promete expansão quando a Home ainda não possui painel", () => {
    const { getByRole } = renderWithUser(<MenuTrigger disabled />);

    expect(getByRole("button", { name: "Menu — conteúdo em definição" })).toBeDisabled();
  });
});
