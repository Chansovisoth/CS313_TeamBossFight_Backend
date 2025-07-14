import { Boss } from "../models/index.js";

const getAllBosses = async (req, res) => {
  try {
    const bosses = await Boss.findAll();
    res.status(200).json(bosses);
  } catch (error) {
    console.error("Error fetching bosses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBossById = async (req, res) => {
  const { id } = req.params;
  try {
    const boss = await Boss.findByPk(id);
    if (!boss) {
      return res.status(404).json({ message: "Boss not found" });
    }
    res.status(200).json(boss);
  } catch (error) {
    console.error("Error fetching boss:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBoss = async (req, res) => {
  const {
    name,
    image,
    description,
    cooldownDuration,
    numberOfTeams,
    categoryIds,
  } = req.body;
  try {
    console.log("Creating boss with data:", {
      name,
      image,
      description,
      cooldownDuration,
      numberOfTeams,
      categoryIds,
    });

    const newBoss = await Boss.create({
      name,
      image,
      description,
      cooldownDuration,
      numberOfTeams,
    });

    // If categoryIds are provided, associate them with the new boss
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      console.log("Associating categories:", categoryIds);

      const categories = await Category.findAll({
        where: {
          id: categoryIds,
        },
      });

      if (categories.length !== categoryIds.length) {
        return res.status(400).json({ message: "Some categories not found" });
      }

      await newBoss.setCategories(categories);
    }

    const bossWithCategories = await Boss.findByPk(newBoss.id, {
      include: [{ model: Category, through: { attributes: [] } }],
    });

    res.status(201).json(bossWithCategories);
  } catch (error) {
    console.error("Error creating boss:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBoss = async (req, res) => {
  const { id } = req.params;
  const { name, description, health, attackPower } = req.body;
  try {
    const boss = await Boss.findByPk(id);
    if (!boss) {
      return res.status(404).json({ message: "Boss not found" });
    }
    boss.name = name || boss.name;
    boss.description = description || boss.description;
    boss.health = health || boss.health;
    boss.attackPower = attackPower || boss.attackPower;
    await boss.save();
    res.status(200).json(boss);
  } catch (error) {
    console.error("Error updating boss:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBoss = async (req, res) => {
  const { id } = req.params;
  try {
    const boss = await Boss.findByPk(id);
    if (!boss) {
      return res.status(404).json({ message: "Boss not found" });
    }
    await boss.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting boss:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAllBosses,
  getBossById,
  createBoss,
  updateBoss,
  deleteBoss,
};
