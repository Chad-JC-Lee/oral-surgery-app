import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Activity, Bed, Droplets, ArrowLeft, Home } from 'lucide-react';
import googleAiService from './services/googleAiService';
import ApiKeySetup from './components/ApiKeySetup';

// 動畫定義
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  color: #2c3e50;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 10px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: rgba(255,255,255,0.9);
  font-size: 1.1rem;
  margin: 0;
`;

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
`;

const NavButton = styled.button`
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.active ? 'white' : 'rgba(255,255,255,0.6)'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:not(:last-child)::after {
    content: '→';
    margin: 0 15px;
    color: rgba(255,255,255,0.6);
  }
`;

const SymptomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SymptomCard = styled.div`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 25px;
  border-radius: 15px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e0e0e0'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
`;

const SymptomIcon = styled.div`
  margin-bottom: 15px;
  color: #667eea;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? '#667eea' : 'rgba(102, 126, 234, 0.1)'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : 'rgba(102, 126, 234, 0.2)'};
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
`;

const SummaryContainer = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 600;
  color: #495057;
`;

const SummaryValue = styled.span`
  color: #667eea;
  font-weight: 500;
`;

// 載入動畫組件
const LoadingContainer = styled.div`
  text-align: center;
  padding: 60px 40px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  color: #2c3e50;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #667eea;
  animation: ${bounce} 1.4s ease-in-out infinite both;
  animation-delay: ${props => props.delay}s;
`;

// AI選項容器
const AiOptionsContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
`;

const OptionCard = styled.button`
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: left;
  margin-bottom: 15px;
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${props => props.delay}s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-color: #667eea;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const OptionTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const OptionDescription = styled.p`
  margin: 0;
  opacity: 0.8;
  line-height: 1.5;
`;

// 錯誤容器
const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ErrorMessage = styled.p`
  color: ${props => props.isServiceUnavailable ? '#856404' : '#e74c3c'};
  font-size: 1.1rem;
  margin-bottom: 20px;
  background: ${props => props.isServiceUnavailable ? '#fff3cd' : '#f8d7da'};
  border: 1px solid ${props => props.isServiceUnavailable ? '#ffeaa7' : '#f5c6cb'};
  padding: 15px;
  border-radius: 8px;
`;

const RetryButton = styled(ActionButton)`
  background: #28a745;
  color: white;
  border-color: #28a745;
  
  &:hover {
    background: #218838;
  }
