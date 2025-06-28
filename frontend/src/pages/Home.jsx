import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { Container, Spinner } from 'react-bootstrap';
import SubscriptionToggle from '../components/SubscriptionToggle';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchLiveNews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/news`);
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Failed to fetch live news:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveNews();
  }, [API_BASE]);

  return (
    <Container>
      <h3 className="mb-4">📡 Live Supply Chain News</h3>
      <SubscriptionToggle />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" role="status" />
          <span className="ms-3">Loading news, please wait...</span>
        </div>
      ) : (
        Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article, idx) => <NewsCard key={idx} article={article} />)
        ) : (
          <p>No news available yet.</p>
        )
      )}
    </Container>
  );
};

export default Home;