import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { setApiKey, getApiKey } from '../config/api';

const SetupContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 2px solid #667eea;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const Button = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  &:hover {
    background: #5a6fd8;
  }
`;

const Status = styled.div`
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  ${props => props.success ? `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  ` : props.error ? `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  ` : `
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  `}
`;

const ApiKeySetup = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const existingKey = getApiKey();
    if (existingKey) {
      setStatus('API key已設置');
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setStatus('請輸入API key');
      return;
    }
    try {
      setApiKey(apiKey.trim());
      setStatus('API key設置成功！');
      setApiKeyState('');
    } catch (error) {
      setStatus('設置失敗：' + error.message);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('google_ai_api_key');
    setStatus('API key已清除');
  };

  const handleTest = async () => {
    const currentKey = getApiKey();
    if (!currentKey) {
      setStatus('請先設置API key');
      return;
    }

    setStatus('測試中...');
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Hello, please respond with "API test successful"'
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('API測試成功！');
        console.log('API測試響應:', data);
      } else {
        const errorText = await response.text();
        setStatus(`API測試失敗: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      setStatus('API測試失敗: ' + error.message);
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <SetupContainer>
      <Title>Google AI API Key 設置</Title>
      <Input
        type="password"
        placeholder="請輸入您的Google AI API Key"
        value={apiKey}
        onChange={(e) => setApiKeyState(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button onClick={handleSave}>保存</Button>
        <Button onClick={handleTest} style={{ background: '#28a745' }}>測試</Button>
        <Button onClick={handleClear} style={{ background: '#dc3545' }}>
          清除
        </Button>
      </div>
      {status && (
        <Status success={status.includes('成功')} error={status.includes('失敗')}>
          {status}
        </Status>
      )}
    </SetupContainer>
  );
};

export default ApiKeySetup; 