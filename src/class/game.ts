export type Key = "left" | "up" | "right" | "down";
export type GameObjectType = "user" | "box" | "wall" | "star" | "";

import _ from "lodash";

interface Point {
  X: number;
  Y: number;
  getPoint: () => { X: number; Y: number };
  setPoint: (X: number, Y: number) => void;
}

export class GameObject implements Point {
  X: number;
  Y: number;
  type: GameObjectType;
  constructor(X: number, Y: number, type: GameObjectType) {
    this.X = X;
    this.Y = Y;
    this.type = type;
  }

  public getPoint() {
    return { X: this.X, Y: this.Y };
  }

  public setPoint(X: number, Y: number) {
    this.X = X;
    this.Y = Y;
  }
}

export class Game {
  gameObjects: GameObject[];
  records: GameObject[][];

  HEIGHT: number;
  WIDTH: number;

  count: number;

  constructor(size = 5, gameObjects: GameObject[]) {
    this.HEIGHT = size;
    this.WIDTH = size;

    this.count = 0;

    this.gameObjects = gameObjects;
    this.records = [];
  }

  private _countUp() {
    this.count++;
  }

  public isBackable() {
    return this.records.length > 0;
  }

  public back() {
    if (this.records.length > 0) {
      this.gameObjects = this.records[this.records.length - 1];
      this.records.pop();
    }
  }

  public reset() {
    if (this.records.length > 0) {
      this.gameObjects = this.records[0];
      this.records = [];
    }
  }

  public isClear(): boolean {
    // 全ての star の上に box が存在していたら game clear
    const stars = this.gameObjects.filter(gameObject => {
      return gameObject.type === "star";
    });

    const starLocations = stars.map(star => star.getPoint());

    const results: any = [];
    starLocations.forEach(starLocation => {
      const obj = this.getObject(starLocation.X, starLocation.Y);
      if (obj && obj.type === "box") {
        results.push(obj);
      }
    });

    return results.length === stars.length;
  }

  public getSize(): number {
    return this.HEIGHT;
  }

  public getCount(): number {
    return this.count;
  }

  public getObject(targetX: number, targetY: number) {
    const objs = this.gameObjects.filter(gameObject => {
      const { X, Y } = gameObject.getPoint();
      return X === targetX && Y === targetY;
    });

    if (objs.length > 1) {
      const hasWall = objs.find(gameObject => {
        return gameObject.type === "wall";
      });
      if (hasWall) return hasWall;
      const hasUser = objs.find(gameObject => {
        return gameObject.type === "user";
      });
      if (hasUser) return hasUser;
      const hasBox = objs.find(gameObject => {
        return gameObject.type === "box";
      });
      if (hasBox) return hasBox;

      return;
    } else {
      return objs[0];
    }
  }

  public move(key: Key): void {
    const user = this.gameObjects.find(
      gameObject => gameObject.type === "user"
    );
    if (!user) return;

    this.records.push(_.cloneDeep(this.gameObjects));

    const { X, Y } = user.getPoint();
    // 進行方向が入力されると
    // 制約に従い、ユーザーを移動させる
    switch (key) {
      case "up": {
        if (Y <= 1) break;

        // 移動先に box が存在する場合、押す
        // box の先に何らかの object が存在する場合は、押さない
        const object = this.getObject(X, Y - 1);
        const obstacle = this.getObject(X, Y - 2);

        if (!object || object.type === "star") {
          user.setPoint(X, Y - 1);
          return;
        }

        if (object.type === "wall") break;

        if (obstacle && obstacle.type !== "star") break;

        if (object.type === "box") {
          object.setPoint(X, Y - 2);
          user.setPoint(X, Y - 1);
        }

        break;
      }
      case "down": {
        if (Y >= this.HEIGHT) break;

        // 移動先に box が存在する場合、押す
        // box の先に何らかの object が存在する場合は、押さない
        const object = this.getObject(X, Y + 1);
        const obstacle = this.getObject(X, Y + 2);

        if (!object || object.type === "star") {
          user.setPoint(X, Y + 1);
          return;
        }

        if (object.type === "wall") break;

        if (obstacle && obstacle.type !== "star") break;

        if (object.type === "box") {
          object.setPoint(X, Y + 2);
          user.setPoint(X, Y + 1);
        }

        break;
      }
      case "left": {
        if (X <= 1) break;

        // 移動先に box が存在する場合、押す
        // box の先に何らかの object が存在する場合は、押さない
        const object = this.getObject(X - 1, Y);
        const obstacle = this.getObject(X - 2, Y);

        if (!object || object.type === "star") {
          user.setPoint(X - 1, Y);
          return;
        }

        if (object.type === "wall") break;

        if (obstacle && obstacle.type !== "star") break;

        if (object.type === "box") {
          object.setPoint(X - 2, Y);
          user.setPoint(X - 1, Y);
        }

        break;
      }
      case "right": {
        if (X >= this.WIDTH) break;

        // 移動先に box が存在する場合、押す
        // box の先に何らかの object が存在する場合は、押さない
        const object = this.getObject(X + 1, Y);
        const obstacle = this.getObject(X + 2, Y);

        if (!object || object.type === "star") {
          user.setPoint(X + 1, Y);
          return;
        }

        if (object.type === "wall") break;

        if (obstacle && obstacle.type !== "star") break;

        if (object.type === "box") {
          object.setPoint(X + 2, Y);
          user.setPoint(X + 1, Y);
        }

        break;
      }
      default:
        // no logic
        break;
    }
  }
}
