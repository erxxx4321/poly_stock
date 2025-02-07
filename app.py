import streamlit as st
from polygon import RESTClient
from polygon.rest.models import (
    TickerNews,
)
import pandas as pd
client = RESTClient(api_key="kYjjviVsgQqOfp02zupca1fsv8L5Wlu_")

st.set_page_config(layout="wide")
st.subheader("Polygon Stock News Data")

with st.form("stock_search_form"):
    ticker = st.text_input("Ticker Symbol (e.g., TSM, NVDA)", placeholder="Enter ticker symbol")
    date_from = st.date_input("Start Date")
    date_to = st.date_input("End Date")
    submitted = st.form_submit_button("Search")

    lst = []
    if submitted:
        for news in client.list_ticker_news(ticker, order="desc", limit=1000, published_utc_gte=date_from, published_utc_lte=date_to):
            if isinstance(news, TickerNews):
                ist = '';sent = ''
                if news.insights is not None:
                    for insight in news.insights:
                        if insight.ticker == ticker:
                            sent = insight.sentiment
                            ist = insight.sentiment_reasoning
                lst.append([news.published_utc, news.title, news.description, sent, ist])
                
        df = pd.DataFrame(lst, columns= ['Date', 'Title', 'Description', 'Sentiment', 'Insight'])
        st.dataframe(df)
