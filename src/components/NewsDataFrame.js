import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function NewsDataFrame({ data }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Sentiment</TableCell>
						<TableCell>Insight</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
						<TableRow
							key={index}
							sx={{
								'&:hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.04)',
								},
							}}
						>
							<TableCell>{item.Date}</TableCell>
							<TableCell>{item.Title}</TableCell>
							<TableCell>{item.Description}</TableCell>
							<TableCell>{item.Sentiment}</TableCell>
							<TableCell>{item.Insight}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
}

export default NewsDataFrame;
