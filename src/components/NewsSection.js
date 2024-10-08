import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsSection.css';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '23204da0183e40f599f784efc00f8854',
            pageSize: 5,
          },
        });
        setNews(response.data.articles);
      } catch (err) {
        setError('Unable to fetch news. Please try again later.');
      }
    };
    fetchNews();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="news-section">
      <h2>Latest Headlines</h2>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>Source: {article.source.name} | Date: {new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;
