import streamlit as st
import streamlit.components.v1 as components
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

    positive_code = 0
    neutral_code = 0
    negative_code = 0
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
                if sent == 'positive':
                    positive_code += 1
                elif sent == 'neutral':
                    neutral_code += 1
                elif sent == 'negative':
                    negative_code += 1
                lst.append([news.published_utc, news.title, news.description, sent, ist])
                
        df = pd.DataFrame(lst, columns= ['Date', 'Title', 'Description', 'Sentiment', 'Insight'])
       
        total_code = positive_code + neutral_code + negative_code
        positive_cent = "{:.0%}".format(positive_code / total_code)
        neutral_cent = "{:.0%}".format(neutral_code / total_code)
        negative_cent = "{:.0%}".format(negative_code / total_code)

        components.html(f"""
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: {negative_cent}" aria-valuenow="{negative_cent.replace('%','')}" aria-valuemin="0" aria-valuemax="100">{negative_cent}</div>
                <div class="progress-bar bg-light text-dark" role="progressbar" style="width: {neutral_cent}" aria-valuenow="{neutral_cent.replace('%','')}" aria-valuemin="0" aria-valuemax="100">{neutral_cent}</div>
                <div class="progress-bar bg-danger" role="progressbar" style="width: {positive_cent}" aria-valuenow="{positive_cent.replace('%','')}" aria-valuemin="0" aria-valuemax="100">{positive_cent}</div>
            </div>
        """, height=50)

        st.dataframe(df)