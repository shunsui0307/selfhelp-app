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
  ChevronLeft
} from 'lucide-react';

// --- Mock Data ---
const DAILY_QUOTES = [
  { text: "今日一日、私たちは静穏を求めて歩みます。", source: "12ステップの知恵" },
  { text: "変えられないものを受け入れる平静さを。", source: "ニーバーの祈り" },
  { text: "一度に一つずつ。一歩ずつ（One Day at a Time）", source: "AAの伝統" },
];

const MOCK_SOBRIETY = [
  { id: 1, target: 'アルコール', startDate: '2023-10-15' },
  { id: 2, target: 'ギャンブル', startDate: '2024-01-01' },
];

const MOCK_MEETINGS = [
  { id: 101, name: '渋谷木曜AAグループ', time: '19:00', distance: '150m', type: 'AA', address: '東京都渋谷区...', status: 'upcoming' },
  { id: 102, name: '新宿NAステップ', time: '18:30', distance: '1.2km', type: 'NA', address: '東京都新宿区...', status: 'completed' },
  { id: 103, name: '池袋GA日曜', time: '14:00', distance: '3.5km', type: 'GA', address: '東京都豊島区...', status: 'upcoming' },
];

// カレンダー用モックデータ (履歴と予定)
const MOCK_CALENDAR_DATA = {
  '2024-03-12': { type: 'completed', title: '渋谷AA' },
  '2024-03-15': { type: 'completed', title: 'オンラインNA' },
  '2024-03-20': { type: 'upcoming', title: '新宿ステップ' }, // 今日
  '2024-03-22': { type: 'upcoming', title: '横浜GA' },
};

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
  const [selectedDate, setSelectedDate] = useState(20); // 3月20日を選択状態

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
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* 1. Daily Quote */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[32px] text-white relative overflow-hidden shadow-xl shadow-blue-100">
        <Quote className="absolute -right-2 -bottom-2 text-white/10 w-24 h-24 rotate-12" />
        <div className="relative z-10">
          <p className="text-sm font-medium leading-relaxed italic mb-3 opacity-90">
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

      {/* 2. Today's Meeting & Action Box */}
      <section className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <MapPin size={16} className="text-blue-500" />
            今日の予定
          </h2>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">1件の予定</span>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black text-xs shadow-sm">AA</div>
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

      {/* 3. Sobriety Counters */}
      <section className="px-1">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">ソーバーカウンター</h2>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_SOBRIETY.map(record => (
            <div key={record.id} className="bg-white p-4 rounded-[28px] shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-50/50 rounded-bl-[28px] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <ChevronRight size={14} />
              </div>
              <p className="text-[10px] font-bold text-gray-400 mb-1">{record.target}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-800">{calculateDays(record.startDate)}</span>
                <span className="text-[10px] font-bold text-gray-500">days</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Activity Calendar (Integrated History & Future) */}
      <section className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Calendar size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">アクティビティ</h2>
              <p className="text-[10px] text-gray-400 font-medium">履歴と予定の確認</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1 text-gray-300 hover:text-gray-600"><ChevronLeft size={18} /></button>
            <span className="text-xs font-bold text-gray-700">3月</span>
            <button className="p-1 text-gray-300 hover:text-gray-600"><ChevronRight size={18} /></button>
          </div>
        </div>

        {/* Calendar Grid */}
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
                  isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105 z-10' : 'hover:bg-slate-50'
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

        {/* Detail View for Selected Date */}
        <div className="border-t border-gray-50 pt-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">3月 {selectedDate}日の詳細</h3>
            <button className="text-[10px] font-bold text-blue-600">+ 予定を追加</button>
          </div>
          
          {MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`] ? (
            <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl">
              <div className={`w-2 h-10 rounded-full ${
                MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`].type === 'completed' ? 'bg-green-400' : 'bg-blue-400'
              }`} />
              <div>
                <p className="text-xs font-bold text-gray-800">
                  {MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`].title} ミーティング
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {MOCK_CALENDAR_DATA[`2024-03-${selectedDate.toString().padStart(2, '0')}`].type === 'completed' ? '実績: 参加済み' : '予定: 19:00〜'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-slate-50/30 rounded-2xl border border-dashed border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">記録や予定はありません</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-gray-800 px-1">分析レポート</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">今月の参加数</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-800">12</span>
            <span className="text-xs text-gray-500 font-bold">回</span>
          </div>
          <div className="mt-3 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[60%]"></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">最長継続</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-800">156</span>
            <span className="text-xs text-gray-500 font-bold">日</span>
          </div>
          <div className="mt-3 text-[10px] text-green-500 font-bold flex items-center gap-1">
            <Award size={10} /> 記録更新中
          </div>
        </div>
      </div>

      <section className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700 mb-6 flex items-center gap-2">
          <PieIcon size={16} className="text-indigo-500" />
          アディクション別比率
        </h3>
        <div className="flex items-center gap-8">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="text-blue-500" stroke="currentColor" strokeWidth="5" strokeDasharray="70 100" strokeLinecap="round" />
              <circle cx="18" cy="18" r="16" fill="none" className="text-indigo-300" stroke="currentColor" strokeWidth="5" strokeDasharray="30 100" strokeDashoffset="-70" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[10px] font-black text-gray-800">TOTAL</span>
              <span className="text-[12px] text-blue-600 font-black">60</span>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs font-bold text-gray-600">アルコール</span>
              </div>
              <span className="text-xs font-black text-gray-800">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                <span className="text-xs font-bold text-gray-600">ギャンブル</span>
              </div>
              <span className="text-xs font-black text-gray-800">30%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const SearchModal = () => (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom duration-300">
      <header className="px-6 pt-12 pb-4 border-b border-gray-50 flex items-center gap-4">
        <button onClick={() => setIsSearchModalOpen(false)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="会場名、駅名、地域で検索"
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {['現在地付近', 'オンライン', 'お気に入り', 'AA', 'NA', 'GA'].map((cat, i) => (
            <button key={cat} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${
              i === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' : 'bg-white text-gray-500 border-gray-100'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-1">近くの会場 (3件)</h3>
          {MOCK_MEETINGS.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm group-hover:bg-blue-50 transition-colors">{m.type}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{m.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium">{m.address}</p>
                  </div>
                </div>
                <button className="text-gray-200 hover:text-yellow-400"><Star size={20} /></button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-bold">
                    <Clock size={14} className="text-blue-500" /> {m.time}〜
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-bold">
                    <Navigation size={14} className="text-blue-500" /> {m.distance}
                  </div>
                </div>
                <button 
                  onClick={() => { setIsSearchModalOpen(false); setIsCheckinModalOpen(true); }}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[10px] font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
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
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">今日もミーティングへの参加、素晴らしい勇気です。現在の場所にチェックインしますか？</p>
            
            <div className="bg-blue-50/50 p-5 rounded-[32px] border border-blue-100 mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm shadow-sm">AA</div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{MOCK_MEETINGS[0].name}</p>
                <p className="text-xs text-blue-400 font-bold">19:00 開始</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button onClick={() => setCheckinSuccess(true)} className="w-full bg-blue-600 text-white py-4 rounded-[20px] font-black shadow-xl shadow-blue-100 active:scale-95 transition-all">
                チェックインを確定
              </button>
              <button onClick={() => setIsCheckinModalOpen(false)} className="w-full py-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                キャンセル
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-50 rounded-[30px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-gray-800">完了しました</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed px-4">記録はカレンダーに保存されました。一歩ずつ、進んでいきましょう。</p>
            <button 
              onClick={() => { setIsCheckinModalOpen(false); setCheckinSuccess(false); }}
              className="w-full bg-slate-900 text-white py-4 rounded-[20px] font-black"
            >
              ホームへ戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans max-w-md mx-auto relative flex flex-col shadow-2xl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-6 pt-12 pb-4 sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tighter">Recoverly</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[9px] text-gray-400 font-black tracking-widest uppercase">One day at a time</p>
            </div>
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
              <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] font-bold text-gray-400">匿名</div>
                    <div>
                      <p className="text-xs font-black text-gray-800">{item.user}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-blue-50 px-2 py-1 rounded-full text-blue-600 font-black uppercase tracking-wider">{item.action}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.content}</p>
                <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Heart size={18} fill={item.likes > 0 ? "currentColor" : "none"} className={item.likes > 0 ? "text-red-400" : ""} />
                  <span className="text-[11px] font-black">{item.likes > 0 ? `${item.likes}人が共感` : '共感する'}</span>
                </button>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'friends' && (
          <div className="flex flex-col items-center justify-center h-80 text-gray-400 px-10 text-center">
            <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Users size={40} className="text-blue-500 opacity-20" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">つながりを大切に</h3>
            <p className="text-xs font-medium leading-relaxed">フレンド機能は準備中です。回復を支え合う仲間を見つけましょう。</p>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-8 py-4 z-50 max-w-md mx-auto rounded-t-[40px] shadow-[0_-15px_50px_rgba(0,0,0,0.06)]">
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
        input:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}

const MOCK_FEED = [
  { id: 1, user: '匿名A', action: 'ミーティング参加', time: '1時間前', content: '今日はステップ3について分かち合いました。少し心が軽くなった気がします。', likes: 2 },
  { id: 2, user: '仲間B', action: '30日達成', time: '3時間前', content: '静かな一日を過ごせています。仲間の支えに感謝します。', likes: 5 },
];
