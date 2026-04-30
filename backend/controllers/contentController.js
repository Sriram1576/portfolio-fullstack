const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const {
  CONTENT_CACHE_TTL_MS,
  getHomeContentCache,
  setHomeContentCache
} = require('../utils/contentCache');

exports.getHomeContent = async (req, res) => {
  const startTime = process.hrtime.bigint();
  const cachedContent = getHomeContentCache();

  if (cachedContent) {
    const durationMs = Number(process.hrtime.bigint() - startTime) / 1_000_000;
    return res.status(200).json({
      success: true,
      data: cachedContent,
      meta: {
        cache: 'HIT',
        cacheTtlMs: CONTENT_CACHE_TTL_MS,
        durationMs: Number(durationMs.toFixed(2))
      }
    });
  }

  try {
    const [projects, skills, experience] = await Promise.all([
      Project.find({}).sort({ orderIndex: 1, createdAt: -1 }),
      Skill.find({}).sort({ orderIndex: 1, proficiency: -1 }),
      Experience.find({}).sort({ startDate: -1, orderIndex: 1 })
    ]);

    const payload = { projects, skills, experience };
    setHomeContentCache(payload);

    const durationMs = Number(process.hrtime.bigint() - startTime) / 1_000_000;
    res.status(200).json({
      success: true,
      data: payload,
      meta: {
        cache: 'MISS',
        cacheTtlMs: CONTENT_CACHE_TTL_MS,
        durationMs: Number(durationMs.toFixed(2))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
