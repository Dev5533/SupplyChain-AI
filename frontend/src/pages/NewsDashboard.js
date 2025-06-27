import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

function NewsDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await axios.get('https://supplychain-backend-hy60.onrender.com/api/news');
      setArticles(res.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <h2 className="mb-4">📦 Supply Chain Disruption News</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {articles.map((article, idx) => (
            <Col md={6} key={idx} className="mb-4">
              <Card>
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {article.source} — <span className="badge bg-info text-dark">🏷 {article.tag}</span>
                    </Card.Subtitle>
                    <Card.Text>{article.summary}</Card.Text>
                    <Card.Footer>
                        <small className="text-muted">{new Date(article.publishedAt).toLocaleString()}</small>
                    </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default NewsDashboard;
