import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart, Bar, Tooltip, Legend, XAxis } from 'recharts';

const ReadingChart = ({ _id }) => {

    const { userSessions } = useSelector(state => state.sessions);

    const arr = [];

    userSessions.filter(s => s.bookId == _id).map(s => {
        const data =
        {
            date: s.updatedAt,
            pages: s.progress,
        }
        arr.push(data);
    })

    return (
        <>
            {
                userSessions.filter(s => s.bookId == _id).length !== 0 ? <div className="chart">
                    <BarChart width={700} height={350} data={arr}>
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="date" />
                        <Bar dataKey="pages" fill="#8884d8" />
                    </BarChart>
                </div> : null
            }
        </>
    )
}

export default ReadingChart