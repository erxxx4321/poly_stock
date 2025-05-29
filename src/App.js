import React, { useState, useEffect } from 'react';
import StockSearchForm from './components/StockSearchForm';
import NewsSentimentBar from './components/NewsSentimentBar';
import NewsDataFrame from './components/NewsDataFrame';
import { Container, Typography } from '@mui/material';

function App() {
	const [newsData, setNewsData] = useState([]);
	const [positive, setPositive] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [negative, setNegative] = useState(0);
	const [apiKey, setApiKey] = useState('kYjjviVsgQqOfp02zupca1fsv8L5Wlu_');

	const handleSearch = async ({ ticker, dateFrom, dateTo }) => {
		try {
			const baseUrl = 'https://api.polygon.io/v2/reference/news';

			const params = new URLSearchParams({
				ticker,
				order: 'desc',
				limit: 100,
				published_utc_gte: dateFrom,
				published_utc_lte: dateTo,
				apiKey: apiKey,
			});
			const url = `${baseUrl}?${params.toString()}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const news = await response.json();

			let positiveCount = 0;
			let neutralCount = 0;
			let negativeCount = 0;
			const newsList = [];

			if (news && news.results) {
				news.results.forEach((item) => {
					let sent = '';
					let ist = '';
					if (item.insights && item.insights.length > 0 && item.insights[0].ticker === ticker) {
						sent = item.insights[0].sentiment;
						ist = item.insights[0].sentiment_reasoning;
					}

					if (sent === 'positive') {
						positiveCount += 1;
					} else if (sent === 'neutral') {
						neutralCount += 1;
					} else if (sent === 'negative') {
						negativeCount += 1;
					}

					newsList.push({
						Date: item.published_utc,
						Title: item.title,
						Description: item.description,
						Sentiment: sent,
						Insight: ist,
					});
				});
			}

			setNewsData(newsList);
			setPositive(positiveCount);
			setNeutral(neutralCount);
			setNegative(negativeCount);
		} catch (error) {
			console.error('Error fetching data:', error);
			setNewsData([]);
			setPositive(0);
			setNeutral(0);
			setNegative(0);
		}
	};

	return (
		<Container className="container">
			<Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
				Polygon Stock News
			</Typography>
			<StockSearchForm onSearch={handleSearch} />
			<NewsSentimentBar positive={positive} neutral={neutral} negative={negative} />
			<NewsDataFrame data={newsData} />
		</Container>
	);
}

export default App;
