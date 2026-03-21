import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  User, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Users,
  Award,
  ChevronRight,
  Settings,
  Quote, 
  BarChart3,
  Search,
  PieChart as PieIcon,
  X,
  Navigation,
  Globe,
  Star,
  PenLine,
  ChevronLeft,
  Camera,
  LogOut,
  Bell,
  ShieldCheck,
  CircleHelp,
  Mail,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Sun
} from 'lucide-react';

// --- モックデータ ---
const DAILY_QUOTES = [
  { text: "今日一日、私たちは静穏を求めて歩みます。", source: "12ステップの知恵" },
  { text: "変えられないものを受け入れる平静さを。", source: "ニーバーの祈り" },
  { text: "一度に一つずつ。一歩ずつ（One Day at a Time）", source: "AAの伝統" },
];

const MOCK_SOBRIETY = [
  { id: 1, target: 'アルコール', color: 'blue' },
  { id: 2, target: 'ギャンブル', color: 'indigo' },
];

const MOCK_MEETINGS = [
  { id: 101, name: '渋谷木曜AAグループ', time: '19:00', distance: '150m', type: 'AA', address: '東京都渋谷区...', status: 'upcoming' },
  { id: 102, name: '新宿NAステップ', time: '18:30', distance: '1.2km', type: 'NA', address: '東京都新宿区...', status: 'completed' },
  { id: 103, name: '池袋GA日曜', time: '14:00', distance: '3.5km', type: 'GA', address: '東京都豊島区...', status: 'upcoming' },
];

const MOCK_CALENDAR_DATA = {
  '2024-03-12': { type: 'completed', title: '渋谷AA' },
  '2024-03-15': { type: 'completed', title: 'オンラインNA' },
  '2024-03-20': { type: 'upcoming', title: '新宿ステップ' }, 
  '2024-03-22': { type: 'upcoming', title: '横浜GA' },
};

const MOCK_FEED = [
  { id: 1, user: '匿名A', action: 'ミーティング参加', time: '1時間前', content: '今日はステップ3について分かち合いました。少し心が軽くなった気がします。', likes: 2 },
  { id: 2, user: '仲間B', action: '30日達成', time: '3時間前', content: '静かな一日を過ごせています。仲間の支えに感謝します。', likes: 5 },
  { id: 3, user: 'リカバリーC', action: '日記更新', time: '5時間前', content: '朝の瞑想が習慣になってきました。', likes: 0 },
];

