import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Gold from '../assets/Gold.png';
import Silver from '../assets/Silver.png';
import Bronze from '../assets/Bronze.png';

const Leaderboard = () => {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);
    const [timeFrame, setTimeFrame] = useState('daily');
    const [loading, setLoading] = useState(true);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) navigate('/');
    }, []);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/snake-game/leaderboard/${timeFrame}`, {
                    headers: {
                        Authorization: `Bearer ${userInfo?.token}`
                    }
                });
                console.log(response);
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
            setLoading(false);
        };

        fetchLeaderboard();
    }, [timeFrame]);

    const renderPodium = () => {
        const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd
        return (
            <div className="podium d-flex justify-content-center align-items-end mb-4">
                {podiumOrder.map((index) => {
                    const player = leaderboard[index];
                    if (!player) return null;
                    const height = 140 + (2 - index) * 30;
                    return (
                        <div key={index} className="podium-step mx-2" style={{ height: `${height}px` }}>
                            <div className="podium-number">{index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}</div>
                            <img
                                src={index === 0 ? Gold : index === 1 ? Silver : Bronze}
                                alt={`${index + 1} place`}
                                className="cup-image"
                            />
                            <div className="player-name">{player.username}</div>
                            <div className="player-score">{player.score}</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Leaderboard</h2>
            <div className="d-flex justify-content-center mb-4">
                <div className="btn-group" role="group">
                    <input
                        type="radio"
                        className="btn-check"
                        name="timeFrame"
                        id="daily"
                        checked={timeFrame === 'daily'}
                        onChange={() => setTimeFrame('daily')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="daily">Daily</label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="timeFrame"
                        id="weekly"
                        checked={timeFrame === 'weekly'}
                        onChange={() => setTimeFrame('weekly')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="weekly">Weekly</label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="timeFrame"
                        id="monthly"
                        checked={timeFrame === 'monthly'}
                        onChange={() => setTimeFrame('monthly')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="monthly">Monthly</label>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {renderPodium()}
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.slice(3).map((entry, index) => (
                                    <tr key={index}>
                                        <td>{index + 4}</td>
                                        <td>{entry.username}</td>
                                        <td>{entry.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Leaderboard;