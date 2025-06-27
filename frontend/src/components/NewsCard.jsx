import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const NewsCard = ({ article }) => {
  const { title, summary, source, publishedAt, tag } = article;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{source}</Card.Subtitle>
        <Card.Text>{summary}</Card.Text>
        <Badge bg="primary">🏷 {tag}</Badge>
        <Card.Footer className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
          {new Date(publishedAt).toLocaleString()}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