const RECOMMENDED_MEETINGS = [
  { id: 201, name: '港区ナイトAA', type: 'AA', match: '92%', location: '六本木' },
  { id: 202, name: 'オンライン・ステップ学習', type: 'Online', match: '85%', location: 'Zoom' },
  { id: 203, name: '代々木ビギナーズ', type: 'AA', match: '78%', location: '代々木' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(20);
  const [showProfile, setShowProfile] = useState(false);

  // ソーバーカウント状態
  const [soberCounts, setSoberCounts] = useState({
    'アルコール': 156,
    'ギャンブル': 80
  });
  const [lastUpdated, setLastUpdated] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [celebrationTarget, setCelebrationTarget] = useState("");
  
  // リセット用モーダル状態
  const [resetTarget, setResetTarget] = useState(null);

  const handleSoberClick = (target) => {
    const today = new Date().toDateString();
    if (lastUpdated[target] === today) return;

    setSoberCounts(prev => ({ ...prev, [target]: prev[target] + 1 }));
    setLastUpdated(prev => ({ ...prev, [target]: today }));
    
    setCelebrationTarget(target);
    setCelebrationMessage(`おめでとうございます！！\n今日も一日、${target}しない日を過ごせましたね！`);
    setShowCelebration(true);
  };

  const confirmReset = (target) => {
    setResetTarget(target);
  };

  const handleReset = () => {
    if (resetTarget) {
      setSoberCounts(prev => ({ ...prev, [resetTarget]: 0 }));
      setLastUpdated(prev => {
        const newState = { ...prev };
        delete newState[resetTarget];
        return newState;
      });
      setResetTarget(null);
    }
  };

  // タブボタンコンポーネント
  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setShowProfile(false); }}
      className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
        activeTab === id && !showProfile ? 'text-blue-600 scale-110' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <div className={`p-1 rounded-lg ${activeTab === id && !showProfile ? 'bg-blue-50' : ''}`}>
        <Icon size={22} />
      </div>
      <span className="text-[10px] mt-1 font-bold">{label}</span>
    </button>
  );

  // 祝福画面コンポーネント
  const CelebrationScreen = () => (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 animate-in zoom-in duration-500 text-center">
      <div className="mb-8 relative">
        <div className="w-32 h-32 bg-yellow-50 rounded-[48px] flex items-center justify-center text-yellow-500 animate-pulse">
          <Sun size={64} strokeWidth={1.5} />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 animate-bounce">
          <Sparkles size={24} />
        </div>
      </div>
      
      <h2 className="text-2xl font-black text-gray-800 mb-6 leading-relaxed whitespace-pre-wrap tracking-tighter">
        {celebrationMessage}
      </h2>
      
      <div className="flex gap-2 mb-12">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-yellow-400 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button 
          onClick={() => setShowCelebration(false)}
          className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-black shadow-xl shadow-slate-200 active:scale-95 transition-transform"
        >
          明日もしません
        </button>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          One day at a time
        </p>
      </div>
    </div>
  );

  // プロフィール画面コンポーネント
  const ProfileView = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div className="flex flex-col items-center py-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[32px] flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white">
            匿名
          </div>
          <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-gray-100 text-blue-600 hover:scale-110 transition-transform">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-black text-gray-800 tracking-tight">匿名ユーザー</h2>
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1 px-3 py-1 bg-slate-100 rounded-full">ID: 8824-9102</p>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">リカバリー設定</h3>
          <div className="space-y-1">
            {MOCK_SOBRIETY.map(record => (
              <button key={record.id} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-6 rounded-full ${record.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'}`} />
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">{record.target}</p>
                    <p className="text-[10px] text-gray-400 font-medium">目標設定の編集</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
              </button>
            ))}
            <button className="w-full flex items-center gap-3 p-4 text-blue-600 font-bold text-sm hover:bg-blue-50 rounded-2xl transition-colors">
              <Plus size={18} />
              <span>新しい目標を追加</span>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-[32px] p-2 shadow-sm border border-gray-100 overflow-hidden">
          {[
            { icon: Bell, label: '通知設定', color: 'text-orange-500', bg: 'bg-orange-50' },
            { icon: ShieldCheck, label: 'プライバシーとセキュリティ', color: 'text-green-500', bg: 'bg-green-50' },
            { icon: Mail, label: 'お問い合わせ', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: CircleHelp, label: 'ヘルプセンター', color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-bold text-gray-700">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
            </button>
          ))}
        </section>

        <button className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 rounded-[28px] transition-colors">
          <LogOut size={16} />
          <span>ログアウト</span>
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 px-1">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[32px] text-white relative overflow-hidden shadow-xl shadow-blue-100">
        <Quote className="absolute -right-2 -bottom-2 text-white/10 w-24 h-24 rotate-12" />
        <div className="relative z-10">
          <p className="text-base font-medium leading-relaxed italic mb-3 opacity-95">
            「一度に一つずつ。一歩ずつ（One Day at a Time）」
          </p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-white/50"></div>
            <p className="text-[10px] font-bold tracking-widest uppercase opacity-70">
              Recovery Wisdom
            </p>
          </div>
        </div>
      </section>

      {/* ソーバーカウンター */}
      <section>
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">ソーバーカウンター</h2>
        <div className="grid grid-cols-1 gap-3">
          {MOCK_SOBRIETY.map(record => {
            const isTodayDone = lastUpdated[record.target] === new Date().toDateString();
            return (
              <div key={record.id} className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between group transition-all">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">{record.target}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-800">{soberCounts[record.target]}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">days</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => confirmReset(record.target)}
                    className="p-3 bg-slate-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button 
                    onClick={() => handleSoberClick(record.target)}
                    disabled={isTodayDone}
                    className={`px-5 py-3 rounded-2xl font-black text-[11px] transition-all flex items-center gap-2 shadow-sm ${
                      isTodayDone 
                      ? 'bg-green-50 text-green-600 cursor-default' 
                      : 'bg-slate-900 text-white active:scale-95 hover:bg-slate-800'
                    }`}
                  >
                    {isTodayDone ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                    {isTodayDone ? '今日も達成' : 'しませんでした'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 今日の予定 */}
      <section className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            今日の予定
          </h2>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">1件の予定</span>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center justify-between group hover:bg-slate-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black text-xs shadow-sm group-hover:scale-105 transition-transform">AA</div>
            <div>
              <p className="font-bold text-gray-800 text-xs">渋谷木曜グループ</p>
              <p className="text-[10px] text-gray-400 font-medium">19:00〜 / 150m先</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCheckinModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-md shadow-blue-100 active:scale-95 transition-transform"
          >
            チェックイン
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center justify-center gap-1.5 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold text-gray-500 hover:bg-slate-50 transition-colors">
            <Plus size={14} className="text-blue-500" /> <span>手動登録</span>
          </button>
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-bold text-gray-500 hover:bg-slate-50 transition-colors"
          >
            <Search size={14} className="text-blue-500" /> <span>会場検索</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1.5 py-3 bg-blue-50/30 border border-blue-100/50 rounded-2xl text-[10px] font-bold text-blue-600 hover:bg-blue-50 transition-colors">
            <PenLine size={14} /> <span>日記を書く</span>
          </button>
        </div>
      </section>

      {/* アクティビティ */}
      <section className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Calendar size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">アクティビティ</h2>
              <p className="text-[10px] text-gray-400 font-medium">履歴と予定</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1 text-gray-300 hover:text-gray-600"><ChevronLeft size={18} /></button>
            <span className="text-xs font-bold text-gray-700">3月</span>
            <button className="p-1 text-gray-300 hover:text-gray-600"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-6">
          {['月','火','水','木','金','土','日'].map(d => (
            <div key={d} className="text-[10px] text-center font-bold text-gray-300 pb-2">{d}</div>
          ))}
          {[...Array(31)].map((_, i) => {
            const day = i + 1;
            const dateStr = `2024-03-${day.toString().padStart(2, '0')}`;
            const data = MOCK_CALENDAR_DATA[dateStr];
            const isSelected = selectedDate === day;
            
            return (
              <button 
                key={i} 
                onClick={() => setSelectedDate(day)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                  isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110 z-10' : 'hover:bg-slate-50'
                }`}
              >
                <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-gray-500'}`}>{day}</span>
                {data && (
                  <div className={`w-1 h-1 rounded-full mt-0.5 ${
                    data.type === 'completed' ? (isSelected ? 'bg-white' : 'bg-green-500') : (isSelected ? 'bg-blue-200' : 'bg-blue-500')
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        <div className="border-t border-gray-50 pt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">3月 {selectedDate}日の詳細</h3>
            <button className="text-[10px] font-bold text-blue-600 hover:underline">+ 予定を追加</button>
          </div>
          
          {MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`] ? (
            <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl animate-in fade-in slide-in-from-top-1">
              <div className={`w-1.5 h-8 rounded-full ${
                MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`].type === 'completed' ? 'bg-green-400' : 'bg-blue-400'
              }`} />
              <div>
                <p className="text-xs font-bold text-gray-800">
                  {MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`].title} ミーティング
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`].type === 'completed' ? '完了' : '19:00〜'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-50/30 rounded-2xl border border-dashed border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium italic">この日の記録はありません</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans max-w-md mx-auto relative flex flex-col shadow-2xl border-x border-gray-100">
      {/* フルスクリーン祝福画面 */}
      {showCelebration && <CelebrationScreen />}

      <header className="bg-white/80 backdrop-blur-md px-6 pt-12 pb-4 sticky top-0 z-40 border-b border-gray-50">
        <div className="flex justify-between items-center">
          <div>
            {showProfile ? (
              <button onClick={() => setShowProfile(false)} className="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors py-2">
                <ChevronLeft size={20} />
                <span className="text-sm font-black tracking-tight">戻る</span>
              </button>
            ) : (
              <>
                <h1 className="text-2xl font-black text-gray-800 tracking-tighter flex items-center gap-0">
                  <span className="text-blue-600">Rec</span>overly
                </h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[9px] text-gray-400 font-black tracking-widest uppercase">One day at a time</p>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {!showProfile && (
              <button className="p-2.5 text-gray-400 bg-slate-50 rounded-xl hover:text-gray-600 transition-colors">
                <Settings size={18} />
              </button>
            )}
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] shadow-lg border-2 transition-all ${
                showProfile ? 'bg-slate-100 text-slate-500 border-white rotate-90 scale-90' : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-white shadow-blue-50'
              }`}
            >
              {showProfile ? <X size={20} /> : '匿名'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 py-6 pb-28 overflow-y-auto">
        {showProfile ? <ProfileView /> : (
          <>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'feed' && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xl font-black text-gray-800 tracking-tighter">タイムライン</h2>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-full"><Plus size={20} /></button>
                </div>
                {MOCK_FEED.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:border-blue-100 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-[10px] font-bold text-gray-400">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-800">{item.user}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{item.time}</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-blue-50 px-2.5 py-1 rounded-full text-blue-600 font-black uppercase tracking-wider">{item.action}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.content}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors group">
                        <Heart size={18} fill={item.likes > 0 ? "currentColor" : "none"} className={item.likes > 0 ? "text-red-400" : "group-hover:scale-110 transition-transform"} />
                        <span className="text-[11px] font-bold">{item.likes > 0 ? `${item.likes}人が共感` : '共感する'}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageSquare size={16} />
                        <span className="text-[11px] font-bold">コメント</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-in fade-in duration-500 px-1">
                <h2 className="text-xl font-black text-gray-800 tracking-tighter">分析レポート</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">今月の参加数</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-800">12</span>
                      <span className="text-xs text-gray-400 font-bold">回</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">現在の継続</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-gray-800">{soberCounts['アルコール']}</span>
                      <span className="text-xs text-gray-400 font-bold">日</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black text-gray-800">アディクション別比率</h3>
                    <PieIcon size={18} className="text-blue-500" />
                  </div>
                  
                  <div className="flex items-center justify-around gap-8">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#f1f5f9" strokeWidth="3.8"></circle>
                        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#2563eb" strokeWidth="3.8" strokeDasharray="65 100"></circle>
                        <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#4f46e5" strokeWidth="3.8" strokeDasharray="35 100" strokeDashoffset="-65"></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xs font-black text-gray-800">TOTAL</span>
                        <span className="text-[10px] font-bold text-gray-400">Recovery</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <div>
                          <p className="text-[10px] font-black text-gray-800">アルコール</p>
                          <p className="text-[10px] text-gray-400 font-bold">65%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-600" />
                        <div>
                          <p className="text-[10px] font-black text-gray-800">ギャンブル</p>
                          <p className="text-[10px] text-gray-400 font-bold">35%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="animate-in fade-in duration-700 delay-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-orange-400" />
                    <h3 className="text-sm font-black text-gray-800">あなたと似ている人がよく参加しているグループ</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {RECOMMENDED_MEETINGS.map((meeting) => (
                      <button 
                        key={meeting.id}
                        className="w-full bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm group-hover:bg-blue-50 transition-colors">
                            {meeting.type}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-black text-gray-800">{meeting.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                                <MapPin size={10} /> {meeting.location}
                              </span>
                              <span className="text-[9px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                                マッチ度 {meeting.match}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 py-4 text-blue-600 text-[11px] font-black uppercase tracking-widest bg-blue-50/50 rounded-2xl hover:bg-blue-50 transition-colors">
                    他のグループも探す
                  </button>
                </section>
              </div>
            )}
            {activeTab === 'friends' && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 px-10 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center mb-8 shadow-sm border border-gray-100 relative">
                  <Users size={40} className="text-blue-500 opacity-20" />
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-3 tracking-tight">つながりを大切に</h3>
                <p className="text-xs font-medium leading-relaxed mb-8 opacity-70">フレンド機能は現在準備中です。</p>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black shadow-lg">招待コードを発行する</button>
              </div>
            )}
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-50 px-8 pt-4 pb-8 z-50 max-w-md mx-auto rounded-t-[44px] shadow-[0_-15px_50px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center">
          <TabButton id="dashboard" icon={Clock} label="ホーム" />
          <TabButton id="feed" icon={MessageSquare} label="タイムライン" />
          <TabButton id="analytics" icon={BarChart3} label="分析" />
          <TabButton id="friends" icon={Users} label="フレンド" />
        </div>
      </nav>

      {/* 各種モーダル */}
      {isCheckinModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            {!checkinSuccess ? (
              <>
                <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-black mb-2 text-gray-800">会場にチェックイン</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">今日もミーティングへの参加、素晴らしい勇気です。</p>
                
                <div className="bg-blue-50/50 p-5 rounded-[32px] border border-blue-100 mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm shadow-sm">AA</div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">渋谷木曜グループ</p>
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-0.5">Start at 19:00</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  <button onClick={() => setCheckinSuccess(true)} className="w-full bg-blue-600 text-white py-4 rounded-[24px] font-black shadow-xl">チェックインを確定</button>
                  <button onClick={() => setIsCheckinModalOpen(false)} className="w-full py-4 text-gray-400 text-xs font-black tracking-widest uppercase">キャンセル</button>
                </div>

                <div className="border-t border-gray-50 pt-8 pb-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">他の人はこんなグループにも参加しています</h4>
                  <div className="space-y-3">
                    {RECOMMENDED_MEETINGS.slice(0, 2).map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[10px] font-black text-blue-600 shadow-sm">{m.type}</div>
                          <span className="text-xs font-bold text-gray-700">{m.name}</span>
                        </div>
                        <ChevronRight size={14} className="text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10 animate-in zoom-in">
                <div className="w-24 h-24 bg-green-50 rounded-[40px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-gray-800">完了しました！</h3>
                <button onClick={() => { setIsCheckinModalOpen(false); setCheckinSuccess(false); }} className="w-full bg-slate-900 text-white py-4 rounded-[24px] font-black shadow-lg">ホームへ戻る</button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom duration-300 max-w-md mx-auto left-0 right-0 shadow-2xl">
          <header className="px-6 pt-12 pb-4 border-b border-gray-50 flex items-center gap-4">
            <button onClick={() => setIsSearchModalOpen(false)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                autoFocus 
                type="text" 
                placeholder="会場を検索" 
                className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 font-medium text-[16px]" // ズーム防止のため16pxに設定
              />
            </div>
          </header>
          <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
            <div className="space-y-4 mt-6">
              {MOCK_MEETINGS.map(m => (
                <div key={m.id} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm group-hover:bg-blue-50 transition-colors shadow-sm">{m.type}</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm leading-tight">{m.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">{m.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-bold"><Clock size={14} className="text-blue-500" /> {m.time}〜</div>
                    </div>
                    <button onClick={() => { setIsSearchModalOpen(false); setIsCheckinModalOpen(true); }} className="bg-slate-900 text-white px-8 py-2.5 rounded-2xl text-[10px] font-bold shadow-lg active:scale-95">詳細</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* リセット確認モーダル */}
      {resetTarget && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[calc(100%-3rem)] sm:max-w-sm rounded-[40px] p-8 animate-in zoom-in shadow-2xl text-center border border-white">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tighter">
              {resetTarget}ソーバーをリセットしますか？
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 px-2 font-medium">
              この操作は取り消せません。今日までの {soberCounts[resetTarget]} 日間の記録がリセットされます。
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleReset} 
                className="w-full bg-red-500 text-white py-4 rounded-[24px] font-black shadow-xl shadow-red-100 hover:bg-red-600 transition-colors"
              >
                リセットする
              </button>
              <button 
                onClick={() => setResetTarget(null)} 
                className="w-full py-4 text-gray-400 text-xs font-black tracking-widest uppercase hover:bg-slate-50 rounded-[24px]"
              >
                やめる
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .zoom-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input:focus { outline: none; }
      `}</style>
    </div>
  );
}
