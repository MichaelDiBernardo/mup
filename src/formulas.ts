import { randInt } from "./ljs/littlejs";

export function calculateDamage(
  attackerAtk: number,
  defenderDef: number,
  atkMultiplier = 1,
  defMultiplier = 0.5,
): number {
  const variance = randInt(0, attackerAtk);
  return Math.floor(
    Math.max(
      attackerAtk * atkMultiplier + variance - defenderDef * defMultiplier,
      0,
    ),
  );
}
