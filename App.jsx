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
  Quote
} from 'lucide-react';

// --- Mock Data: Daily Quotes ---
const DAILY_QUOTES = [
  { text: "今日一日、私たちは静穏を求めて歩みます。", source: "12ステップの知恵" },
  { text: "変えられないものを受け入れる平静さを。", source: "ニーバーの祈り" },
  { text: "一度に一つずつ。一歩ずつ（One Day at a Time）", source: "AAの伝統" },
  { text: "私たちは孤独ではありません。仲間がいます。", source: "回復の原則" },
  { text: "今日だけは、怒らず、心配せず、感謝して。", source: "アファメーション" },
  { text: "進歩であり、完璧ではありません。", source: "ステップの歩み" }
];

// --- Mock Data ---
const MOCK_SOBRIETY = [
  { id: 1, target: 'Alcohol', startDate: '2023-10-15', type: 'addiction' },
  { id: 2, target: 'Gambling', startDate: '2024-01-01', type: 'addiction' },
];

const MOCK_MEETINGS = [
  { id: 101, name: '渋谷木曜AAグループ', lat: 35.658, lng: 139.701, time: '19:00' },
  { id: 102, name: '新宿NAステップミーティング', lat: 35.689, lng: 139.700, time: '18:30' },
];

const MOCK_FEED = [
  { id: 1, user: '匿名A', action: 'ミーティングに参加しました', time: '1時間前', content: '今日はステップ3について分かち合いました。', likes: 2 },
  { id: 2, user: '仲間B', action: '30日間の継続を達成', time: '3時間前', content: '静かな一日を過ごせています。', likes: 5 },
];

// --- Utility: Day Counter ---
const calculateDays = (dateStr) => {
  const start = new Date(dateStr);
  const now = new Date();
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sobrietyRecords, setSobrietyRecords] = useState(MOCK_SOBRIETY);
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(DAILY_QUOTES[0]);

  useEffect(() => {
    // 起動時にランダムで言葉を選択（本来は日付に基づくと良い）
    const randomIndex = Math.floor(Math.random() * DAILY_QUOTES.length);
    setDailyQuote(DAILY_QUOTES[randomIndex]);
  }, []);

  // Components
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
      {/* Daily Quote Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 relative overflow-hidden">
        <Quote className="absolute -right-2 -bottom-2 text-blue-100 w-24 h-24 rotate-12" />
        <div className="relative z-10">
          <p className="text-blue-800 text-sm font-medium leading-relaxed italic mb-2">
            「{dailyQuote.text}」
          </p>
          <p className="text-blue-400 text-[10px] font-bold tracking-widest uppercase">
            — {dailyQuote.source}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-3 px-1">ソーバーカウンター</h2>
        <div className="grid grid-cols-1 gap-4">
          {sobrietyRecords.map(record => (
            <div key={record.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{record.target}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-800">{calculateDays(record.startDate)}</span>
                  <span className="text-sm text-gray-500 font-medium">日目</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <Clock className="text-blue-500" size={24} />
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <Plus size={20} />
            <span className="text-sm">新しい記録を追加</span>
          </button>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-lg font-semibold text-gray-700">最近の活動</h2>
          <Award className="text-yellow-500" size={20} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">累計参加回数</p>
              <p className="text-xs text-gray-500">24 回のミーティング</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">現在の継続</p>
              <p className="text-xs text-gray-500">12 日間連続参加中</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const CheckinModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom duration-300">
        {!checkinSuccess ? (
          <>
            <h3 className="text-xl font-bold mb-2">会場にチェックイン</h3>
            <p className="text-sm text-gray-500 mb-6">半径200m以内の会場を表示しています。</p>
            
            <div className="space-y-3 mb-8">
              {MOCK_MEETINGS.map(m => (
                <button 
                  key={m.id}
                  onClick={() => setCheckinSuccess(true)}
                  className="w-full flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.time} 開始予定</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsCheckinModalOpen(false)}
              className="w-full py-3 text-gray-500 text-sm font-medium"
            >
              キャンセル
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">チェックイン完了</h3>
            <p className="text-sm text-gray-500 mb-6">今日の分かち合いを記録しましょう。</p>
            <button 
              onClick={() => {
                setIsCheckinModalOpen(false);
                setCheckinSuccess(false);
                setActiveTab('history');
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200"
            >
              記録を書く
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const Feed = () => (
    <div className="space-y-4 animate-in fade-in duration-500">
      {MOCK_FEED.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-sm font-bold text-gray-800">{item.user}</span>
              <span className="text-xs text-gray-500 ml-2">{item.time}</span>
            </div>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">{item.action}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{item.content}</p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors">
              <Heart size={16} fill={item.likes > 0 ? "currentColor" : "none"} className={item.likes > 0 ? "text-red-400" : ""} />
              <span className="text-xs">{item.likes > 0 ? '共感あり' : '共感'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const History = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">ミーティング記録</h2>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {[...Array(31)].map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-lg flex items-center justify-center text-[10px] ${
                [2, 5, 8, 12, 15, 19, 22].includes(i) 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-50 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">最近の記録</h3>
        <div className="border-l-2 border-blue-100 ml-2 pl-4 space-y-6">
          <div className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></div>
            <p className="text-xs text-gray-400 mb-1">2024年3月14日</p>
            <p className="text-sm font-medium">渋谷木曜グループ (テーマミーティング)</p>
            <p className="text-sm text-gray-600 mt-1">正直さについて考える機会になった。</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-300 rounded-full border-2 border-white"></div>
            <p className="text-xs text-gray-400 mb-1">2024年3月12日</p>
            <p className="text-sm font-medium">新宿NAステップ (ステップ2)</p>
            <p className="text-sm text-gray-600 mt-1">仲間の話に助けられた。</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans max-w-md mx-auto relative flex flex-col shadow-xl">
      {/* Header */}
      <header className="bg-white px-6 pt-8 pb-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">リカバリー・ログ</h1>
            <p className="text-xs text-gray-400 font-medium">One Day at a Time</p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600"><Settings size={20} /></button>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">匿名</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 pb-24 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'history' && <History />}
        {activeTab === 'friends' && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Users size={48} className="mb-4 opacity-20" />
            <p className="text-sm">フレンド機能は近日公開予定です</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsCheckinModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-20"
      >
        <MapPin size={24} />
      </button>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-2 z-30 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <TabButton id="dashboard" icon={Clock} label="ホーム" />
          <TabButton id="feed" icon={MessageSquare} label="フィード" />
          <TabButton id="history" icon={Calendar} label="履歴" />
          <TabButton id="friends" icon={Users} label="フレンド" />
        </div>
      </nav>

      {/* Modals */}
      {isCheckinModalOpen && <CheckinModal />}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
