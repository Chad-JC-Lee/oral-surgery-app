import React, { useState } from 'react';
import styled from 'styled-components';
import { Activity, Bed, Droplets, ArrowLeft, Home, ChevronRight } from 'lucide-react';

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
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: #667eea;
  }
`;

const SymptomIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: ${props => props.selected ? 'white' : '#667eea'};
`;

const SymptomTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.6rem;
  font-weight: 600;
`;

const SymptomDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
  line-height: 1.5;
`;

const QuestionContainer = styled.div`
  margin-bottom: 30px;
`;

const QuestionTitle = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
`;

const OptionCard = styled.div`
  background: ${props => props.selected ? '#667eea' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 12px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e0e0e0'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.selected ? '#667eea' : '#667eea'};
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const PainSlider = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const Slider = styled.input`
  width: 100%;
  max-width: 400px;
  height: 8px;
  border-radius: 5px;
  background: #e0e0e0;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    border: none;
  }
`;

const SliderValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin: 10px 0;
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  font-size: 0.9rem;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? '#667eea' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : '#667eea'};
    color: white;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SummaryContainer = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 600;
  color: #2c3e50;
`;

const SummaryValue = styled.span`
  color: #667eea;
  font-weight: 500;
`;

function App() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [painAnswers, setPainAnswers] = useState({
    hasPain: null,
    location: null,
    intensity: 5,
    nature: null,
    timing: null,
    change: null
  });
  const [sleepAnswers, setSleepAnswers] = useState({
    sleepProblemType: null,
    sleepHours: null,
    hasPainDuringSleep: null,
    wakeUpTimes: null
  });
  const [tubeAnswers, setTubeAnswers] = useState({
    tubeType: null,
    abnormalCondition: null,
    colorChange: null
  });
  const [excretionAnswers, setExcretionAnswers] = useState({
    problemType: null,
    urineProblem: null,
    bowelProblem: null,
    diarrheaFrequency: null,
    constipationDays: null,
    hasAbnormalOdor: null
  });
  const [showSleepSummary, setShowSleepSummary] = useState(false);
  const [showTubeSummary, setShowTubeSummary] = useState(false);
  const [showExcretionSummary, setShowExcretionSummary] = useState(false);

  const symptoms = [
    {
      id: 'pain',
      title: '疼痛',
      description: '手術部位或周圍疼痛',
      icon: <Activity />
    },
    {
      id: 'sleep',
      title: '睡眠困難',
      description: '無法入睡或睡眠品質差',
      icon: <Bed />
    },
    {
      id: 'tube',
      title: '管路問題',
      description: '鼻胃管、導尿管、引流管等相關問題',
      icon: <Droplets />
    },
    {
      id: 'excretion',
      title: '排泄問題',
      description: '排尿、排便困難或異常',
      icon: <Droplets />
    }
  ];

  const painQuestions = [
    {
      id: 'hasPain',
      title: '您目前是否有疼痛？',
      type: 'choice',
      options: ['是', '否']
    },
    {
      id: 'location',
      title: '疼痛主要發生在哪個部位？',
      type: 'choice',
      options: ['口腔', '咽喉', '頸部', '傷口', '胸部', '腹部', '其他']
    },
    {
      id: 'intensity',
      title: '請評估您的疼痛程度（1-10分）',
      type: 'slider',
      min: 1,
      max: 10
    },
    {
      id: 'nature',
      title: '疼痛的性質是什麼？',
      type: 'choice',
      options: ['鈍痛', '刺痛', '灼熱', '抽痛', '其他']
    },
    {
      id: 'timing',
      title: '疼痛的時間模式是？',
      type: 'choice',
      options: ['持續性', '間歇性', '夜間加劇', '吃東西時加劇']
    },
    {
      id: 'change',
      title: '疼痛的變化趨勢是？',
      type: 'choice',
      options: ['越來越痛', '穩定', '減輕', '不確定']
    }
  ];

  const sleepQuestions = [
    {
      id: 'sleepProblemType',
      title: '您主要的睡眠問題類型是？',
      type: 'choice',
      options: ['難以入睡', '容易醒來', '經常作夢', '醒後無法再睡', '無法平躺睡覺']
    },
    {
      id: 'sleepHours',
      title: '您平均每晚大約睡眠幾個小時？',
      type: 'choice',
      options: ['少於4小時', '4-6小時', '6-8小時', '8小時以上']
    },
    {
      id: 'hasPainDuringSleep',
      title: '睡眠時是否會感到疼痛？',
      type: 'choice',
      options: ['是', '否']
    },
    {
      id: 'wakeUpTimes',
      title: '晚上平均醒來幾次？',
      type: 'choice',
      options: ['0 次', '1–2 次', '3 次以上']
    }
  ];

  const tubeQuestions = [
    {
      id: 'tubeType',
      title: '下列哪一項管路不適？',
      type: 'choice',
      options: ['氣切管', '鼻胃管', '尿管', '引流管', '其他']
    },
    {
      id: 'abnormalCondition',
      title: '管路問題為何？',
      type: 'choice',
      options: ['滲血', '分泌物變多', '管子鬆動', '疼痛', '無異常，但想了解何時可以移除管路']
    },
    {
      id: 'colorChange',
      title: '管路周圍或分泌物顏色變化？',
      type: 'choice',
      options: ['正常', '發黃', '發綠', '發紅']
    }
  ];

  const excretionQuestions = [
    {
      id: 'problemType',
      title: '排泄問題類型',
      type: 'choice',
      options: ['小便問題', '大便問題']
    },
    {
      id: 'urineProblem',
      title: '小便問題為何？',
      type: 'choice',
      conditional: '小便問題',
      options: ['小便困難', '尿失禁', '血尿', '頻率增加', '頻率減少']
    },
    {
      id: 'bowelProblem',
      title: '大便問題為何？',
      type: 'choice',
      conditional: '大便問題',
      options: ['便秘', '腹瀉', '黑便']
    },
    {
      id: 'diarrheaFrequency',
      title: '一天腹瀉幾次？',
      type: 'choice',
      conditional: '腹瀉',
      options: ['1-2次', '3-4次', '5-6次', '7次以上']
    },
    {
      id: 'constipationDays',
      title: '幾天未解便？',
      type: 'choice',
      conditional: '便秘',
      options: ['1-2天', '3-4天', '5-6天', '7天以上']
    },
    {
      id: 'hasAbnormalOdor',
      title: '是否有異味或異色？',
      type: 'choice',
      options: ['是', '否']
    }
  ];

  const handleSymptomSelect = (symptomId) => {
    setSelectedSymptom(symptomId);
    setShowSleepSummary(false);
    setShowTubeSummary(false);
    setShowExcretionSummary(false);
    if (symptomId === 'sleep') {
      setSleepAnswers({
        sleepProblemType: null,
        sleepHours: null,
        hasPainDuringSleep: null,
        wakeUpTimes: null
      });
    } else if (symptomId === 'tube') {
      setTubeAnswers({
        tubeType: null,
        abnormalCondition: null,
        colorChange: null
      });
    } else if (symptomId === 'excretion') {
      setExcretionAnswers({
        problemType: null,
        urineProblem: null,
        bowelProblem: null,
        diarrheaFrequency: null,
        constipationDays: null,
        hasAbnormalOdor: null
      });
    }
  };

  const handlePainAnswer = (questionId, answer) => {
    setPainAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSleepAnswer = (questionId, answer) => {
    setSleepAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleTubeAnswer = (questionId, answer) => {
    setTubeAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleExcretionAnswer = (questionId, answer) => {
    setExcretionAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleBack = () => {
    setSelectedSymptom(null);
    setShowSleepSummary(false);
    setShowTubeSummary(false);
    setShowExcretionSummary(false);
  };

  const handleReset = () => {
    setSelectedSymptom(null);
    setShowSleepSummary(false);
    setShowTubeSummary(false);
    setShowExcretionSummary(false);
    setPainAnswers({
      hasPain: null,
      location: null,
      intensity: 5,
      nature: null,
      timing: null,
      change: null
    });
    setSleepAnswers({
      sleepProblemType: null,
      sleepHours: null,
      hasPainDuringSleep: null,
      wakeUpTimes: null
    });
    setTubeAnswers({
      tubeType: null,
      abnormalCondition: null,
      colorChange: null
    });
    setExcretionAnswers({
      problemType: null,
      urineProblem: null,
      bowelProblem: null,
      diarrheaFrequency: null,
      constipationDays: null,
      hasAbnormalOdor: null
    });
  };

  const renderPainQuestion = () => {
    return (
      <div>
        {painQuestions.map((question, index) => {
          const currentAnswer = painAnswers[question.id];
          
          return (
            <QuestionContainer key={question.id}>
              <QuestionTitle>{question.title}</QuestionTitle>
              
              {question.type === 'choice' && (
                <OptionGrid>
                  {question.options.map((option, idx) => (
                    <OptionCard
                      key={idx}
                      selected={currentAnswer === option}
                      onClick={() => handlePainAnswer(question.id, option)}
                    >
                      {option}
                    </OptionCard>
                  ))}
                </OptionGrid>
              )}
              
              {question.type === 'slider' && (
                <PainSlider>
                  <SliderValue>{painAnswers.intensity}</SliderValue>
                  <Slider
                    type="range"
                    min={question.min}
                    max={question.max}
                    value={painAnswers.intensity}
                    onChange={(e) => handlePainAnswer('intensity', parseInt(e.target.value))}
                  />
                  <SliderLabels>
                    <span>輕微 (1)</span>
                    <span>嚴重 (10)</span>
                  </SliderLabels>
                </PainSlider>
              )}
            </QuestionContainer>
          );
        })}
      </div>
    );
  };

  const renderSleepQuestion = () => {
    return (
      <div>
        {sleepQuestions.map((question, index) => {
          const currentAnswer = sleepAnswers[question.id];
          
          return (
            <QuestionContainer key={question.id}>
              <QuestionTitle>{question.title}</QuestionTitle>
              
              {question.type === 'choice' && (
                <OptionGrid>
                  {question.options.map((option, idx) => (
                    <OptionCard
                      key={idx}
                      selected={currentAnswer === option}
                      onClick={() => handleSleepAnswer(question.id, option)}
                    >
                      {option}
                    </OptionCard>
                  ))}
                </OptionGrid>
              )}
            </QuestionContainer>
          );
        })}
      </div>
    );
  };

  const renderTubeQuestion = () => {
    return (
      <div>
        {tubeQuestions.map((question, index) => {
          const currentAnswer = tubeAnswers[question.id];
          
          return (
            <QuestionContainer key={question.id}>
              <QuestionTitle>{question.title}</QuestionTitle>
              
              {question.type === 'choice' && (
                <OptionGrid>
                  {question.options.map((option, idx) => (
                    <OptionCard
                      key={idx}
                      selected={currentAnswer === option}
                      onClick={() => handleTubeAnswer(question.id, option)}
                    >
                      {option}
                    </OptionCard>
                  ))}
                </OptionGrid>
              )}
            </QuestionContainer>
          );
        })}
      </div>
    );
  };

  const renderExcretionQuestion = () => {
    return (
      <div>
        {excretionQuestions.map((question, index) => {
          const currentAnswer = excretionAnswers[question.id];
          
          // 處理條件性問題顯示
          if (question.conditional) {
            if (question.conditional === '小便問題' && excretionAnswers.problemType !== '小便問題') {
              return null;
            }
            if (question.conditional === '大便問題' && excretionAnswers.problemType !== '大便問題') {
              return null;
            }
            if (question.conditional === '腹瀉' && excretionAnswers.bowelProblem !== '腹瀉') {
              return null;
            }
            if (question.conditional === '便秘' && excretionAnswers.bowelProblem !== '便秘') {
              return null;
            }
            if (question.conditional === '是' && excretionAnswers.hasAbnormalOdor !== '是') {
              return null;
            }
          }
          
          return (
            <QuestionContainer key={question.id}>
              <QuestionTitle>{question.title}</QuestionTitle>
              
              {question.type === 'choice' && (
                <OptionGrid>
                  {question.options.map((option, idx) => (
                    <OptionCard
                      key={idx}
                      selected={currentAnswer === option}
                      onClick={() => handleExcretionAnswer(question.id, option)}
                    >
                      {option}
                    </OptionCard>
                  ))}
                </OptionGrid>
              )}
            </QuestionContainer>
          );
        })}
      </div>
    );
  };

  const isPainComplete = () => {
    return Object.values(painAnswers).every(answer => answer !== null);
  };

  const isSleepComplete = () => {
    return Object.values(sleepAnswers).every(answer => answer !== null);
  };

  const isTubeComplete = () => {
    return tubeQuestions.every(question => tubeAnswers[question.id]);
  };

  const isExcretionComplete = () => {
    // 基本問題必須回答
    if (!excretionAnswers.problemType || !excretionAnswers.hasAbnormalOdor) {
      return false;
    }
    
    // 根據問題類型檢查對應的子問題
    if (excretionAnswers.problemType === '小便問題' && !excretionAnswers.urineProblem) {
      return false;
    }
    if (excretionAnswers.problemType === '大便問題' && !excretionAnswers.bowelProblem) {
      return false;
    }
    
    // 檢查大便問題的子問題
    if (excretionAnswers.bowelProblem === '腹瀉' && !excretionAnswers.diarrheaFrequency) {
      return false;
    }
    if (excretionAnswers.bowelProblem === '便秘' && !excretionAnswers.constipationDays) {
      return false;
    }
    
    return true;
  };

  const renderPainSummary = () => {
    return (
      <SummaryContainer>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          疼痛評估總結
        </h3>
        <SummaryItem>
          <SummaryLabel>是否有疼痛：</SummaryLabel>
          <SummaryValue>{painAnswers.hasPain}</SummaryValue>
        </SummaryItem>
        {painAnswers.hasPain === '是' && (
          <>
            <SummaryItem>
              <SummaryLabel>疼痛部位：</SummaryLabel>
              <SummaryValue>{painAnswers.location}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>疼痛程度：</SummaryLabel>
              <SummaryValue>{painAnswers.intensity}分</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>疼痛性質：</SummaryLabel>
              <SummaryValue>{painAnswers.nature}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>疼痛時間模式：</SummaryLabel>
              <SummaryValue>{painAnswers.timing}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>疼痛變化趨勢：</SummaryLabel>
              <SummaryValue>{painAnswers.change}</SummaryValue>
            </SummaryItem>
          </>
        )}
      </SummaryContainer>
    );
  };

  const renderSleepSummary = () => {
    return (
      <SummaryContainer>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          睡眠困難評估總結
        </h3>
        <SummaryItem>
          <SummaryLabel>睡眠問題類型：</SummaryLabel>
          <SummaryValue>{sleepAnswers.sleepProblemType}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>平均每晚睡眠時數：</SummaryLabel>
          <SummaryValue>{sleepAnswers.sleepHours}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>睡眠時是否疼痛：</SummaryLabel>
          <SummaryValue>{sleepAnswers.hasPainDuringSleep}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>晚上醒來次數：</SummaryLabel>
          <SummaryValue>{sleepAnswers.wakeUpTimes}</SummaryValue>
        </SummaryItem>
        {sleepAnswers.hasPainDuringSleep === '是' && (
          <div style={{ 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            padding: '15px', 
            marginTop: '15px',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#856404' }}>
              建議：由於您睡眠時會感到疼痛，建議您也進行疼痛評估
            </strong>
          </div>
        )}
      </SummaryContainer>
    );
  };

  const renderTubeSummary = () => {
    return (
      <SummaryContainer>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          管路問題評估總結
        </h3>
        <SummaryItem>
          <SummaryLabel>管路種類：</SummaryLabel>
          <SummaryValue>{tubeAnswers.tubeType}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>異常情形：</SummaryLabel>
          <SummaryValue>{tubeAnswers.abnormalCondition}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>顏色變化：</SummaryLabel>
          <SummaryValue>{tubeAnswers.colorChange}</SummaryValue>
        </SummaryItem>
        {tubeAnswers.abnormalCondition === '疼痛' && (
          <div style={{ 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            padding: '15px', 
            marginTop: '15px',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#856404' }}>
              建議：由於管路造成疼痛，建議您也進行疼痛評估
            </strong>
          </div>
        )}
      </SummaryContainer>
    );
  };

  const renderExcretionSummary = () => {
    const isUrgent = ['血尿', '黑便'].includes(excretionAnswers.urineProblem) || 
                    ['血尿', '黑便'].includes(excretionAnswers.bowelProblem);

    return (
      <SummaryContainer>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
          排泄問題評估總結
        </h3>
        <SummaryItem>
          <SummaryLabel>問題類型：</SummaryLabel>
          <SummaryValue>{excretionAnswers.problemType}</SummaryValue>
        </SummaryItem>
        {excretionAnswers.problemType === '小便問題' && (
          <SummaryItem>
            <SummaryLabel>小便問題：</SummaryLabel>
            <SummaryValue>{excretionAnswers.urineProblem}</SummaryValue>
          </SummaryItem>
        )}
        {excretionAnswers.problemType === '大便問題' && (
          <>
            <SummaryItem>
              <SummaryLabel>大便問題：</SummaryLabel>
              <SummaryValue>{excretionAnswers.bowelProblem}</SummaryValue>
            </SummaryItem>
            {excretionAnswers.bowelProblem === '腹瀉' && (
              <SummaryItem>
                <SummaryLabel>腹瀉頻率：</SummaryLabel>
                <SummaryValue>{excretionAnswers.diarrheaFrequency}</SummaryValue>
              </SummaryItem>
            )}
            {excretionAnswers.bowelProblem === '便秘' && (
              <SummaryItem>
                <SummaryLabel>便秘天數：</SummaryLabel>
                <SummaryValue>{excretionAnswers.constipationDays}</SummaryValue>
              </SummaryItem>
            )}
          </>
        )}
        <SummaryItem>
          <SummaryLabel>是否有異味或異色：</SummaryLabel>
          <SummaryValue>{excretionAnswers.hasAbnormalOdor}</SummaryValue>
        </SummaryItem>
        {isUrgent && (
          <div style={{ 
            background: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '8px', 
            padding: '15px', 
            marginTop: '15px',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#721c24' }}>
              緊急：發現血尿或黑便，建議立即通知醫護人員
            </strong>
          </div>
        )}
        {['解便疼痛', '解便困難'].includes(excretionAnswers.bowelProblem) && (
          <div style={{ 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px', 
            padding: '15px', 
            marginTop: '15px',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#856404' }}>
              建議：由於解便時疼痛，建議您也進行疼痛評估
            </strong>
          </div>
        )}
      </SummaryContainer>
    );
  };

  return (
    <AppContainer>
      <Header>
        <Title>術後主訴表達系統</Title>
        <Subtitle>請選擇您目前的主要不適症狀</Subtitle>
      </Header>

      <ContentCard>
        <StepIndicator>
          <Step active={!selectedSymptom}>選擇主訴</Step>
          <Step active={selectedSymptom && selectedSymptom !== 'sleep' && selectedSymptom !== 'tube' && selectedSymptom !== 'excretion' && selectedSymptom !== 'pain'}>評估中</Step>
          <Step active={(selectedSymptom === 'sleep' && isSleepComplete()) || (selectedSymptom === 'tube' && isTubeComplete()) || (selectedSymptom === 'excretion' && isExcretionComplete()) || (selectedSymptom === 'pain' && isPainComplete())}>完成</Step>
        </StepIndicator>

        {!selectedSymptom && (
          <>
            <h2 style={{ marginBottom: '30px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              請選擇您目前的主要主訴
            </h2>
            <SymptomGrid>
              {symptoms.map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  selected={false}
                  onClick={() => handleSymptomSelect(symptom.id)}
                >
                  <SymptomIcon selected={false}>{symptom.icon}</SymptomIcon>
                  <SymptomTitle>{symptom.title}</SymptomTitle>
                  <SymptomDescription>{symptom.description}</SymptomDescription>
                </SymptomCard>
              ))}
            </SymptomGrid>
          </>
        )}

        {selectedSymptom === 'pain' && (
          <>
            <NavigationBar>
              <NavButton onClick={handleBack}>
                <ArrowLeft size={18} />
                返回選擇主訴
              </NavButton>
              <NavButton onClick={handleReset}>
                <Home size={18} />
                重新開始
              </NavButton>
            </NavigationBar>

            <h2 style={{ marginBottom: '20px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              疼痛評估
            </h2>
            
                         {renderPainQuestion()}
             
             {isPainComplete() && (
               <>
                 <div style={{ margin: '30px 0', textAlign: 'center' }}>
                   <ActionButton primary onClick={() => setPainAnswers({
                     hasPain: null,
                     location: null,
                     intensity: 5,
                     nature: null,
                     timing: null,
                     change: null
                   })}>
                     重新評估疼痛
                   </ActionButton>
                 </div>
                 {renderPainSummary()}
               </>
             )}

            <ButtonContainer>
              <ActionButton onClick={handleBack}>
                返回選擇主訴
              </ActionButton>
              {isPainComplete() && (
                <ActionButton primary onClick={handleReset}>
                  完成並重新開始
                </ActionButton>
              )}
            </ButtonContainer>
          </>
        )}

        {selectedSymptom === 'sleep' && (
          <>
            <NavigationBar>
              <NavButton onClick={handleBack}>
                <ArrowLeft size={18} />
                返回選擇主訴
              </NavButton>
              <NavButton onClick={handleReset}>
                <Home size={18} />
                重新開始
              </NavButton>
            </NavigationBar>

            <h2 style={{ marginBottom: '20px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              睡眠困難評估
            </h2>
            
            {!showSleepSummary && renderSleepQuestion()}
            
            {showSleepSummary && (
              <>
                <div style={{ margin: '30px 0', textAlign: 'center' }}>
                  <ActionButton primary onClick={() => {
                    setShowSleepSummary(false);
                    setSleepAnswers({
                      sleepProblemType: null,
                      sleepHours: null,
                      hasPainDuringSleep: null,
                      wakeUpTimes: null
                    });
                  }}>
                    重新評估睡眠
                  </ActionButton>
                </div>
                {renderSleepSummary()}
              </>
            )}

            <ButtonContainer>
              <ActionButton onClick={handleBack}>
                返回選擇主訴
              </ActionButton>
              {!showSleepSummary && isSleepComplete() && (
                <ActionButton primary onClick={() => setShowSleepSummary(true)}>
                  下一步
                  <ChevronRight size={18} />
                </ActionButton>
              )}
              {showSleepSummary && (
                <ActionButton primary onClick={handleReset}>
                  完成並重新開始
                </ActionButton>
              )}
            </ButtonContainer>
          </>
        )}

        {selectedSymptom === 'tube' && (
          <>
            <NavigationBar>
              <NavButton onClick={handleBack}>
                <ArrowLeft size={18} />
                返回選擇主訴
              </NavButton>
              <NavButton onClick={handleReset}>
                <Home size={18} />
                重新開始
              </NavButton>
            </NavigationBar>

            <h2 style={{ marginBottom: '20px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              管路問題評估
            </h2>
            
            {!showTubeSummary && renderTubeQuestion()}
            
            {showTubeSummary && (
              <>
                <div style={{ margin: '30px 0', textAlign: 'center' }}>
                  <ActionButton primary onClick={() => {
                    setShowTubeSummary(false);
                    setTubeAnswers({
                      tubeType: null,
                      abnormalCondition: null,
                      colorChange: null
                    });
                  }}>
                    重新評估管路
                  </ActionButton>
                </div>
                {renderTubeSummary()}
              </>
            )}

            <ButtonContainer>
              <ActionButton onClick={handleBack}>
                返回選擇主訴
              </ActionButton>
              {!showTubeSummary && isTubeComplete() && (
                <ActionButton primary onClick={() => setShowTubeSummary(true)}>
                  下一步
                  <ChevronRight size={18} />
                </ActionButton>
              )}
              {showTubeSummary && (
                <ActionButton primary onClick={handleReset}>
                  完成並重新開始
                </ActionButton>
              )}
            </ButtonContainer>
          </>
        )}

        {selectedSymptom === 'excretion' && (
          <>
            <NavigationBar>
              <NavButton onClick={handleBack}>
                <ArrowLeft size={18} />
                返回選擇主訴
              </NavButton>
              <NavButton onClick={handleReset}>
                <Home size={18} />
                重新開始
              </NavButton>
            </NavigationBar>

            <h2 style={{ marginBottom: '20px', color: '#2c3e50', textAlign: 'center', fontSize: '1.8rem' }}>
              排泄問題評估
            </h2>
            
            {!showExcretionSummary && renderExcretionQuestion()}
            
            {showExcretionSummary && (
              <>
                <div style={{ margin: '30px 0', textAlign: 'center' }}>
                  <ActionButton primary onClick={() => {
                    setShowExcretionSummary(false);
                    setExcretionAnswers({
                      problemType: null,
                      urineProblem: null,
                      bowelProblem: null,
                      diarrheaFrequency: null,
                      constipationDays: null,
                      hasAbnormalOdor: null
                    });
                  }}>
                    重新評估排泄
                  </ActionButton>
                </div>
                {renderExcretionSummary()}
              </>
            )}

            <ButtonContainer>
              <ActionButton onClick={handleBack}>
                返回選擇主訴
              </ActionButton>
              {!showExcretionSummary && isExcretionComplete() && (
                <ActionButton primary onClick={() => setShowExcretionSummary(true)}>
                  下一步
                  <ChevronRight size={18} />
                </ActionButton>
              )}
              {showExcretionSummary && (
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