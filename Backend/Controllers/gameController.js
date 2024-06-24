const Score = require('../Models/scoreModel');

class GameController {
    async addScore(req, res) {
        try {
            const score = new Score({
                user: req.user.userId,
                score: req.body.score,
            });
            await score.save();
            res.status(201).send(score);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getLeaderboard(req, res) {
        try {
            const { timeFrame } = req.params;
            let startDate;

            switch (timeFrame) {
                case 'daily':
                    startDate = new Date(new Date().setHours(0, 0, 0, 0));
                    break;
                case 'weekly':
                    startDate = new Date(new Date().setDate(new Date().getDate() - 7));
                    break;
                case 'monthly':
                    startDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
                    break;
                default:
                    return res.status(400).send({ error: 'Invalid time frame' });
            }

            const leaderboard = await Score.aggregate([
                { $match: { date: { $gte: startDate } } },
                { $group: { _id: '$user', maxScore: { $max: '$score' } } },
                { $sort: { maxScore: -1 } },
                { $limit: 10 },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                { $project: { _id: 0, username: '$user.userName', score: '$maxScore' } },
            ]);

            res.send(leaderboard);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new GameController();