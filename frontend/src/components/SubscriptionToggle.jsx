import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const SubscriptionToggle = () => {
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const API_BASE = process.env.REACT_APP_API_BASE;

  // Load cached subscription status from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('isSubscribed');
    if (cached !== null) {
      setIsSubscribed(JSON.parse(cached));
    }
  }, []);

  // Fetch real subscription status from server
  useEffect(() => {
    const fetchStatus = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSubscribed(res.data.isSubscribed);
        localStorage.setItem('isSubscribed', JSON.stringify(res.data.isSubscribed));
      } catch (err) {
        console.error('Failed to fetch subscription status:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [token, API_BASE]);

  const toggleSubscription = async () => {
    try {
      await axios.put(
        `${API_BASE}/api/auth/toggle-subscription`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSubscribed((prev) => {
        const newVal = !prev;
        localStorage.setItem('isSubscribed', JSON.stringify(newVal));
        return newVal;
      });
    } catch (err) {
      console.error('Failed to toggle subscription:', err.message);
    }
  };

  if (!token || loading || isSubscribed === null) return null;

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
