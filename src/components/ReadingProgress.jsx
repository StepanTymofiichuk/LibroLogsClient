import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

const ReadingProgress = ( {progress} ) => {
    let now = progress.toFixed(1);
    if (now == 100) {
        return <ProgressBar now={now} label={`${now}%`} variant='success' />
    } else if (now < 99 && now > 30) {
        return <ProgressBar now={now} label={`${now}%`} variant='warning' />
    } else if (now < 30) {
        return <ProgressBar now={now} label={`${now}%`} variant='danger' />
    }
}

export default ReadingProgress