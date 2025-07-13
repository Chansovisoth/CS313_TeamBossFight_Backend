import PRNG from "./prng.js";
import eventBoss from "../models/event_boss.model.js";

const generateJoinCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let joinCode = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = PRNG.randomInt(0, characters.length - 1);
    joinCode += characters[randomIndex];
  }

  return joinCode;
};

const generateUniqueJoinCode = async () => {
  let joinCode;
  let isUnique = false;

  while (!isUnique) {
    joinCode = generateJoinCode();
    const existingEventBoss = await eventBoss.findOne({ where: { joinCode } });
    if (!existingEventBoss) {
      isUnique = true;
    }
  }

  return joinCode;
};

export { generateJoinCode, generateUniqueJoinCode };
