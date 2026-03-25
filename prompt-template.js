// 提示词模板 - 基于 prompt.md 生成

// 核心区域配置
const promptTemplate = {
  // 生成完整的提示词
  generate: function(scene, title, vocabByCategory) {
    const roles = vocabByCategory?.roles || [];
    const items = vocabByCategory?.items || [];
    const environment = vocabByCategory?.environment || [];

    // 核心角色与设施 (3-5个)
    const coreRoles = roles.slice(0, 4).join('，');
    // 常见物品/工具 (5-8个)
    const commonItems = items.slice(0, 7).join('，');
    // 环境与装饰 (3-5个)
    const envItems = environment.slice(0, 5).join('，');

    return `请生成一张儿童识字小报《${scene}》，竖版A4，学习小报版式，适合5-9岁孩子认字与看图识物。

# 一、小报标题区(顶部)
**顶部居中大标题**:《${title}》
**风格**:十字小报/儿童学习报感
**文本要求**:大字、醒目、卡通手写体、彩色描边
**装饰**:周围添加与${scene}相关的贴纸风装饰，颜色鲜艳

# 二、小报主体(中间主画面)

画面中心是一幅 **卡通插画风的「${scene}」场景**:
- **整体气氛**:明亮、温暖、积极
- **构图**:物体边界清晰，方便对应文字，不要过于拥挤。

**场景分区与核心内容**
1. **核心区域A(主要对象)**:表现${scene}的核心活动。
2. **核心区域B(配套设施)**:展示相关的工具或物品。
3. **核心区域C(环境背景)**:体现环境特征(如墙面、指示牌等)。

**主题人物**
- **角色**:1位可爱卡通人物(职业/身份:与${scene}匹配)。
- **动作**:正在进行与场景相关的自然互动。

# 三、必画物体与识字清单(GeneratedContent)

**请务必在画面中清晰绘制以下物体，并为其预留贴标签的位置:**
**1.核心角色与设施:**
${coreRoles}

**2.常见物品/工具:**
${commonItems}

**3.环境与装饰:**
${envItems}

*(注意:画面中的物体数量不限于此，但以上列表必须作为重点描绘对象)*

# 四、识字标注规则
对上述清单中的物体，贴上中文识字标签:
- **格式**:两行制(第一行拼音带声调，第二行简体汉字)。
- **样式**:彩色小贴纸风格，白底黑字或深色字，清晰可读。
- **排版**:标签靠近对应的物体，不遮挡主体。

# 五、画风参数
- **风格**:儿童绘本风+ 识字小报风
- **色彩**:高饱和、明快、温暖(High Saturation，Warm Tone)
- **质量**: 8k resolution, high detail, vector illustration style, clean lines.`;
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { promptTemplate };
}