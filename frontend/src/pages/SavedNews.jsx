import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { Container, Row, Col, Form } from 'react-bootstrap';

const SavedNews = () => {
  const [articles, setArticles] = useState([]);
  const [filterTag, setFilterTag] = useState('All');
  const API_BASE = process.env.REACT_APP_API_BASE;

  const fetchSavedNews = useCallback(async (tag = 'All') => {
    try {
      const response = await axios.get(`${API_BASE}/api/news/saved`, {
        params: tag === 'All' ? {} : { tag },
      });
      const fetchedArticles = response.data?.articles || [];
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching saved news:', error.message);
      setArticles([]);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchSavedNews(filterTag);
  }, [filterTag, fetchSavedNews]);

  return (
    <Container className="mt-4">
      <h3 className="mb-3">📰 Saved AI-Tagged News</h3>

      <Form.Select
        className="mb-4 w-50"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
      >
        <option value="All">All Tags</option>
        <option value="Cybersecurity incident affecting supply chains">Cyberattack</option>
        <option value="Natural disaster disrupting transportation or goods">Natural Disaster</option>
        <option value="Product or material shortage causing supply chain delays">Shortage</option>
        <option value="Delays in shipment or logistics">Logistics Delay</option>
        <option value="Increase in product prices affecting supply chain">Price Surge</option>
      </Form.Select>

      <Row>
        <Col>
          {articles.length === 0 ? (
            <p>No saved news found.</p>
          ) : (
            articles.map((article, idx) => <NewsCard key={idx} article={article} />)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SavedNews;
