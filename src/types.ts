export enum TerrainType {
  Floor,
  Wall,
}

export enum TerrainTile {
  Grass = 512,
  Rock,
}

export type Terrain = {
  solid: boolean;
  tile: TerrainTile;
};

export const TerrainTypes = {
  Floor: {
    solid: false,
    tile: TerrainTile.Grass,
  },
  Wall: {
    solid: true,
    tile: TerrainTile.Rock,
  },
};
