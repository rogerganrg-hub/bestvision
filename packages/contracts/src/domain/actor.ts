// packages/contracts/src/domain/actor.ts

export interface Actor {
    type: "user" | "system" | "integration";
    id: string;
}
