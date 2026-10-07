import { IRON_REMOVER } from "../data";
import { DropletIcon } from "./icons";
import { SolutionPanel } from "./SolutionPanel";

export function IronRemoverSection() {
  return (
    <SolutionPanel
      id="iron-remover"
      title="Iron remover"
      icon={<DropletIcon size={22} />}
      options={IRON_REMOVER}
      tint="accent"
    />
  );
}
