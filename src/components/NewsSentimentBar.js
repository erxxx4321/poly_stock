import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

function NewsSentimentBar({ positive, neutral, negative }) {
	const total = positive + neutral + negative;
	const positivePercent = total > 0 ? (positive / total) * 100 : 0;
	const neutralPercent = total > 0 ? (neutral / total) * 100 : 0;
	const negativePercent = total > 0 ? (negative / total) * 100 : 0;

	const positiveCent = `${Math.round(positivePercent)}%`;
	const neutralCent = `${Math.round(neutralPercent)}%`;
	const negativeCent = `${Math.round(negativePercent)}%`;

	return (
		<Box sx={{ width: '100%' }}>
			<Typography variant="body2" gutterBottom>
				Sentiment Analysis
			</Typography>
			<Box
				sx={{
					display: 'flex',
					height: '24px',
					width: '100%',
					border: '1px solid #e0e0e0',
					borderRadius: 1,
					overflow: 'hidden',
				}}
			>
				<Box
					sx={{
						width: negativeCent,
						bgcolor: 'success.main',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
						fontSize: '0.75rem',
					}}
					role="progressbar"
					aria-valuenow={Math.round(negativePercent)}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					{negativeCent !== '0%' && negativeCent}
				</Box>
				<Box
					sx={{
						width: neutralCent,
						bgcolor: 'grey.200',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'text.primary',
						fontSize: '0.75rem',
					}}
					role="progressbar"
					aria-valuenow={Math.round(neutralPercent)}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					{neutralCent !== '0%' && neutralCent}
				</Box>
				<Box
					sx={{
						width: positiveCent,
						bgcolor: 'error.main',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
						fontSize: '0.75rem',
					}}
					role="progressbar"
					aria-valuenow={Math.round(positivePercent)}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					{positiveCent !== '0%' && positiveCent}
				</Box>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
				<Typography variant="caption" color="success.main">
					Negative: {negativeCent}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					Neutral: {neutralCent}
				</Typography>
				<Typography variant="caption" color="error.main">
					Positive: {positiveCent}
				</Typography>
			</Box>
		</Box>
	);
}

export default NewsSentimentBar;
