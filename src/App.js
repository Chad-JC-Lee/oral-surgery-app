import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Activity,
  Droplets,
  Heart,
  AlertTriangle,
  Bed,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 2px solid #e0e0e0;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active ? '#3498db' : '#ecf0f1'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 10px;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 2px;
    background: #ecf0f1;
  }
`;

const SymptomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const SymptomCard = styled.div`
  background: ${props => props.selected ? '#3498db' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e0e0e0'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const SymptomIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const SymptomTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 1.5rem;
`;

const SymptomDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const PainScale = styled.div`
  margin: 30px 0;
`;

const PainLevels = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const PainLevel = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background: ${props => props.selected ? '#e74c3c' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.selected ? '#e74c3c' : '#e9ecef'};
  }
`;

const PainNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PainLabel = styled.div`
  font-size: 0.8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &.primary {
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
    }
  }
  
  &.secondary {
    background: #95a5a6;
    color: white;
    
    &:hover {
      background: #7f8c8d;
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SummaryCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  border-left: 4px solid #3498db;
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
  font-weight: bold;
  color: #2c3e50;
`;

const SummaryValue = styled.span`
  color: #7f8c8d;
`;

const PainLocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
`;

const PainLocationCard = styled.div`
  background: ${props => props.selected ? '#e67e22' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#e67e22' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const SleepOptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
`;

const SleepOptionCard = styled.div`
  background: ${props => props.selected ? '#9b59b6' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#9b59b6' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const SleepHoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
`;

const SleepHoursCard = styled.div`
  background: ${props => props.selected ? '#9b59b6' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 12px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#9b59b6' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const YesNoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 30px;
`;

const YesNoCard = styled.div`
  background: ${props => props.selected ? '#9b59b6' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#9b59b6' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const TubeTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
`;

const TubeTypeCard = styled.div`
  background: ${props => props.selected ? '#e67e22' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#e67e22' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const RemovalTimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
`;

const RemovalTimeCard = styled.div`
  background: ${props => props.selected ? '#e67e22' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 12px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#e67e22' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const ExcretionTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 30px;
`;

const ExcretionTypeCard = styled.div`
  background: ${props => props.selected ? '#16a085' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? '#16a085' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const UrinationProblemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
`;

const UrinationProblemCard = styled.div`
  background: ${props => props.selected ? '#16a085' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 12px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#16a085' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const ConstipationDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
`;

const ConstipationDaysCard = styled.div`
  background: ${props => props.selected ? '#16a085' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 12px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#16a085' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

const DiarrheaTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 30px;
`;

const DiarrheaTypeCard = styled.div`
  background: ${props => props.selected ? '#16a085' : 'white'};
  color: ${props => props.selected ? 'white' : '#2c3e50'};
  padding: 16px;
  border-radius: 10px;
  border: 2px solid ${props => props.selected ? '#16a085' : '#e0e0e0'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  }
`;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [painLevel, setPainLevel] = useState(null);
  const [painLocation, setPainLocation] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [sleepProblem, setSleepProblem] = useState(null);
  const [painAffectsSleep, setPainAffectsSleep] = useState(null);
  const [stressAffectsSleep, setStressAffectsSleep] = useState(null);
  const [tubeType, setTubeType] = useState(null);
  const [tubePain, setTubePain] = useState(null);
  const [removalTime, setRemovalTime] = useState(null);
  const [tubeMalfunction, setTubeMalfunction] = useState(null);
  const [excretionType, setExcretionType] = useState(null);
  const [urinationProblems, setUrinationProblems] = useState([]);
  const [defecationProblems, setDefecationProblems] = useState([]);
  const [constipationDays, setConstipationDays] = useState(null);
  const [constipationPain, setConstipationPain] = useState(null);
  const [diarrheaFrequency, setDiarrheaFrequency] = useState(null);
  const [diarrheaType, setDiarrheaType] = useState(null);
  const [mainComplaints, setMainComplaints] = useState([]); // 已完成的主訴
  const [showAddAnother, setShowAddAnother] = useState(false);

  // 主訴選項
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

  // 疼痛部位選項
  const painLocations = [
    '頭部', '口腔手術區域', '胸部', '腹部', '取皮瓣處'
  ];

  const painLevels = [
    { level: 0, label: '無痛' },
    { level: 1, label: '輕微' },
    { level: 2, label: '輕度' },
    { level: 3, label: '中度' },
    { level: 4, label: '中重度' },
    { level: 5, label: '重度' },
    { level: 6, label: '很重' },
    { level: 7, label: '嚴重' },
    { level: 8, label: '很嚴重' },
    { level: 9, label: '極度' },
    { level: 10, label: '無法忍受' }
  ];

  // 睡眠時數選項
  const sleepHoursOptions = [
    '少於2小時', '2-4小時', '4-6小時', '6-8小時', '8小時以上'
  ];

  // 睡眠問題類型
  const sleepProblemTypes = [
    '不容易入睡', '容易醒來', '兩者都有'
  ];

  // 管路類型選項
  const tubeTypes = [
    '鼻胃管', '氣切管', '導尿管', '引流管'
  ];

  // 預期移除時間選項
  const removalTimeOptions = [
    '是', '否'
  ];

  // 排泄類型選項
  const excretionTypes = [
    '排尿問題', '排便問題'
  ];

  // 排尿問題選項
  const urinationProblemTypes = [
    '顏色異常', '解尿困難', '解尿疼痛'
  ];

  // 排便問題選項
  const defecationProblemTypes = [
    '顏色異常', '便秘', '腹瀉'
  ];

  // 便秘天數選項
  const constipationDaysOptions = [
    '1-2天', '3-5天', '1週', '2週', '2週以上'
  ];

  // 腹瀉次數選項
  const diarrheaFrequencyOptions = [
    '1-2次/天', '3-5次/天', '6-10次/天', '10次以上/天'
  ];

  // 腹瀉類型選項
  const diarrheaTypeOptions = [
    '水瀉', '糊便'
  ];

  // 步驟流程
  // 1: 選主訴 2: 疼痛細節(若選疼痛) 3: 睡眠細節(若選睡眠困難) 4: 管路細節(若選管路問題) 5: 排泄細節(若選排泄問題) 6: 主訴摘要

  const resetCurrentComplaint = () => {
    setSelectedSymptom(null);
    setPainLevel(null);
    setPainLocation(null);
    setSleepHours(null);
    setSleepProblem(null);
    setPainAffectsSleep(null);
    setStressAffectsSleep(null);
    setTubeType(null);
    setTubePain(null);
    setRemovalTime(null);
    setTubeMalfunction(null);
    setExcretionType(null);
    setUrinationProblems([]);
    setDefecationProblems([]);
    setConstipationDays(null);
    setConstipationPain(null);
    setDiarrheaFrequency(null);
    setDiarrheaType(null);
  };

  const handleSymptomSelect = (symptomId) => {
    setSelectedSymptom(symptomId);
  };

  const handleUrinationProblemToggle = (problem) => {
    setUrinationProblems(prev => 
      prev.includes(problem) 
        ? prev.filter(p => p !== problem)
        : [...prev, problem]
    );
  };

  const handleDefecationProblemToggle = (problem) => {
    setDefecationProblems(prev => 
      prev.includes(problem) 
        ? prev.filter(p => p !== problem)
        : [...prev, problem]
    );
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (selectedSymptom === 'pain') {
        setCurrentStep(2);
      } else if (selectedSymptom === 'sleep') {
        setCurrentStep(3);
      } else if (selectedSymptom === 'tube') {
        setCurrentStep(4);
      } else if (selectedSymptom === 'excretion') {
        setCurrentStep(5);
      } else {
        setCurrentStep(6);
      }
    } else if (currentStep === 2) {
      setCurrentStep(6);
    } else if (currentStep === 3) {
      setCurrentStep(6);
    } else if (currentStep === 4) {
      setCurrentStep(6);
    } else if (currentStep === 5) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      // 完成一個主訴
      let complaint = { type: selectedSymptom };
      if (selectedSymptom === 'pain') {
        complaint.painLevel = painLevel;
        complaint.painLocation = painLocation;
      } else if (selectedSymptom === 'sleep') {
        complaint.sleepHours = sleepHours;
        complaint.sleepProblem = sleepProblem;
        complaint.painAffectsSleep = painAffectsSleep;
        complaint.stressAffectsSleep = stressAffectsSleep;
      } else if (selectedSymptom === 'tube') {
        complaint.tubeType = tubeType;
        complaint.tubePain = tubePain;
        complaint.removalTime = removalTime;
        complaint.tubeMalfunction = tubeMalfunction;
      } else if (selectedSymptom === 'excretion') {
        complaint.excretionType = excretionType;
        complaint.urinationProblems = urinationProblems;
        complaint.defecationProblems = defecationProblems;
        complaint.constipationDays = constipationDays;
        complaint.constipationPain = constipationPain;
        complaint.diarrheaFrequency = diarrheaFrequency;
        complaint.diarrheaType = diarrheaType;
      }
      setMainComplaints([...mainComplaints, complaint]);
      setShowAddAnother(true);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(1);
    } else if (currentStep === 4) {
      setCurrentStep(1);
    } else if (currentStep === 5) {
      setCurrentStep(1);
    } else if (currentStep === 6) {
      if (selectedSymptom === 'pain') {
        setCurrentStep(2);
      } else if (selectedSymptom === 'sleep') {
        setCurrentStep(3);
      } else if (selectedSymptom === 'tube') {
        setCurrentStep(4);
      } else if (selectedSymptom === 'excretion') {
        setCurrentStep(5);
      } else {
        setCurrentStep(1);
      }
    }
  };

  const handleAddAnother = () => {
    resetCurrentComplaint();
    setCurrentStep(1);
    setShowAddAnother(false);
  };

  const handleFinish = () => {
    resetCurrentComplaint();
    setShowAddAnother(false);
    setCurrentStep(7); // 進入總結頁
  };

  // 主訴選擇頁
  const renderStep1 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
        請選擇您目前的主要主訴
      </h2>
      <SymptomGrid>
        {symptoms.map(symptom => (
          <SymptomCard
            key={symptom.id}
            selected={selectedSymptom === symptom.id}
            onClick={() => handleSymptomSelect(symptom.id)}
          >
            <SymptomIcon>{symptom.icon}</SymptomIcon>
            <SymptomTitle>{symptom.title}</SymptomTitle>
            <SymptomDescription>{symptom.description}</SymptomDescription>
          </SymptomCard>
        ))}
      </SymptomGrid>
    </div>
  );

  // 疼痛細節頁
  const renderStep2 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>請評估您的疼痛</h2>
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>疼痛程度</h3>
        <PainLevels>
          {painLevels.map(({ level, label }) => (
            <PainLevel
              key={level}
              selected={painLevel === level}
              onClick={() => setPainLevel(level)}
            >
              <PainNumber>{level}</PainNumber>
              <PainLabel>{label}</PainLabel>
            </PainLevel>
          ))}
        </PainLevels>
      </div>
      <div>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>疼痛位置</h3>
        <PainLocationGrid>
          {painLocations.map(loc => (
            <PainLocationCard
              key={loc}
              selected={painLocation === loc}
              onClick={() => setPainLocation(loc)}
            >
              {loc}
            </PainLocationCard>
          ))}
        </PainLocationGrid>
      </div>
    </div>
  );

  // 睡眠困難詳細詢問頁
  const renderStep3 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>請詳細描述您的睡眠狀況</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>大約睡幾個小時？</h3>
        <SleepHoursGrid>
          {sleepHoursOptions.map(hours => (
            <SleepHoursCard
              key={hours}
              selected={sleepHours === hours}
              onClick={() => setSleepHours(hours)}
            >
              {hours}
            </SleepHoursCard>
          ))}
        </SleepHoursGrid>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>睡眠問題類型</h3>
        <SleepOptionGrid>
          {sleepProblemTypes.map(problem => (
            <SleepOptionCard
              key={problem}
              selected={sleepProblem === problem}
              onClick={() => setSleepProblem(problem)}
            >
              {problem}
            </SleepOptionCard>
          ))}
        </SleepOptionGrid>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>是否有疼痛影響睡眠？</h3>
        <YesNoGrid>
          <YesNoCard
            selected={painAffectsSleep === true}
            onClick={() => setPainAffectsSleep(true)}
          >
            是
          </YesNoCard>
          <YesNoCard
            selected={painAffectsSleep === false}
            onClick={() => setPainAffectsSleep(false)}
          >
            否
          </YesNoCard>
        </YesNoGrid>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>是否有心理壓力影響睡眠？</h3>
        <YesNoGrid>
          <YesNoCard
            selected={stressAffectsSleep === true}
            onClick={() => setStressAffectsSleep(true)}
          >
            是
          </YesNoCard>
          <YesNoCard
            selected={stressAffectsSleep === false}
            onClick={() => setStressAffectsSleep(false)}
          >
            否
          </YesNoCard>
        </YesNoGrid>
      </div>
    </div>
  );

  // 管路問題詳細詢問頁
  const renderStep4 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>請詳細描述您的管路問題</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>管路類型</h3>
        <TubeTypeGrid>
          {tubeTypes.map(type => (
            <TubeTypeCard
              key={type}
              selected={tubeType === type}
              onClick={() => setTubeType(type)}
            >
              {type}
            </TubeTypeCard>
          ))}
        </TubeTypeGrid>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>管路是否造成疼痛？</h3>
        <YesNoGrid>
          <YesNoCard
            selected={tubePain === true}
            onClick={() => setTubePain(true)}
          >
            是
          </YesNoCard>
          <YesNoCard
            selected={tubePain === false}
            onClick={() => setTubePain(false)}
          >
            否
          </YesNoCard>
        </YesNoGrid>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>想詢問預期移除時間？</h3>
        <YesNoGrid>
          <YesNoCard
            selected={removalTime === '是'}
            onClick={() => setRemovalTime('是')}
          >
            是
          </YesNoCard>
          <YesNoCard
            selected={removalTime === '否'}
            onClick={() => setRemovalTime('否')}
          >
            否
          </YesNoCard>
        </YesNoGrid>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>管路功能是否異常？</h3>
        <YesNoGrid>
          <YesNoCard
            selected={tubeMalfunction === true}
            onClick={() => setTubeMalfunction(true)}
          >
            是
          </YesNoCard>
          <YesNoCard
            selected={tubeMalfunction === false}
            onClick={() => setTubeMalfunction(false)}
          >
            否
          </YesNoCard>
        </YesNoGrid>
      </div>
    </div>
  );

  // 排泄問題詳細詢問頁
  const renderStep5 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>請詳細描述您的排泄問題</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>排泄問題類型</h3>
        <ExcretionTypeGrid>
          {excretionTypes.map(type => (
            <ExcretionTypeCard
              key={type}
              selected={excretionType === type}
              onClick={() => setExcretionType(type)}
            >
              {type}
            </ExcretionTypeCard>
          ))}
        </ExcretionTypeGrid>
      </div>

      {excretionType === '排尿問題' && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>排尿問題（可多選）</h3>
          <UrinationProblemGrid>
            {urinationProblemTypes.map(problem => (
              <UrinationProblemCard
                key={problem}
                selected={urinationProblems.includes(problem)}
                onClick={() => handleUrinationProblemToggle(problem)}
              >
                {problem}
              </UrinationProblemCard>
            ))}
          </UrinationProblemGrid>
        </div>
      )}

      {excretionType === '排便問題' && (
        <>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>排便問題（可多選）</h3>
            <UrinationProblemGrid>
              {defecationProblemTypes.map(problem => (
                <UrinationProblemCard
                  key={problem}
                  selected={defecationProblems.includes(problem)}
                  onClick={() => handleDefecationProblemToggle(problem)}
                >
                  {problem}
                </UrinationProblemCard>
              ))}
            </UrinationProblemGrid>
          </div>

          {defecationProblems.includes('便秘') && (
            <>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>幾天沒排便？</h3>
                <ConstipationDaysGrid>
                  {constipationDaysOptions.map(days => (
                    <ConstipationDaysCard
                      key={days}
                      selected={constipationDays === days}
                      onClick={() => setConstipationDays(days)}
                    >
                      {days}
                    </ConstipationDaysCard>
                  ))}
                </ConstipationDaysGrid>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>是否腹痛？</h3>
                <YesNoGrid>
                  <YesNoCard
                    selected={constipationPain === true}
                    onClick={() => setConstipationPain(true)}
                  >
                    是
                  </YesNoCard>
                  <YesNoCard
                    selected={constipationPain === false}
                    onClick={() => setConstipationPain(false)}
                  >
                    否
                  </YesNoCard>
                </YesNoGrid>
              </div>
            </>
          )}

          {defecationProblems.includes('腹瀉') && (
            <>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>腹瀉次數</h3>
                <ConstipationDaysGrid>
                  {diarrheaFrequencyOptions.map(frequency => (
                    <ConstipationDaysCard
                      key={frequency}
                      selected={diarrheaFrequency === frequency}
                      onClick={() => setDiarrheaFrequency(frequency)}
                    >
                      {frequency}
                    </ConstipationDaysCard>
                  ))}
                </ConstipationDaysGrid>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>腹瀉類型</h3>
                <DiarrheaTypeGrid>
                  {diarrheaTypeOptions.map(type => (
                    <DiarrheaTypeCard
                      key={type}
                      selected={diarrheaType === type}
                      onClick={() => setDiarrheaType(type)}
                    >
                      {type}
                    </DiarrheaTypeCard>
                  ))}
                </DiarrheaTypeGrid>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );

  // 單一主訴摘要
  const renderStep6 = () => {
    const symptomObj = symptoms.find(s => s.id === selectedSymptom);
    return (
      <div>
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>主訴摘要</h2>
        <SummaryCard>
          <SummaryItem>
            <SummaryLabel>主訴：</SummaryLabel>
            <SummaryValue>{symptomObj?.title}</SummaryValue>
          </SummaryItem>
          {selectedSymptom === 'pain' && (
            <>
              <SummaryItem>
                <SummaryLabel>疼痛程度：</SummaryLabel>
                <SummaryValue>
                  {painLevel !== null ? `${painLevel}/10 (${painLevels[painLevel]?.label})` : '未評估'}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>疼痛位置：</SummaryLabel>
                <SummaryValue>{painLocation || '未選擇'}</SummaryValue>
              </SummaryItem>
            </>
          )}
          {selectedSymptom === 'sleep' && (
            <>
              <SummaryItem>
                <SummaryLabel>睡眠時數：</SummaryLabel>
                <SummaryValue>{sleepHours || '未選擇'}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>睡眠問題：</SummaryLabel>
                <SummaryValue>{sleepProblem || '未選擇'}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>疼痛影響睡眠：</SummaryLabel>
                <SummaryValue>
                  {painAffectsSleep === null ? '未選擇' : (painAffectsSleep ? '是' : '否')}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>心理壓力影響睡眠：</SummaryLabel>
                <SummaryValue>
                  {stressAffectsSleep === null ? '未選擇' : (stressAffectsSleep ? '是' : '否')}
                </SummaryValue>
              </SummaryItem>
            </>
          )}
          {selectedSymptom === 'tube' && (
            <>
              <SummaryItem>
                <SummaryLabel>管路類型：</SummaryLabel>
                <SummaryValue>{tubeType || '未選擇'}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>管路疼痛：</SummaryLabel>
                <SummaryValue>
                  {tubePain === null ? '未選擇' : (tubePain ? '是' : '否')}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>想詢問預期移除時間：</SummaryLabel>
                <SummaryValue>{removalTime || '未選擇'}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>功能異常：</SummaryLabel>
                <SummaryValue>
                  {tubeMalfunction === null ? '未選擇' : (tubeMalfunction ? '是' : '否')}
                </SummaryValue>
              </SummaryItem>
            </>
          )}
          {selectedSymptom === 'excretion' && (
            <>
              <SummaryItem>
                <SummaryLabel>排泄問題類型：</SummaryLabel>
                <SummaryValue>{excretionType || '未選擇'}</SummaryValue>
              </SummaryItem>
              {excretionType === '排尿問題' && (
                <SummaryItem>
                  <SummaryLabel>排尿問題：</SummaryLabel>
                  <SummaryValue>
                    {urinationProblems.length > 0 ? urinationProblems.join('、') : '無'}
                  </SummaryValue>
                </SummaryItem>
              )}
              {excretionType === '排便問題' && (
                <>
                  <SummaryItem>
                    <SummaryLabel>排便問題：</SummaryLabel>
                    <SummaryValue>
                      {defecationProblems.length > 0 ? defecationProblems.join('、') : '無'}
                    </SummaryValue>
                  </SummaryItem>
                  {defecationProblems.includes('便秘') && (
                    <>
                      <SummaryItem>
                        <SummaryLabel>便秘天數：</SummaryLabel>
                        <SummaryValue>{constipationDays || '未選擇'}</SummaryValue>
                      </SummaryItem>
                      <SummaryItem>
                        <SummaryLabel>是否腹痛：</SummaryLabel>
                        <SummaryValue>
                          {constipationPain === null ? '未選擇' : (constipationPain ? '是' : '否')}
                        </SummaryValue>
                      </SummaryItem>
                    </>
                  )}
                  {defecationProblems.includes('腹瀉') && (
                    <>
                      <SummaryItem>
                        <SummaryLabel>腹瀉次數：</SummaryLabel>
                        <SummaryValue>{diarrheaFrequency || '未選擇'}</SummaryValue>
                      </SummaryItem>
                      <SummaryItem>
                        <SummaryLabel>腹瀉類型：</SummaryLabel>
                        <SummaryValue>{diarrheaType || '未選擇'}</SummaryValue>
                      </SummaryItem>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </SummaryCard>

      </div>
    );
  };

  // 所有主訴總結
  const renderStep7 = () => (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>您的主訴總結</h2>
      {mainComplaints.length === 0 ? (
        <p>尚未記錄任何主訴。</p>
      ) : (
        <>
          {mainComplaints.map((c, idx) => {
            const symptomObj = symptoms.find(s => s.id === c.type);
            return (
              <SummaryCard key={idx}>
                <SummaryItem>
                  <SummaryLabel>主訴：</SummaryLabel>
                  <SummaryValue>{symptomObj?.title}</SummaryValue>
                </SummaryItem>
                {c.type === 'pain' && (
                  <>
                    <SummaryItem>
                      <SummaryLabel>疼痛程度：</SummaryLabel>
                      <SummaryValue>{c.painLevel !== null ? `${c.painLevel}/10 (${painLevels[c.painLevel]?.label})` : '未評估'}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>疼痛位置：</SummaryLabel>
                      <SummaryValue>{c.painLocation || '未選擇'}</SummaryValue>
                    </SummaryItem>
                  </>
                )}
                {c.type === 'sleep' && (
                  <>
                    <SummaryItem>
                      <SummaryLabel>睡眠時數：</SummaryLabel>
                      <SummaryValue>{c.sleepHours || '未選擇'}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>睡眠問題：</SummaryLabel>
                      <SummaryValue>{c.sleepProblem || '未選擇'}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>疼痛影響睡眠：</SummaryLabel>
                      <SummaryValue>
                        {c.painAffectsSleep === null ? '未選擇' : (c.painAffectsSleep ? '是' : '否')}
                      </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>心理壓力影響睡眠：</SummaryLabel>
                      <SummaryValue>
                        {c.stressAffectsSleep === null ? '未選擇' : (c.stressAffectsSleep ? '是' : '否')}
                      </SummaryValue>
                    </SummaryItem>
                  </>
                )}
                {c.type === 'tube' && (
                  <>
                    <SummaryItem>
                      <SummaryLabel>管路類型：</SummaryLabel>
                      <SummaryValue>{c.tubeType || '未選擇'}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>管路疼痛：</SummaryLabel>
                      <SummaryValue>
                        {c.tubePain === null ? '未選擇' : (c.tubePain ? '是' : '否')}
                      </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>想詢問預期移除時間：</SummaryLabel>
                      <SummaryValue>{c.removalTime || '未選擇'}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryLabel>功能異常：</SummaryLabel>
                      <SummaryValue>
                        {c.tubeMalfunction === null ? '未選擇' : (c.tubeMalfunction ? '是' : '否')}
                      </SummaryValue>
                    </SummaryItem>
                  </>
                )}
                {c.type === 'excretion' && (
                  <>
                    <SummaryItem>
                      <SummaryLabel>排泄問題類型：</SummaryLabel>
                      <SummaryValue>{c.excretionType || '未選擇'}</SummaryValue>
                    </SummaryItem>
                    {c.excretionType === '排尿問題' && (
                      <SummaryItem>
                        <SummaryLabel>排尿問題：</SummaryLabel>
                        <SummaryValue>
                          {c.urinationProblems && c.urinationProblems.length > 0 ? c.urinationProblems.join('、') : '無'}
                        </SummaryValue>
                      </SummaryItem>
                    )}
                    {c.excretionType === '排便問題' && (
                      <>
                        <SummaryItem>
                          <SummaryLabel>排便問題：</SummaryLabel>
                          <SummaryValue>
                            {c.defecationProblems && c.defecationProblems.length > 0 ? c.defecationProblems.join('、') : '無'}
                          </SummaryValue>
                        </SummaryItem>
                        {c.defecationProblems && c.defecationProblems.includes('便秘') && (
                          <>
                            <SummaryItem>
                              <SummaryLabel>便秘天數：</SummaryLabel>
                              <SummaryValue>{c.constipationDays || '未選擇'}</SummaryValue>
                            </SummaryItem>
                            <SummaryItem>
                              <SummaryLabel>是否腹痛：</SummaryLabel>
                              <SummaryValue>
                                {c.constipationPain === null ? '未選擇' : (c.constipationPain ? '是' : '否')}
                              </SummaryValue>
                            </SummaryItem>
                          </>
                        )}
                        {c.defecationProblems && c.defecationProblems.includes('腹瀉') && (
                          <>
                            <SummaryItem>
                              <SummaryLabel>腹瀉次數：</SummaryLabel>
                              <SummaryValue>{c.diarrheaFrequency || '未選擇'}</SummaryValue>
                            </SummaryItem>
                            <SummaryItem>
                              <SummaryLabel>腹瀉類型：</SummaryLabel>
                              <SummaryValue>{c.diarrheaType || '未選擇'}</SummaryValue>
                            </SummaryItem>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </SummaryCard>
            );
          })}
        </>
      )}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button className="primary" onClick={() => { setMainComplaints([]); setCurrentStep(1); }}>重新開始</Button>
      </div>
    </div>
  );

  // 流程控制
  let canNext = false;
  if (currentStep === 1) {
    canNext = !!selectedSymptom;
  } else if (currentStep === 2) {
    canNext = painLevel !== null && !!painLocation;
  } else if (currentStep === 3) {
    canNext = sleepHours !== null && sleepProblem !== null && painAffectsSleep !== null && stressAffectsSleep !== null;
  } else if (currentStep === 4) {
    canNext = tubeType !== null && tubePain !== null && removalTime !== null && tubeMalfunction !== null;
  } else if (currentStep === 5) {
    if (excretionType === '排尿問題') {
      canNext = urinationProblems.length > 0;
    } else if (excretionType === '排便問題') {
      let canProceed = defecationProblems.length > 0;
      if (defecationProblems.includes('便秘')) {
        canProceed = canProceed && constipationDays !== null && constipationPain !== null;
      }
      if (defecationProblems.includes('腹瀉')) {
        canProceed = canProceed && diarrheaFrequency !== null && diarrheaType !== null;
      }
      canNext = canProceed;
    } else {
      canNext = false;
    }
  } else if (currentStep === 6) {
    canNext = true;
  }

  return (
    <AppContainer>
      <Header>
        <Title>口腔外科病人主訴系統</Title>
        <Subtitle>請協助我們了解您的術後狀況</Subtitle>
      </Header>



      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}
      {currentStep === 6 && renderStep6()}
      {currentStep === 7 && renderStep7()}

      {/* 流程按鈕 */}
      {currentStep < 7 && !showAddAnother && (
        <ButtonGroup>
          <Button
            className="secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft size={16} />
            上一步
          </Button>
          <Button
            className="primary"
            onClick={nextStep}
            disabled={!canNext}
          >
            下一步
            <ArrowRight size={16} />
          </Button>
        </ButtonGroup>
      )}

      {/* 完成一個主訴後，詢問是否要再新增 */}
      {showAddAnother && (
        <ButtonGroup>
          <Button className="secondary" onClick={handleFinish}>不再新增主訴</Button>
          <Button className="primary" onClick={handleAddAnother}>再新增一個主訴</Button>
        </ButtonGroup>
      )}
    </AppContainer>
  );
}

export default App; 