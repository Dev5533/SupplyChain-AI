import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Container, Row, Col, Spinner, Card, Table } from 'react-bootstrap';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/news/analytics');

        const tagCounts = res.data?.tagCounts || [];
        const tags = tagCounts.map(item => item._id);
        const counts = tagCounts.map(item => item.count);
        const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8'];

        setTotalArticles(res.data?.totalArticles || 0);

        setBarData({
          labels: tags,
          datasets: [{
            label: 'Articles per Tag',
            data: counts,
            backgroundColor: colors
          }]
        });

        setPieData({
          labels: tags,
          datasets: [{
            data: counts,
            backgroundColor: colors
          }]
        });

        setLatestArticles(res.data?.latestPerTag || []);
      } catch (err) {
        console.error("Failed to load analytics:", err.message);
        setBarData(null);
        setPieData(null);
        setLatestArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Container>
      <h3 className="mb-4">📈 Supply Chain Insights Dashboard</h3>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <h5>Total Tagged Articles: {totalArticles}</h5>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h5>🧱 Articles by Tag (Bar Chart)</h5>
                  <div style={{ height: '300px' }}>
                    {barData ? (
                      <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>No data available for bar chart.</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <h5>📊 Tag Proportions (Pie Chart)</h5>
                  <div style={{ height: '300px' }}>
                    {pieData ? (
                      <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                    ) : (
                      <p>No data available for pie chart.</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mb-4">
            <Card.Body>
              <h5>📰 Latest News per Tag</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Latest Article</th>
                    <th>Source</th>
                    <th>Published</th>
                  </tr>
                </thead>
                <tbody>
                  {latestArticles.length > 0 ? (
                    latestArticles.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item._id}</td>
                        <td>{item.latest || 'N/A'}</td>
                        <td>{item.source || 'N/A'}</td>
                        <td>{item.publishedAt ? new Date(item.publishedAt).toLocaleString() : 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No articles found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Analytics;
