// 儿童识字小报生成器 - 核心逻辑

(function() {
  'use strict';

  // DOM 元素
  const sceneSelect = document.getElementById('scene');
  const customSceneInput = document.getElementById('customScene');
  const titleInput = document.getElementById('title');
  const apiKeyInput = document.getElementById('apiKey');
  const generateBtn = document.getElementById('generateBtn');
  const vocabPreview = document.getElementById('vocabPreview');
  const promptPreview = document.getElementById('promptPreview');
  const statusArea = document.getElementById('statusArea');
  const resultArea = document.getElementById('resultArea');
  const errorMessage = document.getElementById('errorMessage');

  // 初始化
  function init() {
    loadSavedApiKey();
    populateSceneOptions();
    bindEvents();
  }

  // 加载保存的 API Key
  function loadSavedApiKey() {
    const savedKey = localStorage.getItem('nanoApiKey');
    if (savedKey) {
      apiKeyInput.value = savedKey;
    }
  }

  // 填充场景选项
  function populateSceneOptions() {
    const scenes = getAllScenes();
    scenes.forEach(scene => {
      const option = document.createElement('option');
      option.value = scene;
      option.textContent = scene;
      sceneSelect.appendChild(option);
    });
  }

  // 绑定事件
  function bindEvents() {
    // 场景选择变化
    sceneSelect.addEventListener('change', handleSceneChange);

    // 输入标题时更新词汇预览
    titleInput.addEventListener('input', handleTitleChange);

    // 生成按钮点击
    generateBtn.addEventListener('click', handleGenerate);
  }

  // 处理场景变化
  function handleSceneChange() {
    const scene = sceneSelect.value;
    customSceneInput.style.display = scene === 'custom' ? 'block' : 'none';

    if (scene !== 'custom') {
      updateVocabPreview(scene);
    } else {
      vocabPreview.classList.remove('show');
    }
  }

  // 处理标题输入变化
  function handleTitleChange() {
    const scene = sceneSelect.value;
    const title = titleInput.value.trim();

    if (scene !== 'custom' && title) {
      updateVocabPreview(scene, title);
    }
  }

  // 更新词汇预览
  function updateVocabPreview(scene, title) {
    const vocab = getVocabByCategory(scene);
    if (!vocab) return;

    const titleText = title || `《请输入标题》`;

    let html = `
      <div class="vocab-section">
        <h4>📖 已选场景: ${scene}</h4>
        <p style="color: var(--text-light); margin-bottom: 10px;">标题: ${titleText}</p>
      </div>
      <div class="vocab-section">
        <h4>👤 核心角色与设施</h4>
        <div class="vocab-tags">
          ${vocab.roles.map(v => `<span class="vocab-tag">${v}</span>`).join('')}
        </div>
      </div>
      <div class="vocab-section">
        <h4>📦 常见物品/工具</h4>
        <div class="vocab-tags">
          ${vocab.items.map(v => `<span class="vocab-tag">${v}</span>`).join('')}
        </div>
      </div>
      <div class="vocab-section">
        <h4>🏠 环境与装饰</h4>
        <div class="vocab-tags">
          ${vocab.environment.map(v => `<span class="vocab-tag">${v}</span>`).join('')}
        </div>
      </div>
    `;

    vocabPreview.innerHTML = html;
    vocabPreview.classList.add('show');
  }

  // 生成处理
  async function handleGenerate() {
    // 获取输入值
    const scene = sceneSelect.value === 'custom' ? customSceneInput.value.trim() : sceneSelect.value;
    const title = titleInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    // 验证输入
    if (!scene) {
      showError('请选择或输入场景');
      return;
    }
    if (!title) {
      showError('请输入标题');
      return;
    }
    if (!apiKey) {
      showError('请输入 API Key');
      return;
    }

    // 保存 API Key
    localStorage.setItem('nanoApiKey', apiKey);

    // 隐藏错误
    hideError();

    // 获取词汇
    let vocab = getVocabByCategory(scene);
    if (!vocab) {
      // 自定义场景使用默认词汇
      vocab = vocabLibrary['超市']; // 临时使用超市的词汇
    }

    // 生成提示词
    const prompt = promptTemplate.generate(scene, title, vocab);

    // 显示提示词预览
    showPromptPreview(prompt);

    // 开始生成
    await startGeneration(apiKey, prompt);
  }

  // 显示提示词预览
  function showPromptPreview(prompt) {
    promptPreview.querySelector('pre').textContent = prompt;
    promptPreview.classList.add('show');
  }

  // 开始生成
  async function startGeneration(apiKey, prompt) {
    // 显示状态区域
    statusArea.classList.add('show');
    resultArea.classList.remove('show');
    generateBtn.disabled = true;

    updateStatus('loading', '正在创建任务...');

    try {
      // 创建任务
      const taskData = await createTask(apiKey, prompt);
      const taskId = taskData.data.taskId;

      updateStatus('loading', `任务已创建，ID: ${taskId.substring(0, 15)}...`);

      // 轮询任务状态
      await pollTaskStatus(apiKey, taskId);

    } catch (error) {
      showError(error.message);
      resetUI();
    }
  }

  // 创建任务
  async function createTask(apiKey, prompt) {
    const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'nano-banana-pro',
        input: {
          prompt: prompt,
          image_input: [],
          aspect_ratio: '4:3', // 竖版 A4 比例接近 4:3
          resolution: '2K',
          output_format: 'png'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || `请求失败 (${response.status})`);
    }

    if (data.code !== 200) {
      throw new Error(data.msg || '创建任务失败');
    }

    return data;
  }

  // 轮询任务状态
  async function pollTaskStatus(apiKey, taskId) {
    const maxAttempts = 60; // 最多轮询60次
    let attempts = 0;

    updateStatus('loading', '等待图像生成中...');

    while (attempts < maxAttempts) {
      await sleep(2000); // 2秒轮询一次

      try {
        const status = await queryTaskStatus(apiKey, taskId);

        if (status.data.state === 'success') {
          // 任务完成
          const resultUrls = JSON.parse(status.data.resultJson).resultUrls;
          if (resultUrls && resultUrls.length > 0) {
            showResult(resultUrls[0]);
            return;
          } else {
            throw new Error('未获取到生成结果');
          }
        } else if (status.data.state === 'fail') {
          throw new Error(status.data.failMsg || '生成失败');
        } else {
          // 继续等待
          attempts++;
          const progress = Math.min(attempts / maxAttempts * 100, 99);
          updateStatus('loading', `生成中... ${progress.toFixed(0)}%`);
        }

      } catch (error) {
        // 如果不是完成状态，继续轮询
        if (error.message.includes('success') || error.message.includes('fail')) {
          throw error;
        }
        attempts++;
      }
    }

    throw new Error('生成超时，请重试');
  }

  // 查询任务状态
  async function queryTaskStatus(apiKey, taskId) {
    const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || `查询失败 (${response.status})`);
    }

    return data;
  }

  // 显示结果
  function showResult(imageUrl) {
    updateStatus('success', '生成完成！');

    const img = resultArea.querySelector('.result-image');
    img.src = imageUrl;

    const downloadBtn = resultArea.querySelector('.download-btn');
    downloadBtn.href = imageUrl;
    downloadBtn.download = `儿童识字小报_${Date.now()}.png`;

    setTimeout(() => {
      resultArea.classList.add('show');
      generateBtn.disabled = false;
    }, 500);
  }

  // 更新状态显示
  function updateStatus(type, message) {
    const statusIcon = statusArea.querySelector('.status-icon');
    const statusText = statusArea.querySelector('.status-text');
    const statusDetail = statusArea.querySelector('.status-detail');

    if (type === 'loading') {
      statusIcon.innerHTML = '<div class="loading-spinner"></div>';
      statusText.textContent = '处理中';
    } else if (type === 'success') {
      statusIcon.textContent = '✅';
      statusText.textContent = '完成';
    }

    statusDetail.textContent = message;
  }

  // 显示错误
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    generateBtn.disabled = false;
  }

  // 隐藏错误
  function hideError() {
    errorMessage.classList.remove('show');
  }

  // 重置 UI
  function resetUI() {
    statusArea.classList.remove('show');
    resultArea.classList.remove('show');
    generateBtn.disabled = false;
  }

  // 辅助函数：睡眠
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 页面加载完成后初始化
  document.addEventListener('DOMContentLoaded', init);

})();