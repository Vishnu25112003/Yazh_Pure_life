import { WATER_SOFTENER } from "../data";
import { DropletIcon } from "./icons";
import { SolutionPanel } from "./SolutionPanel";

export function WaterSoftenerSection() {
  return (
    <SolutionPanel
      id="water-softener"
      title="Water softener"
      intro="Turns hard water soft — healthy water that is gentler on skin, hair and appliances."
      icon={<DropletIcon size={22} />}
      options={WATER_SOFTENER}
      tint="accent"
    />
  );
}
