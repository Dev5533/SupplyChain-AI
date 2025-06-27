import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const SubscriptionToggle = () => {
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const fetchStatus = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:8080/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSubscribed(res.data.isSubscribed);
      } catch (err) {
        console.error('❌ Failed to fetch subscription status:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [token]);

  const toggleSubscription = async () => {
    try {
      const res = await axios.put(
        'http://localhost:8080/api/auth/toggle-subscription',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSubscribed((prev) => !prev);
    } catch (err) {
      console.error('❌ Failed to toggle subscription:', err.message);
    }
  };

  if (!token || loading) return null;

  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <label className="form-check-label me-2">Email Subscription</label>
      <input
        type="checkbox"
        className="form-check-input"
        checked={isSubscribed}
        onChange={toggleSubscription}
      />
    </div>
  );
};

export default SubscriptionToggle;
