import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Autocomplete } from '@mui/material';

function StockSearchForm({ onSearch }) {
	const [ticker, setTicker] = useState('');
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [tickerOptions, setTickerOptions] = useState([
		'MSFT', // Microsoft
		'AAPL', // Apple
		'NVDA', // Nvidia
		'GOOG', // Alphabet (Google)
		'AMZN', // Amazon
		'ARAMCO', // Saudi Aramco
		'META', // Meta Platforms
		'BRK.B', // Berkshire Hathaway
		'AVGO', // Broadcom
		'TSM', // Taiwan Semiconductor Manufacturing Company
		'TSLA', // Tesla
		'WMT', // Walmart
		'LLY', // Eli Lilly
		'JPM', // JPMorgan Chase
		'V', // Visa
		'TCEHY', // Tencent
		'MA', // Mastercard
		'NFLX', // Netflix
		'COST', // Costco
		'XOM', // Exxon Mobil
		'ORCL', // Oracle
		'JNJ', // Johnson & Johnson
		'PG', // Procter & Gamble
		'UNH', // UnitedHealth Group
		'HD', // Home Depot
		'SAP', // SAP
		'ABBV', // AbbVie
		'ICBC', // Industrial and Commercial Bank of China
		'BAC', // Bank of America
		'KO', // Coca-Cola
		'NVO', // Novo Nordisk
		'BABA', // Alibaba
		'RMS.PA', // Hermès (Paris)
		'PLTR', // Palantir
		'TMUS', // T-Mobile US
		'LVMUY', // LVMH
		'NSRGY', // Nestlé
		'PM', // Philip Morris International
		'ASML', // ASML Holding
		'600519.SS', // Kweichow Moutai
		'ROG', // Roche
		'CRM', // Salesforce
		'005930.KS', // Samsung Electronics
		'ABC', // Agricultural Bank of China
		'TM', // Toyota
		'WFC', // Wells Fargo
		'IHC', // International Holding Company (Abu Dhabi)
		'CVX', // Chevron
		'CSCO', // Cisco
		'OR.PA', // L'Oreal (Paris)
	]);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSearch({ ticker, dateFrom, dateTo });
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={12}>
					<Autocomplete
						sx={{ width: 200 }}
						freeSolo
						options={tickerOptions}
						value={ticker}
						onChange={(e, newValue) => {
							setTicker(newValue ? newValue : '');
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								fullWidth
								id="ticker"
								label="Ticker Symbol"
								placeholder="Enter ticker symbol"
								required
								variant="outlined"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="dateFrom"
						label="Start Date"
						type="date"
						value={dateFrom}
						onChange={(e) => setDateFrom(e.target.value)}
						required
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="dateTo"
						label="End Date"
						type="date"
						value={dateTo}
						onChange={(e) => setDateTo(e.target.value)}
						required
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button type="submit" variant="contained" color="primary">
						Search
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

export default StockSearchForm;