`;

// 進度指示器
const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const ProgressStep = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#667eea' : '#e0e0e0'};
  transition: all 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 0.9rem;
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

function App() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [aiOptions, setAiOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subOptions, setSubOptions] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [detailedOptions, setDetailedOptions] = useState([]);
  const [selectedDetailedOption, setSelectedDetailedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', isServiceUnavailable: false });
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [apiCallCount, setApiCallCount] = useState(0); // 添加API調用計數器
  const [isProcessing, setIsProcessing] = useState(false); // 添加防抖機制
  
  // 多維度評估狀態
  const [dimensionSelections, setDimensionSelections] = useState({});

  const [dimensionData, setDimensionData] = useState(null);

  const symptoms = [
    {
      id: 'pain',
      title: '疼痛',
      description: '評估疼痛程度、位置和性質',
      icon: Activity
    },
    {
      id: 'sleep',
      title: '睡眠困難',
      description: '評估睡眠質量和相關問題',
      icon: Bed
    },
    {
      id: 'tube',
      title: '管路問題',
      description: '評估各種管路的狀況',
      icon: Droplets
    },
    {
      id: 'excretion',
      title: '排泄問題',
      description: '評估大小便相關問題',
      icon: Droplets
    }
  ];

  // 使用 useCallback 來避免不必要的重新渲染
  const fetchAiOptions = useCallback(async (symptomId, isSubLevel = false, parentOption = null, step = null) => {
    // 第一層使用預設選項，不需要API調用
    if (!isSubLevel) {
      setLoading(false);
      setError({ message: '', isServiceUnavailable: false });
      setAiOptions(getDefaultOptions(symptomId));
      return;
    }

    // 限制API調用次數，防止過載
    if (apiCallCount >= 10) {
      console.warn('API調用次數過多，使用預設選項');
      setSubOptions(getDefaultSubOptions(symptomId, parentOption));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError({ message: '', isServiceUnavailable: false });
    setApiCallCount(prev => prev + 1);
    
    try {
      const symptomName = symptoms.find(s => s.id === symptomId)?.title;
      
      // 如果是多維度評估的結果，構建綜合描述
      let combinedDescription = '';
      if (parentOption === 'combined' && dimensionData && dimensionSelections) {
        const descriptions = [];
        dimensionData.dimensions.forEach(dimension => {
          const selectedOptionId = dimensionSelections[dimension.id];
          
          // 特殊處理疼痛程度（VAS）
          if (symptomId === 'pain' && dimension.id === 'pain_level') {
            if (selectedOptionId !== undefined) {
              descriptions.push(`${dimension.title}: ${selectedOptionId}/10分`);
            }
          } else {
            // 處理其他維度
            const selectedOption = dimension.options.find(opt => opt.id === selectedOptionId);
            if (selectedOption) {
              descriptions.push(`${dimension.title}: ${selectedOption.title}`);
            }
          }
        });
        combinedDescription = descriptions.join('; ');
      }
      
      const data = await googleAiService.generateSymptomOptions(symptomId, symptomName, isSubLevel, parentOption, combinedDescription);
      
      const targetStep = step || currentStep;
      if (targetStep === 2) {
        setSubOptions(data.options || []);
        setSelectedSubOption(null);
      } else if (targetStep === 3) {
        setDetailedOptions(data.options || []);
        setSelectedDetailedOption(null);
      }
    } catch (err) {
      console.error('Google AI服務失敗:', err);
      
      // 確保錯誤對象有正確的結構
      const errorMessage = err && err.message ? err.message : '未知錯誤';
      
      // 檢查是否是服務不可用錯誤
      if (errorMessage.includes('503') || errorMessage.includes('overloaded') || errorMessage.includes('UNAVAILABLE')) {
        setError({ message: 'AI服務暫時不可用，正在使用預設選項...', isServiceUnavailable: true });
        // 延遲一下讓用戶看到錯誤信息
        setTimeout(() => {
          const targetStep = step || currentStep;
          if (targetStep === 2) {
            setSubOptions(getDefaultSubOptions(symptomId, parentOption));
          } else if (targetStep === 3) {
            setDetailedOptions(getDefaultSubOptions(symptomId, parentOption));
          }
          setError({ message: '', isServiceUnavailable: false });
        }, 2000);
      } else {
        setError({ message: errorMessage, isServiceUnavailable: false });
        // 如果Google AI服務失敗，使用預設選項
        const targetStep = step || currentStep;
        if (targetStep === 2) {
          setSubOptions(getDefaultSubOptions(symptomId, parentOption));
        } else if (targetStep === 3) {
          setDetailedOptions(getDefaultSubOptions(symptomId, parentOption));
        }
      }
    } finally {
      setLoading(false);
    }
  }, [apiCallCount, symptoms, dimensionData, dimensionSelections, currentStep]);

  const getDefaultOptions = (symptomId) => {
    const defaultOptions = {
      pain: {
        dimensions: [
          {
            id: 'pain_level',
            title: '疼痛程度',
            options: [] // 使用VAS滑動條，不需要選項
          },
          {
            id: 'pain_location',
            title: '疼痛位置',
            options: [
              { id: 'incision', title: '手術切口', description: '' },
              { id: 'tooth', title: '牙齒', description: '' },
              { id: 'throat', title: '喉嚨', description: '' },
              { id: 'head', title: '頭部', description: '' },
              { id: 'neck', title: '頸部', description: '' },
              { id: 'chest', title: '胸部', description: '' }
            ]
          },
          {
            id: 'pain_nature',
            title: '疼痛性質',
            options: [
              { id: 'dull', title: '鈍痛', description: '' },
              { id: 'sharp', title: '刺痛', description: '' },
              { id: 'throbbing', title: '跳痛', description: '' },
              { id: 'burning', title: '灼痛', description: '' },
              { id: 'aching', title: '隱痛', description: '' },
              { id: 'cramping', title: '痙攣痛', description: '' }
            ]
          },
          {
            id: 'pain_pattern',
            title: '疼痛模式',
            options: [
              { id: 'continuous', title: '持續性', description: '' },
              { id: 'intermittent', title: '間歇性', description: '' },
              { id: 'activity_related', title: '活動相關', description: '' },
              { id: 'position_related', title: '姿勢相關', description: '' },
              { id: 'time_related', title: '時間相關', description: '' }
            ]
          }
        ]
      },
      sleep: {
        dimensions: [
          {
            id: 'sleep_problems',
            title: '睡眠問題',
            options: [
              { id: 'difficulty_falling', title: '入睡困難', description: '' },
              { id: 'frequent_waking', title: '容易醒來', description: '' },
              { id: 'early_waking', title: '早醒', description: '' }
            ]
          },
          {
            id: 'sleep_duration',
            title: '睡眠時長',
            options: [
              { id: 'less_than_4', title: '少於4小時', description: '' },
              { id: '4_to_6', title: '4-6小時', description: '' },
              { id: '6_to_8', title: '6-8小時', description: '' },
              { id: 'more_than_8', title: '8小時以上', description: '' }
            ]
          },
          {
            id: 'sleep_disturbance',
            title: '干擾因素',
            options: [
              { id: 'pain', title: '疼痛', description: '' },
              { id: 'anxiety', title: '焦慮', description: '' },
              { id: 'environment', title: '環境', description: '' },
              { id: 'breathing', title: '呼吸問題', description: '' },
              { id: 'none', title: '無干擾', description: '' }
            ]
          }
        ]
      },
      tube: {
        dimensions: [
          {
            id: 'tube_type',
            title: '哪一管路問題',
            options: [
              { id: 'nasogastric', title: '鼻胃管', description: '' },
              { id: 'drainage', title: '引流管', description: '' },
              { id: 'tracheostomy', title: '氣切管', description: '' },
              { id: 'catheter', title: '導尿管', description: '' }
            ]
          },
          {
            id: 'tube_abnormal',
            title: '異常情形',
            options: [
              { id: 'bleeding', title: '滲血', description: '' },
              { id: 'discharge', title: '分泌物變多', description: '' },
              { id: 'loose', title: '管路鬆動', description: '' },
              { id: 'pain', title: '疼痛', description: '' }
            ]
          },
          {
            id: 'tube_color',
            title: '顏色變化',
            options: [
              { id: 'normal', title: '正常', description: '' },
              { id: 'yellow', title: '發黃', description: '' },
              { id: 'green', title: '發綠', description: '' },
              { id: 'red', title: '發紅', description: '' }
            ]
          }
        ]
      },
      excretion: {
        dimensions: [
          {
            id: 'urination_status',
            title: '小便狀況',
            options: [
              { id: 'normal', title: '正常', description: '' },
              { id: 'difficulty', title: '排尿困難', description: '' },
              { id: 'frequency_change', title: '頻率改變', description: '' },
              { id: 'incontinence', title: '尿失禁', description: '' },
              { id: 'blood_urine', title: '血尿', description: '' }
            ]
          },
          {
            id: 'bowel_status',
            title: '大便狀況',
            options: [
              { id: 'normal', title: '正常', description: '' },
              { id: 'constipation', title: '便秘', description: '' },
              { id: 'diarrhea', title: '腹瀉', description: '' },
              { id: 'blood_stool', title: '血便', description: '' },
              { id: 'irregular', title: '不規律', description: '' }
            ]
          },
          {
            id: 'excretion_timing',
            title: '排泄時間',
            options: [
              { id: 'normal_timing', title: '正常時間', description: '' },
              { id: 'frequent', title: '頻繁', description: '' },
              { id: 'infrequent', title: '稀少', description: '' },
              { id: 'nocturnal', title: '夜間頻繁', description: '' }
            ]
          }
        ]
      }
    };
    
    return defaultOptions[symptomId] || { dimensions: [] };
  };

  const getDefaultSubOptions = (symptomId, parentOption) => {
    const defaultSubOptions = {
      pain: {
        mild_pain: [
          { id: 'dull_pain', title: '鈍痛', description: '持續性的鈍痛，疼痛性質較為溫和，可以忍受' },
          { id: 'aching_pain', title: '隱痛', description: '深層的隱痛，疼痛位置不明確，可能為內臟痛' },
          { id: 'soreness', title: '酸痛', description: '肌肉酸痛感，可能因手術後活動減少造成' }
        ],
        moderate_pain: [
          { id: 'throbbing_pain', title: '跳痛', description: '有節奏的跳痛，可能與心跳同步，疼痛強度會變化' },
          { id: 'distending_pain', title: '脹痛', description: '脹脹的疼痛感，可能因局部腫脹或壓力造成' },
          { id: 'burning_pain', title: '灼痛', description: '火燒般的疼痛，可能因神經受損或炎症造成' }
        ],
        severe_pain: [
          { id: 'sharp_pain', title: '刺痛', description: '尖銳的刺痛，疼痛強度很高，難以忍受' },
          { id: 'tearing_pain', title: '撕裂痛', description: '如撕裂般的劇烈疼痛，需要立即醫療處理' },
          { id: 'cramping_pain', title: '痙攣痛', description: '間歇性的痙攣痛，疼痛強度會突然變化' }
        ],
        localized_pain: [
          { id: 'incision_pain', title: '切口疼痛', description: '手術切口部位的疼痛，可能因縫線或癒合過程造成' },
          { id: 'tooth_pain', title: '牙齒疼痛', description: '牙齒或牙齦的疼痛，可能因手術影響口腔' },
          { id: 'throat_pain', title: '喉嚨疼痛', description: '喉嚨部位的疼痛，可能因插管或手術影響' }
        ],
        radiating_pain: [
          { id: 'head_radiation', title: '向頭部放射', description: '疼痛向頭部放射，可能因神經受壓或炎症' },
          { id: 'neck_radiation', title: '向頸部放射', description: '疼痛向頸部放射，可能影響轉頭和活動' },
          { id: 'shoulder_radiation', title: '向肩部放射', description: '疼痛向肩部放射，可能影響上肢活動' }
        ],
        intermittent_pain: [
          { id: 'activity_related', title: '活動相關', description: '疼痛與特定活動相關，如說話、進食、轉頭等' },
          { id: 'position_related', title: '姿勢相關', description: '疼痛與身體姿勢相關，改變姿勢可緩解' },
          { id: 'time_related', title: '時間相關', description: '疼痛在特定時間加重，如夜間或進食後' }
        ]
      },
      sleep: {
        difficulty_falling: [
          { id: 'pain_insomnia', title: '疼痛失眠', description: '因手術部位疼痛而無法入睡，需要止痛藥物' },
          { id: 'anxiety_insomnia', title: '焦慮失眠', description: '因手術後焦慮和擔心而無法放鬆入睡' },
          { id: 'environment_insomnia', title: '環境失眠', description: '因醫院環境、噪音或光線而無法入睡' }
        ],
        frequent_waking: [
          { id: 'pain_waking', title: '疼痛醒來', description: '因疼痛而夜間醒來，需要調整姿勢或服藥' },
          { id: 'breathing_waking', title: '呼吸問題醒來', description: '因呼吸困難或鼻塞而夜間醒來' },
          { id: 'urination_waking', title: '夜尿頻繁', description: '因夜間頻繁排尿而影響睡眠連續性' }
        ],
        early_waking: [
          { id: 'early_awake', title: '早醒', description: '比平時早醒，無法再入睡' },
          { id: 'light_sleep_early', title: '淺眠早醒', description: '睡眠很淺，容易早醒' },
          { id: 'anxiety_early', title: '焦慮早醒', description: '因焦慮而早醒，無法繼續睡眠' }
        ],

        less_than_4: [
          { id: 'severe_insomnia', title: '嚴重失眠', description: '每晚睡眠少於4小時，嚴重影響日間功能' },
          { id: 'pain_short_sleep', title: '疼痛影響', description: '因疼痛而無法長時間睡眠' },
          { id: 'anxiety_short_sleep', title: '焦慮影響', description: '因焦慮而無法長時間睡眠' }
        ],
        '4_to_6': [
          { id: 'moderate_insomnia', title: '中度失眠', description: '每晚睡眠4-6小時，略顯不足' },
          { id: 'partial_rest', title: '部分休息', description: '睡眠時間勉強夠用，但品質不佳' },
          { id: 'interrupted_sleep', title: '間斷睡眠', description: '睡眠時間被多次打斷' }
        ],
        '6_to_8': [
          { id: 'adequate_sleep', title: '充足睡眠', description: '每晚睡眠6-8小時，基本充足' },
          { id: 'normal_duration', title: '正常時長', description: '睡眠時間在正常範圍內' },
          { id: 'good_quality', title: '品質良好', description: '睡眠時間充足且品質良好' }
        ],
        more_than_8: [
          { id: 'excessive_sleep', title: '過度睡眠', description: '每晚睡眠超過8小時，可能因疲勞或藥物' },
          { id: 'recovery_sleep', title: '恢復睡眠', description: '因手術後需要更多休息時間' },
          { id: 'medication_sleep', title: '藥物影響', description: '因藥物作用而睡眠時間延長' }
        ],
        pain: [
          { id: 'surgical_pain', title: '手術疼痛', description: '手術部位疼痛影響睡眠' },
          { id: 'position_pain', title: '姿勢疼痛', description: '因疼痛而無法找到舒適睡眠姿勢' },
          { id: 'medication_pain', title: '藥物依賴', description: '需要止痛藥物才能入睡' }
        ],
        anxiety: [
          { id: 'surgery_worry', title: '手術擔心', description: '因擔心手術結果而焦慮' },
          { id: 'future_worry', title: '未來擔心', description: '因擔心未來治療而無法放鬆' },
          { id: 'stress_sleep', title: '壓力失眠', description: '因手術後各種壓力而無法放鬆' }
        ],
        environment: [
          { id: 'hospital_noise', title: '醫院噪音', description: '醫院環境噪音影響睡眠' },
          { id: 'bright_light', title: '光線過亮', description: '病房光線過亮影響睡眠' },
          { id: 'uncomfortable_bed', title: '床鋪不適', description: '病床不舒適影響睡眠' }
        ],
        breathing: [
          { id: 'nasal_obstruction', title: '鼻塞', description: '因手術後鼻塞而影響呼吸' },
          { id: 'throat_discomfort', title: '喉嚨不適', description: '因喉嚨不適而影響呼吸' },
          { id: 'shortness_breath', title: '呼吸困難', description: '因呼吸困難而無法安睡' }
        ]
      },
      tube: {
        normal_condition: [
          { id: 'removal_question', title: '移除時間', description: '想了解何時可以安全移除管路' },
          { id: 'care_instruction', title: '護理指導', description: '需要詳細的管路護理指導和注意事項' },
          { id: 'comfort_improvement', title: '舒適改善', description: '希望改善管路舒適度，減少異物感' }
        ],
        mild_discomfort: [
          { id: 'tight_fixation', title: '固定過緊', description: '管路固定過緊造成局部壓迫和不適' },
          { id: 'foreign_body', title: '異物感', description: '明顯感覺到管路的存在，有異物感' },
          { id: 'mild_pressure', title: '輕微壓迫', description: '管路造成輕微壓迫感，但不影響功能' }
        ],
        serious_issue: [
          { id: 'bleeding', title: '滲血', description: '管路周圍有滲血，需要立即處理' },
          { id: 'infection', title: '感染徵象', description: '管路周圍有紅腫、發熱等感染徵象' },
          { id: 'displacement', title: '管路移位', description: '管路位置發生改變，可能影響功能' }
        ],
        irritation: [
          { id: 'skin_redness', title: '皮膚發紅', description: '管路周圍皮膚發紅，可能有過敏反應' },
          { id: 'itching', title: '瘙癢', description: '管路周圍皮膚瘙癢，可能因摩擦或過敏' },
          { id: 'rash', title: '皮疹', description: '管路周圍出現皮疹，需要皮膚科評估' }
        ],
        pressure_discomfort: [
          { id: 'circulation_issue', title: '循環問題', description: '管路壓迫影響局部血液循環' },
          { id: 'swelling', title: '腫脹', description: '管路周圍出現腫脹，可能因壓迫造成' },
          { id: 'numbness', title: '麻木', description: '管路周圍出現麻木感，可能因神經受壓' }
        ],
        movement_restriction: [
          { id: 'speaking_difficulty', title: '說話困難', description: '管路影響說話功能，發音不清' },
          { id: 'eating_difficulty', title: '進食困難', description: '管路影響進食功能，咀嚼或吞嚥困難' },
          { id: 'head_movement', title: '頭部活動受限', description: '管路影響頭部轉動等活動' }
        ]
      },
      excretion: {
        urination_issue: [
          { id: 'difficulty_urinating', title: '排尿困難', description: '無法正常排尿，需要用力或等待' },
          { id: 'incontinence', title: '尿失禁', description: '無法控制排尿，可能因手術影響神經' },
          { id: 'frequency_change', title: '頻率改變', description: '排尿頻率異常，可能增加或減少' }
        ],
        bowel_issue: [
          { id: 'constipation', title: '便秘', description: '排便困難或次數減少，可能因藥物或活動減少' },
          { id: 'diarrhea', title: '腹瀉', description: '頻繁的稀便，可能因藥物或感染造成' },
          { id: 'blood_stool', title: '血便', description: '大便中帶血，需要立即就醫檢查' }
        ],
        no_issue: [
          { id: 'normal_function', title: '功能正常', description: '大小便功能完全正常，無異常症狀' },
          { id: 'slight_change', title: '輕微變化', description: '有輕微的變化但無大礙，屬於正常範圍' },
          { id: 'monitoring', title: '持續觀察', description: '需要持續觀察變化，目前無明顯異常' }
        ],
        frequency_change: [
          { id: 'increased_frequency', title: '頻率增加', description: '排尿或排便頻率明顯增加' },
          { id: 'decreased_frequency', title: '頻率減少', description: '排尿或排便頻率明顯減少' },
          { id: 'irregular_pattern', title: '不規律', description: '排尿或排便模式不規律，無法預測' }
        ],
        incontinence: [
          { id: 'urinary_incontinence', title: '尿失禁', description: '無法控制排尿，可能因手術影響' },
          { id: 'fecal_incontinence', title: '大便失禁', description: '無法控制排便，可能因手術影響' },
          { id: 'mixed_incontinence', title: '混合失禁', description: '同時存在尿失禁和大便失禁' }
        ],
        blood_in_stool: [
          { id: 'blood_urine', title: '血尿', description: '小便中帶血，需要立即就醫檢查' },
          { id: 'blood_stool_only', title: '血便', description: '大便中帶血，需要立即就醫檢查' },
          { id: 'both_blood', title: '血尿血便', description: '同時存在血尿和血便，需要緊急就醫' }
        ]
      }
    };
    
    return defaultSubOptions[symptomId]?.[parentOption] || [];
  };

  const handleSymptomSelect = useCallback(async (symptomId) => {
    setSelectedSymptom(symptomId);
    setShowAiSummary(false);
    setSelectedOption(null);
    setSelectedSubOption(null);
    setSubOptions([]);
    setCurrentStep(1);
    setError({ message: '', isServiceUnavailable: false });
    
    // 初始化多維度評估
    const symptomData = getDefaultOptions(symptomId);
    setDimensionData(symptomData);
    setDimensionSelections({});
  }, []);

  const handleDimensionSelect = useCallback((dimensionId, optionId) => {
    setDimensionSelections(prev => ({
      ...prev,
      [dimensionId]: optionId
    }));
  }, []);

  const handleOptionSelect = useCallback(async (optionId) => {
    setSelectedOption(optionId);
    setCurrentStep(2);
    setError({ message: '', isServiceUnavailable: false });
    
    // 調用AI API獲取第二層選項
    await fetchAiOptions(selectedSymptom, true, optionId, 2);
  }, [fetchAiOptions, selectedSymptom]);

  const handleSubOptionSelect = useCallback(async (subOptionId) => {
    setSelectedSubOption(subOptionId);
    setError({ message: '', isServiceUnavailable: false });
    
    // 設置當前步驟為3並調用API
    setCurrentStep(3);
    await fetchAiOptions(selectedSymptom, true, subOptionId, 3);
  }, [fetchAiOptions, selectedSymptom]);

  const handleDetailedOptionSelect = useCallback((detailedOptionId) => {
    setSelectedDetailedOption(detailedOptionId);
    setShowAiSummary(true);
  }, []);

  const handleBack = useCallback(() => {
    if (currentStep === 3) {
      // 回到第二層
      setCurrentStep(2);
      setSelectedDetailedOption(null);
      setDetailedOptions([]);
      setShowAiSummary(false);
    } else if (currentStep === 2) {
      // 回到第一層
      setCurrentStep(1);
      setSelectedSubOption(null);
      setSubOptions([]);
      setShowAiSummary(false);
    } else {
      // 回到主選單
      setSelectedSymptom(null);
      setShowAiSummary(false);
      setAiOptions([]);
      setSelectedOption(null);
      setSelectedSubOption(null);
      setSubOptions([]);
      setSelectedDetailedOption(null);
      setDetailedOptions([]);
      setCurrentStep(1);
      setLoading(false);
      setError({ message: '', isServiceUnavailable: false });
      setApiCallCount(0); // 重置API調用計數器
      setDimensionSelections({});
      setDimensionData(null);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setSelectedSymptom(null);
    setShowAiSummary(false);
    setAiOptions([]);
    setSelectedOption(null);
    setSelectedSubOption(null);
    setSubOptions([]);
    setSelectedDetailedOption(null);
    setDetailedOptions([]);
    setCurrentStep(1);
    setLoading(false);
    setError({ message: '', isServiceUnavailable: false });
    setApiCallCount(0); // 重置API調用計數器
    setDimensionSelections({});
    setDimensionData(null);
  }, []);

  // 添加防抖機制，避免快速點擊
  const debouncedSymptomSelect = useCallback(async (symptomId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    await handleSymptomSelect(symptomId);
    setIsProcessing(false);
  }, [handleSymptomSelect, isProcessing]);



  const renderAiOptions = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>
            {currentStep === 1 ? '載入標準化評估選項...' : 'AI正在根據您的評估結果生成深入問題...'}
          </LoadingText>
          <LoadingDots>
            <Dot delay={0} />
            <Dot delay={0.2} />
            <Dot delay={0.4} />
          </LoadingDots>
          {apiCallCount > 0 && currentStep === 2 && (
            <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
              AI分析次數: {apiCallCount}/10
            </div>
          )}
        </LoadingContainer>
      );
    }

    if (error && error.message) {
      return (
        <ErrorContainer>
          <ErrorMessage isServiceUnavailable={error.isServiceUnavailable}>載入失敗: {error.message}</ErrorMessage>
          {apiCallCount >= 10 && (
            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              padding: '10px', 
              borderRadius: '5px', 
              marginTop: '10px',
              fontSize: '0.9rem',
              color: '#856404'
            }}>
              已達到API調用限制，使用預設選項
            </div>
          )}
          <RetryButton onClick={() => fetchAiOptions(selectedSymptom, currentStep === 2, selectedOption)}>
            重試
          </RetryButton>
        </ErrorContainer>
      );
    }

    // 第一層：多維度評估
    if (currentStep === 1 && dimensionData) {
      const currentDimensions = dimensionData.dimensions;
      
      return (
        <AiOptionsContainer>
          <ProgressIndicator>
            <ProgressStep active={currentStep >= 1} />
            <ProgressText active={currentStep >= 1}>多維度評估</ProgressText>
            <ProgressStep active={currentStep >= 2} />
            <ProgressText active={currentStep >= 2}>AI精細分析</ProgressText>
          </ProgressIndicator>
          
          <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#2c3e50' }}>
            請完成以下評估項目
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {currentDimensions.map((dimension, dimensionIndex) => (
              <div key={dimension.id} style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '10px', 
                padding: '20px',
                background: '#fafafa'
              }}>
                <h3 style={{ 
                  marginBottom: '15px', 
                  color: '#2c3e50', 
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  {dimension.title}
                </h3>
                
                {/* VAS疼痛量表 */}
                {selectedSymptom === 'pain' && dimension.id === 'pain_level' && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>VAS疼痛量表：</span>
                      <span style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold', 
                        color: '#667eea',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}>
                        {dimensionSelections[dimension.id] || '0'}/10
                      </span>
                    </div>
                    
                    {/* VAS滑動條 */}
                    <div 
                      style={{ 
                        position: 'relative',
                        background: 'linear-gradient(to right, #4caf50, #ff9800, #f44336)',
                        height: '8px',
                        borderRadius: '4px',
                        marginBottom: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percentage = Math.max(0, Math.min(1, x / rect.width));
                        const score = Math.round(percentage * 10);
                        handleDimensionSelect(dimension.id, score.toString());
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          left: `${((parseInt(dimensionSelections[dimension.id] || 0) / 10) * 100)}%`,
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#667eea',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          pointerEvents: 'none',
                          transform: 'translateX(-50%)'
                        }}
                      />
                    </div>
                    
                    {/* 標籤 */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: '#666',
                      marginTop: '5px'
                    }}>
                      <span>無痛</span>
                      <span>最痛</span>
                    </div>
                  </div>
                )}
                
                {/* 一般選項 - 兩欄顯示 */}
                {dimension.options.length > 0 && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '10px',
                    marginTop: '10px'
                  }}>
                    {dimension.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        onClick={() => handleDimensionSelect(dimension.id, option.id)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '2px solid',
                          borderColor: dimensionSelections[dimension.id] === option.id ? '#667eea' : '#e0e0e0',
                          background: dimensionSelections[dimension.id] === option.id ? '#667eea' : '#fff',
                          color: dimensionSelections[dimension.id] === option.id ? '#fff' : '#2c3e50',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '3px',
                          minHeight: '60px',
                          justifyContent: 'center'
                        }}
                      >
                        <div style={{ 
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          textAlign: 'center'
                        }}>
                          {option.title}
                        </div>
                        {option.description && (
                          <div style={{ 
                            fontSize: '0.75rem',
                            opacity: dimensionSelections[dimension.id] === option.id ? '0.9' : '0.7',
                            textAlign: 'center'
                          }}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* 完成按鈕 */}
          {Object.keys(dimensionSelections).length === currentDimensions.length && (
            <div style={{ 
              marginTop: '30px', 
              textAlign: 'center',
              padding: '20px',
              background: '#e8f5e8',
              borderRadius: '10px',
              border: '1px solid #4caf50'
            }}>
              <p style={{ 
                margin: '0 0 15px 0', 
                color: '#2e7d32',
                fontWeight: '600'
              }}>
                ✅ 所有評估項目已完成
              </p>
              <ActionButton 
                primary 
                onClick={async () => {
                  setCurrentStep(2);
                  setLoading(true);
                  // 調用AI API生成初步主訴
                  await fetchAiOptions(selectedSymptom, true, 'combined', 2);
                }}
              >
                繼續進行初步主訴
              </ActionButton>
            </div>
          )}
        </AiOptionsContainer>
      );
    }

    // 第二層或第三層：AI主訴分析
    let options, selectedId, onOptionSelect, stepTitle;
    
    if (currentStep === 2) {
      // 第二層：初步主訴
      options = subOptions;
      selectedId = selectedSubOption;
      onOptionSelect = handleSubOptionSelect;
      stepTitle = 'AI正在模擬病人的初步主訴...';
    } else if (currentStep === 3) {
      // 第三層：詳細主訴
      options = detailedOptions;
      selectedId = selectedDetailedOption;
      onOptionSelect = handleDetailedOptionSelect;
      stepTitle = 'AI正在生成更詳細的主訴描述...';
    }

    if (options.length === 0) {
      return (
        <ErrorContainer>
          <ErrorMessage>無法載入選項</ErrorMessage>
        </ErrorContainer>
      );
    }

    return (
      <AiOptionsContainer>
        <ProgressIndicator>
          <ProgressStep active={currentStep >= 1} />
          <ProgressText active={currentStep >= 1}>多維度評估</ProgressText>
          <ProgressStep active={currentStep >= 2} />
          <ProgressText active={currentStep >= 2}>初步主訴</ProgressText>
          <ProgressStep active={currentStep >= 3} />
          <ProgressText active={currentStep >= 3}>詳細主訴</ProgressText>
        </ProgressIndicator>
        
        <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#2c3e50' }}>
          {stepTitle}
        </h2>
        
        {apiCallCount > 0 && (currentStep === 2 || currentStep === 3) && (
          <div style={{ 
            background: '#e3f2fd', 
            border: '1px solid #bbdefb', 
            padding: '8px 12px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            fontSize: '0.8rem',
            color: '#1976d2',
            textAlign: 'center'
          }}>
            AI分析次數: {apiCallCount}/10 {apiCallCount >= 8 && '(接近限制)'}
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              selected={selectedId === option.id}
              onClick={() => onOptionSelect(option.id)}
              delay={index * 0.1}
            >
              <OptionTitle>{option.title}</OptionTitle>
              <OptionDescription>{option.description}</OptionDescription>
            </OptionCard>
          ))}
        </div>
      </AiOptionsContainer>
    );
  };

  const renderAiSummary = () => {
    const selectedSubOptionData = subOptions.find(option => option.id === selectedSubOption);
    const selectedDetailedOptionData = detailedOptions.find(option => option.id === selectedDetailedOption);
    const symptomName = symptoms.find(s => s.id === selectedSymptom)?.title;
    
    return (
      <SummaryContainer>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          {symptomName}評估總結
        </h3>
        
        {/* 顯示多維度評估結果 */}
        {dimensionData && Object.keys(dimensionSelections).length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>多維度評估結果：</h4>
            {dimensionData.dimensions.map((dimension, index) => {
              const selectedOptionId = dimensionSelections[dimension.id];
              const selectedOption = dimension.options.find(opt => opt.id === selectedOptionId);
              
              // 跳過疼痛程度的分數顯示，只顯示其他維度
              if (selectedSymptom === 'pain' && dimension.id === 'pain_level') {
                return null;
              }
              
              return (
                <SummaryItem key={dimension.id}>
                  <SummaryLabel>{dimension.title}：</SummaryLabel>
                  <SummaryValue>
                    {selectedOption?.title || '未選擇'}
                  </SummaryValue>
                </SummaryItem>
              );
            })}
          </div>
        )}
        
        {selectedSubOptionData && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>初步主訴：</h4>
            <SummaryItem>
              <SummaryLabel>主訴：</SummaryLabel>
              <SummaryValue>{selectedSubOptionData.title}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>詳細描述：</SummaryLabel>
              <SummaryValue>{selectedSubOptionData.description}</SummaryValue>
            </SummaryItem>
          </div>
        )}
        
        {selectedDetailedOptionData && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>詳細主訴：</h4>
            <SummaryItem>
              <SummaryLabel>主訴：</SummaryLabel>
              <SummaryValue>{selectedDetailedOptionData.title}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>詳細描述：</SummaryLabel>
              <SummaryValue>{selectedDetailedOptionData.description}</SummaryValue>
            </SummaryItem>
          </div>
        )}
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <ActionButton onClick={() => {
            setShowAiSummary(false);
            if (selectedDetailedOptionData) {
              setSelectedDetailedOption(null);
              setDetailedOptions([]);
              setCurrentStep(3);
            } else {
              setSelectedSubOption(null);
              setCurrentStep(2);
            }
          }}>
            重新選擇主訴
          </ActionButton>
        </div>
      </SummaryContainer>
    );
  };

  return (
    <AppContainer>
      <ApiKeySetup />
      <Header>
        <Title>術後主訴表達系統</Title>
        <Subtitle>請選擇您目前的主要不適症狀</Subtitle>
      </Header>

      <ContentCard>
        <StepIndicator>
          <Step active={!selectedSymptom}>選擇主訴</Step>
          <Step active={selectedSymptom && !showAiSummary}>評估中</Step>
          <Step active={showAiSummary}>完成</Step>
        </StepIndicator>

        {!selectedSymptom && (
          <>
            <h2 style={{ marginBottom: '30px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              請選擇您目前的主要主訴
            </h2>
            <SymptomGrid>
              {symptoms.map((symptom, index) => {
                const IconComponent = symptom.icon;
                return (
                  <SymptomCard
                    key={symptom.id}
                    onClick={() => debouncedSymptomSelect(symptom.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <SymptomIcon>
                      <IconComponent size={32} />
                    </SymptomIcon>
                    <h3>{symptom.title}</h3>
                    <p>{symptom.description}</p>
                  </SymptomCard>
                );
              })}
            </SymptomGrid>
          </>
        )}

        {selectedSymptom && (
          <>
            <NavigationBar>
              <NavButton onClick={handleBack}>
                <ArrowLeft size={18} />
                {currentStep === 2 ? '返回上一步' : '返回選擇主訴'}
              </NavButton>
              <NavButton onClick={handleReset}>
                <Home size={18} />
                重新開始
              </NavButton>
            </NavigationBar>

            <h2 style={{ marginBottom: '20px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              {symptoms.find(s => s.id === selectedSymptom)?.title}評估
            </h2>
            
            {!showAiSummary && renderAiOptions()}
            
            {showAiSummary && renderAiSummary()}

            <ButtonContainer>
              <ActionButton onClick={handleBack}>
                {currentStep === 2 ? '返回上一步' : '返回選擇主訴'}
              </ActionButton>
              {showAiSummary && (
                <ActionButton primary onClick={handleReset}>
                  完成並重新開始
                </ActionButton>
              )}
            </ButtonContainer>
          </>
        )}
      </ContentCard>
    </AppContainer>
  );
}

export default App; 