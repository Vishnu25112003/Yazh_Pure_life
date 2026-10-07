import { IRON_REMOVER } from "../data";
import { DropletIcon } from "./icons";
import { SolutionPanel } from "./SolutionPanel";

export function IronRemoverSection() {
  return (
    <SolutionPanel
      id="iron-remover"
      title="Iron remover"
      intro="Removes iron, rust and yellow stains for healthy water at every tap."
      icon={<DropletIcon size={22} />}
      options={IRON_REMOVER}
      tint="accent"
    />
  );
}
