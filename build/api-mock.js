// API模擬 - 用於測試AI功能
// 在實際部署時，這應該替換為真實的AI API端點

// 模擬AI問題生成
const mockAiQuestions = {
  pain: [
    {
      id: 'hasPain',
      title: '您是否感到疼痛？',
      type: 'choice',
      options: ['是', '否']
    },
    {
      id: 'location',
      title: '疼痛部位在哪裡？',
      type: 'choice',
      options: ['口腔', '咽喉', '頸部', '傷口', '胸部', '腹部', '其他']
    },
    {
      id: 'intensity',
      title: '疼痛程度（1-10分）',
      type: 'slider',
      min: 1,
      max: 10
    },
    {
      id: 'nature',
      title: '疼痛性質如何？',
      type: 'choice',
      options: ['鈍痛', '刺痛', '灼熱', '抽痛', '其他']
    }
  ],
  sleep: [
    {
      id: 'sleepProblemType',
      title: '您的睡眠問題類型？',
      type: 'choice',
      options: ['入睡困難', '容易醒來', '睡眠品質差', '其他']
    },
    {
      id: 'sleepHours',
      title: '平均每晚睡眠時數？',
      type: 'choice',
      options: ['少於4小時', '4-6小時', '6-8小時', '8小時以上']
    },
    {
      id: 'hasPainDuringSleep',
      title: '睡眠時是否感到疼痛？',
      type: 'choice',
      options: ['是', '否']
    }
  ],
  tube: [
    {
      id: 'tubeType',
      title: '您目前有哪些管路？',
      type: 'choice',
      options: ['氣切管', '鼻胃管', '尿管', '引流管', '其他']
    },
    {
      id: 'abnormalCondition',
      title: '管路是否有異常情形？',
      type: 'choice',
      options: ['滲血', '分泌物變多', '管子鬆動', '疼痛', '無異常']
    },
    {
      id: 'colorChange',
      title: '管路周圍或分泌物顏色變化？',
      type: 'choice',
      options: ['正常', '發黃', '發綠', '發紅']
    }
  ],
  excretion: [
    {
      id: 'problemType',
      title: '您的排泄問題類型？',
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
      id: 'hasAbnormalOdor',
      title: '是否有異味或異色？',
      type: 'choice',
      options: ['是', '否']
    }
  ]
};

// 模擬API響應
function mockApiResponse(symptomId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        questions: mockAiQuestions[symptomId] || []
      });
    }, 1500); // 模擬1.5秒的API延遲
  });
}

// 導出模擬函數
window.mockApiResponse = mockApiResponse; 