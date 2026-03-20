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
  PenLine
} from 'lucide-react';

// --- Mock Data: Daily Quotes ---
const DAILY_QUOTES = [
  { text: "今日一日、私たちは静穏を求めて歩みます。", source: "12ステップの知恵" },
  { text: "変えられないものを受け入れる平静さを。", source: "ニーバーの祈り" },
  { text: "一度に一つずつ。一歩ずつ（One Day at a Time）", source: "AAの伝統" },
  { text: "進歩であり、完璧ではありません。", source: "ステップの歩み" }
];

// --- Mock Data ---
const MOCK_SOBRIETY = [
  { id: 1, target: 'アルコール', startDate: '2023-10-15', type: 'addiction', count: 42 },
  { id: 2, target: 'ギャンブル', startDate: '2024-01-01', type: 'addiction', count: 18 },
];

const MOCK_MEETINGS = [
  { id: 101, name: '渋谷木曜AAグループ', time: '19:00', distance: '150m', type: 'AA', address: '東京都渋谷区...' },
  { id: 102, name: '新宿NAステップ', time: '18:30', distance: '1.2km', type: 'NA', address: '東京都新宿区...' },
  { id: 103, name: '池袋GA日曜', time: '14:00', distance: '3.5km', type: 'GA', address: '東京都豊島区...' },
];

const MOCK_FEED = [
  { id: 1, user: '匿名A', action: 'ミーティングに参加しました', time: '1時間前', content: '今日はステップ3について分かち合いました。', likes: 2 },
  { id: 2, user: '仲間B', action: '30日間の継続を達成', time: '3時間前', content: '静かな一日を過ごせています。', likes: 5 },
];

