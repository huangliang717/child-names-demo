// 儿童识字小报场景词汇库
// 每个场景包含：角色、物品、环境三大类，共15-20个词汇

const vocabLibrary = {
  "超市": {
    roles: ["shōuyíngyuán 收银员", "gùkè 顾客", "bǎoguǎnyuán 保管员", "xuésheng 学生"],
    items: ["shuǐguǒ 水果", "shūcài 蔬菜", "niúnǎi 牛奶", "miànbāo 面包", "tuīchē 推车", "lánzi 篮子", "shōujù 收据", "jiàhuò 货架", "jiàqiān 价格签", "shāngpǐn 商品", "shuǐpíng 水瓶", "bīngxiāng 冰箱"],
    environment: ["chūkǒu 出口", "rùkǒu 入口", "dēng 灯", "qiáng 墙", "dìbǎn 地板", "zhǐshìpái 指示牌", "chēwèi 车位"]
  },
  "医院": {
    roles: ["yīshēng 医生", "hùshi 护士", "bìngrén 病人", "bàobào 爸爸", "māmā 妈妈"],
    items: ["tīngzhēnqì 听诊器", "yàoyào 药丸", "zhēnjì 针剂", "chuáng 床", "báizhǐ 白纸", "kǎ 卡", "jiùhùchē 救护车", "kǒuzhao 口罩", "wēndùjì 温度计", "bìnglì 病历", "guàhào 挂号"],
    environment: ["zhěnsuǒ 诊所", "hòuzhàoqū 候诊区", "guàhàochù 挂号处", "fángjiān 房间", "dēng 灯", "qiáng 墙", "mén 门"]
  },
  "公园": {
    roles: ["péngyou 朋友", "bàobào 爸爸", "māmā 妈妈", "lǎoyéye 老爷爷", "nǎinai 奶奶"],
    items: ["qiūqiān 秋千", "huádī 滑梯", "shākēng 沙坑", "chángYǐ 长椅", "huā 花", "cǎo 草", "shù 树", "húdié 蝴蝶", "fēngzheng 风筝", "páiqiú 排球", "shuǐpíng 水瓶"],
    environment: ["cǎodì 草地", "hú 湖", "lù 小路", "dēng 灯", "shù 树", "chángYǐ 长椅", "lùbiāo 路标"]
  },
  "学校": {
    roles: ["lǎoshī 老师", "tóngxué 同学", "xuésheng 学生", "bānzhǎng 班长", "xiàoyou 校友"],
    items: ["kèběn 课本", "bǐ 笔", "zhǐ 纸", "shūbāo 书包", "zhuōzi 桌子", "yǐzi 椅子", "hēibǎn 黑板", "fěnbǐ 粉笔", "kēmù 科目", "túshū 图书", "zuòyè 作业", "xiàngkuàng 相框"],
    environment: ["jiàoshì 教室", "cāochǎng 操场", "zǒuláng 走廊", "dōngxi 东西", "mén 门", "chuāng 窗", "dēng 灯", "qiáng 墙"]
  },
  "餐厅": {
    roles: ["chúshī 厨师", "fúwùyuán 服务员", "gùkè 顾客", "māmā 妈妈", "bàobào 爸爸"],
    items: ["fàn 饭", "cài 菜", "tāng 汤", "kuàizi 筷子", "wǎn 碗", "pán 盘", "bēi 杯", "cānjù 餐具", "càidān 菜单", "zhàngdan 账单", "shuǐguǒ 水果"],
    environment: ["cānzhuō 餐桌", "yǐzi 椅子", "dēng 灯", "qiáng 墙", "kèting 客厅", "chú tái", "mén 门"]
  },
  "图书馆": {
    roles: ["guǎnlǐyuán 管理员", "dúzhě 读者", "xuésheng 学生", "lǎoshī 老师"],
    items: ["shūjí 书籍", "zázhì 杂志", "bào 报纸", "zhuōzi 桌子", "yǐzi 椅子", "dēng 灯", "yǐngbiāo 影标", "zhǎnlǎn 展览", "gèngshū 更书", "suǒ 锁"],
    environment: ["shūjià 书架", "dúshūqū 读书区", "dēng 灯", "qiáng 墙", "dìbǎn 地板", "chuāng 窗", "mén 门"]
  },
  "游乐场": {
    roles: ["péngyou 朋友", "māmā 妈妈", "bàobào 爸爸", "gùlǐyuán 管理员"],
    items: ["guòshānchē 过山车", "xuánzhuǎnmǎ 旋转马", "mótiānlún 摩天轮", "qiú 球", "bèngchuáng 蹦床", "tǎngtǐ 躺体", "qiāng 枪", "bàng 棒", "jīqì 机器"],
    environment: ["cǎodì 草地", "dēng 灯", "qiáng 墙", "lù 小路", "zuòwèi 座位", "rùkǒu 入口"]
  },
  "家中": {
    roles: ["bàobào 爸爸", "māmā 妈妈", "háizi 孩子", "yéye 爷爷", "nǎinai 奶奶"],
    items: ["chuáng 床", "shā 发", "zhuō 桌", "yǐ 椅", "diànshì 电视", "bīngxiāng 冰箱", "kōngtiáo 空调", "dēng 灯", "shū 书", "wánjù 玩具", "yīfu 衣服", "shuǐpíng 水瓶"],
    environment: ["kèting 客厅", "wòshì 卧室", "chúfáng 厨房", "yùshì 浴室", "qiáng 墙", "dìbǎn 地板", "chuāng 窗"]
  },
  "商场": {
    roles: ["shòuhuòyuán 售货员", "gùkè 顾客", "bàobào 爸爸", "māmā 妈妈"],
    items: ["yīfu 衣服", "kùzi 裤子", "xié 鞋", "mào 帽", "dàizi 袋子", "qián 钱", "kǎ 卡", "mófàn 模特", "yòngpǐn 用品"],
    environment: ["huòjià 货架", "cānshāng 餐商", "dēng 灯", "qiáng 墙", "dìbǎn 地板", "lù 通道"]
  },
  "动物园": {
    roles: ["yǎngyuán 饲养员", "yóukè 游客", "māmā 妈妈", "bàobào 爸爸"],
    items: ["shīzi 狮子", "hóuzi 猴子", "dàxiàng 大象", "chánglǐng 长颈鹿", "bānmǎ 斑马", "hǔ 虎", "xióng 熊", "tù 兔", "gǒu 狗", "māo 猫", "niǎo 鸟", "yú 鱼"],
    environment: ["lóng 子", "hú 湖", "shān 山", "shù 树", "cǎo 草", "lù 路", "dēng 灯", "pái 牌"]
  }
};

// 获取场景的完整词汇列表
function getVocabList(scene) {
  const vocab = vocabLibrary[scene];
  if (!vocab) return [];
  return [...vocab.roles, ...vocab.items, ...vocab.environment];
}

// 获取分类词汇
function getVocabByCategory(scene) {
  return vocabLibrary[scene] || null;
}

// 获取所有可用场景
function getAllScenes() {
  return Object.keys(vocabLibrary);
}

// 导出供模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { vocabLibrary, getVocabList, getVocabByCategory, getAllScenes };
}