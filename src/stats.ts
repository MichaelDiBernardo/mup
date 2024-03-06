import { ASSERT } from "./ljs/littlejs";

export enum StatKey {
  HP = "hp", // Hitpoints
  ATK = "atk", // Damage
  DEF = "def", // Damage absorption
  SPD = "spd", // Movement speed
  INS = "ins", // Hit/dodge
}

export const ALL_STATS = [
  StatKey.HP,
  StatKey.ATK,
  StatKey.DEF,
  StatKey.SPD,
  StatKey.INS,
];

export type StatValue = {
  current: number;
  max: number;
};

export class Stats {
  private stats: Record<StatKey, StatValue> = {
    [StatKey.HP]: { current: 0, max: 0 },
    [StatKey.ATK]: { current: 0, max: 0 },
    [StatKey.DEF]: { current: 0, max: 0 },
    [StatKey.SPD]: { current: 0, max: 0 },
    [StatKey.INS]: { current: 0, max: 0 },
  };

  constructor(initialValues: Record<StatKey, number>) {
    ALL_STATS.forEach((key) => {
      this.setCurrent(key, initialValues[key]);
      this.setMax(key, initialValues[key]);
    });
  }

  get(key: StatKey): StatValue {
    return this.stats[key];
  }

  setCurrent(key: StatKey, current: number) {
    const stat = this.get(key);
    stat.current = current;
  }

  setMax(key: StatKey, max: number) {
    const stat = this.get(key);
    stat.max = max;
  }

  increaseMax(key: StatKey, amt: number) {
    ASSERT(amt >= 0);
    const stat = this.get(key);
    stat.max += amt;
  }

  heal(key: StatKey, amt: number) {
    ASSERT(amt >= 0);
    const stat = this.get(key);
    stat.current = Math.min(amt + stat.current, stat.max);
  }

  hurt(key: StatKey, amt: number, saturate = true) {
    ASSERT(amt >= 0);
    const stat = this.get(key);
    stat.current -= amt;
    if (saturate) {
      stat.current = Math.max(0, stat.current);
    }
  }

  isDead(): boolean {
    return this.get(StatKey.HP).current <= 0;
  }
}