const calculateDays = (dateStr) => {
  const start = new Date(dateStr);
  const now = new Date();
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(DAILY_QUOTES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
    setDailyQuote(DAILY_QUOTES[randomIndex]);
  }, []);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${
        activeTab === id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <Icon size={20} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Daily Quote Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-3xl border border-blue-100 relative overflow-hidden">
        <Quote className="absolute -right-2 -bottom-2 text-blue-100/50 w-24 h-24 rotate-12" />
        <div className="relative z-10">
          <p className="text-blue-800 text-sm font-medium leading-relaxed italic mb-2">
            「{dailyQuote.text}」
          </p>
          <p className="text-blue-400 text-[10px] font-bold tracking-widest uppercase">
            — {dailyQuote.source}
          </p>
        </div>
      </section>

      {/* 2. Quick Check-in/Today's Meeting */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" />
            今日のミーティング
          </h2>
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-lg"
          >
            他を探す
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-100">AA</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{MOCK_MEETINGS[0].name}</p>
                <p className="text-[11px] text-gray-400">本日 {MOCK_MEETINGS[0].time}〜 / 約{MOCK_MEETINGS[0].distance}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCheckinModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
            >
              チェックイン
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center gap-1 py-2 bg-gray-50 rounded-xl text-[10px] font-medium text-gray-500 hover:bg-gray-100">
              <Plus size={14} /> <span>手動登録</span>
            </button>
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="flex flex-col items-center justify-center gap-1 py-2 bg-gray-50 rounded-xl text-[10px] font-medium text-gray-500 hover:bg-gray-100"
            >
              <Search size={14} /> <span>会場検索</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 py-2 bg-blue-50/50 rounded-xl text-[10px] font-bold text-blue-600 hover:bg-blue-50">
              <PenLine size={14} /> <span>日記を書く</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Sobriety Counters */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">ソーバーカウンター</h2>
        <div className="grid grid-cols-1 gap-3">
          {MOCK_SOBRIETY.map(record => (
            <div key={record.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{record.target}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800 tracking-tight">{calculateDays(record.startDate)}</span>
                    <span className="text-xs text-gray-500 font-medium">days</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-gray-800 px-1">分析レポート</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">今月の参加数</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">12</span>
            <span className="text-xs text-gray-500">回</span>
          </div>
          <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[60%]"></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">最長継続</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">156</span>
            <span className="text-xs text-gray-500">日</span>
          </div>
          <div className="mt-2 text-[10px] text-green-500 font-bold flex items-center gap-1">
            <Award size={10} /> 記録更新中
          </div>
        </div>
      </div>

      {/* Addiction Distribution (Visual Mockup) */}
      <section className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <PieIcon size={16} className="text-indigo-500" />
          アディクション別比率
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="4" strokeDasharray="70 100" />
              <circle cx="18" cy="18" r="16" fill="none" className="text-indigo-400" stroke="currentColor" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-70" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xs font-bold text-gray-800">TOTAL</span>
              <span className="text-[10px] text-gray-400 font-bold">60</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> アルコール</span>
              <span className="font-bold">42回</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-400"></div> ギャンブル</span>
              <span className="font-bold">18回</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
            アクティビティ
          </h3>
          <span className="text-[10px] text-gray-400 font-bold">2024年3月</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['月','火','水','木','金','土','日'].map(d => (
            <div key={d} className="text-[10px] text-center font-bold text-gray-300 py-1">{d}</div>
          ))}
          {[...Array(31)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${
                [2, 5, 8, 12, 15, 19, 22].includes(i) 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'bg-slate-50 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // --- Meeting Search Modal ---
  const SearchModal = () => (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom duration-300">
      <header className="px-6 pt-10 pb-4 border-b border-gray-50 flex items-center gap-4">
        <button 
          onClick={() => setIsSearchModalOpen(false)}
          className="p-2 -ml-2 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="会場名、駅名、地域で検索"
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold whitespace-nowrap shadow-md shadow-blue-100">
            <Navigation size={14} /> 現在地付近
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-gray-500 rounded-full text-xs font-bold whitespace-nowrap border border-gray-100">
            <Globe size={14} /> オンライン
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-gray-500 rounded-full text-xs font-bold whitespace-nowrap border border-gray-100">
            <Star size={14} /> お気に入り
          </button>
        </div>

        {/* Search Results */}
        <div className="space-y-4 mt-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">近くの会場</h3>
          {MOCK_MEETINGS.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:border-blue-100 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 font-black text-xs group-hover:bg-blue-50 transition-colors">{m.type}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{m.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{m.address}</p>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <Star size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                    <Clock size={12} className="text-blue-400" /> {m.time}〜
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                    <Navigation size={12} className="text-blue-400" /> {m.distance}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsSearchModalOpen(false);
                    setIsCheckinModalOpen(true);
                  }}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-blue-600 transition-colors"
                >
                  チェックイン
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CheckinModal = () => (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl relative">
        {!checkinSuccess ? (
          <>
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-black mb-2 text-gray-800">会場にチェックイン</h3>
            <p className="text-sm text-gray-400 mb-6">現在地から最も近い会場です。</p>
            
            <div className="space-y-3 mb-8">
              {MOCK_MEETINGS.slice(0, 2).map(m => (
                <button 
                  key={m.id}
                  onClick={() => setCheckinSuccess(true)}
                  className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-3xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group"
                >
                  <div className="text-left flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 font-bold text-xs shadow-sm">{m.type}</div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{m.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{m.time} 開始予定</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsCheckinModalOpen(false)}
              className="w-full py-4 text-gray-400 text-sm font-bold uppercase tracking-widest"
            >
              今は閉じる
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-50 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-gray-800">お疲れ様でした</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed px-4">今日も一歩、回復への道を進みましたね。<br/>今の気持ちを言葉にしてみませんか？</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setIsCheckinModalOpen(false);
                  setCheckinSuccess(false);
                  setActiveTab('analytics');
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-all"
              >
                日記を書く
              </button>
              <button 
                onClick={() => {
                  setIsCheckinModalOpen(false);
                  setCheckinSuccess(false);
                }}
                className="w-full py-4 text-gray-400 text-sm font-bold"
              >
                あとで記録する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans max-w-md mx-auto relative flex flex-col shadow-2xl">
      {/* Header */}
      <header className="bg-white px-6 pt-10 pb-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Recovery Log</h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase opacity-70">Support your peaceful journey</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 text-gray-400 bg-slate-50 rounded-xl hover:text-gray-600 transition-colors"><Settings size={18} /></button>
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">匿名</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 pb-28 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'feed' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-gray-800 px-1">タイムライン</h2>
            {MOCK_FEED.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-400">匿名</div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{item.user}</p>
                      <p className="text-[10px] text-gray-400">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-blue-50 px-2 py-1 rounded-full text-blue-500 font-bold uppercase tracking-wider">{item.action}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.content}</p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-3">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors">
                    <Heart size={16} fill={item.likes > 0 ? "currentColor" : "none"} className={item.likes > 0 ? "text-red-400" : ""} />
                    <span className="text-[11px] font-bold">{item.likes > 0 ? '共感あり' : '共感する'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'friends' && (
          <div className="flex flex-col items-center justify-center h-80 text-gray-400 px-10 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-[30px] flex items-center justify-center mb-6">
              <Users size={40} className="opacity-20" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">つながりを大切に</h3>
            <p className="text-xs font-medium leading-relaxed">フレンド機能は準備中です。回復を支え合う仲間を見つけましょう。</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      {(activeTab === 'dashboard' || activeTab === 'analytics') && (
        <button 
          onClick={() => setIsCheckinModalOpen(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-blue-600 text-white rounded-[24px] shadow-2xl shadow-blue-200 flex items-center justify-center hover:scale-105 hover:rotate-6 active:scale-95 transition-all z-20 group"
        >
          <MapPin size={28} className="group-hover:animate-bounce" />
        </button>
      )}

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-8 py-3 z-30 max-w-md mx-auto rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-end">
          <TabButton id="dashboard" icon={Clock} label="ホーム" />
          <TabButton id="feed" icon={MessageSquare} label="タイムライン" />
          <TabButton id="analytics" icon={BarChart3} label="分析" />
          <TabButton id="friends" icon={Users} label="フレンド" />
        </div>
      </nav>

      {/* Modals */}
      {isCheckinModalOpen && <CheckinModal />}
      {isSearchModalOpen && <SearchModal />}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
