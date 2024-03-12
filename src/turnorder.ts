import { Monster, MonsterId } from "./monster";
import { Player } from "./player";
import { StatKey } from "./stats";

// REDO: In Level, remove monsters and add actors
// - actors will be a list of Actors, which is
// - type {isPlayer: true, energy: number, Player player} or {isPlayer: false, energy: number, monster: Monster}
// We can then sort them every round

const ENERGY_REQUIRED_PER_TURN = 20;

export type TurnOrder = {
  playerEnergy: number;
  monsterEnergies: Record<MonsterId, number>;
  next: Player | Monster;
};

/**
 * This mutates turnOrder and returns it for convenience.
 */
export const nextTurnOrder = (
  turnOrder: TurnOrder,
  monsters: Monster[],
  player: Player
): TurnOrder => {
  // Brute force for now.
  while (true) {
    turnOrder.playerEnergy += player.stats.get(StatKey.SPD).current;

    monsters.forEach(
      (m) =>
        (turnOrder.monsterEnergies[m.id] += m.stats.get(StatKey.SPD).current)
    );
  }
};
