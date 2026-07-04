'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layout,
  Database,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  Mail,
  Copy,
  Users,
  Smartphone,
  MousePointer,
  Check,
  RotateCcw,
  Trash2,
  Download,
  Activity,
  ChevronRight,
  ShieldCheck,
  Globe,
  Settings,
  HelpCircle,
  TrendingUp,
  Inbox
} from 'lucide-react';

// Interfaces
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  niche: string;
  value: number;
  stage: 'new' | 'contacted' | 'negotiation' | 'won';
  createdAt: string;
}

interface WaitlistUser {
  email: string;
  interest: string;
  joinedAt: string;
  queueNum: number;
  referrals: number;
}

// Niche Template Configurations (Tailored with Bright/Soft Colors for Light Theme)
const templates = {
  cosmetics: {
    id: 'cosmetics',
    label: 'Mỹ Phẩm Thuần Chay',
    primaryColor: 'from-emerald-500 to-teal-600',
    primaryBg: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-100',
    productName: 'GlowHerbal Serum',
    headline: 'Đánh Thức Vẻ Đẹp Tự Nhiên Của Làn Da Bạn',
    subtitle: 'Tinh chất thảo mộc hữu cơ phục hồi tế bào da, mờ thâm nám và sáng hồng tự nhiên sau 14 ngày.',
    buttonText: 'Nhận Ưu Đãi Giảm 35%',
    accentColor: 'emerald',
    value: 450000
  },
  coding: {
    id: 'coding',
    label: 'Khóa Học Lập Trình',
    primaryColor: 'from-blue-500 to-indigo-600',
    primaryBg: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    productName: 'Bootcamp Full-stack Dev',
    headline: 'Làm Chủ Kỹ Năng Lập Trình Thực Chiến',
    subtitle: 'Đào tạo thực tế từ số 0 đến khi có việc làm tốt. Cam kết hỗ trợ giới thiệu việc làm sau 6 tháng.',
    buttonText: 'Tải Lộ Trình Học Miễn Phí',
    accentColor: 'blue',
    value: 12000000
  },
  realestate: {
    id: 'realestate',
    label: 'Căn Hộ Cao Cấp',
    primaryColor: 'from-amber-500 to-orange-600',
    primaryBg: 'bg-amber-500',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-100',
    productName: 'Vinhomes Grand Sky',
    headline: 'Sở Hữu Không Gian Sống Thượng Lưu Mơ Ước',
    subtitle: 'Căn hộ view sông đẳng cấp 5 sao giữa lòng thành phố. Thanh toán giãn lãi suất 0% trong 2 năm.',
    buttonText: 'Đăng Ký Nhận Bảng Giá',
    accentColor: 'amber',
    value: 2800000000
  },
  saas: {
    id: 'saas',
    label: 'Phần Mềm Quản Lý',
    primaryColor: 'from-sky-500 to-blue-600',
    primaryBg: 'bg-sky-500',
    textColor: 'text-sky-600',
    borderColor: 'border-sky-100',
    productName: 'TaskFlow Workspace',
    headline: 'X3 Hiệu Suất Đội Ngũ Bằng Quản Trị Tự Động',
    subtitle: 'Hệ thống hóa quy trình, tự động giao việc thông minh và giám sát tiến độ thời gian thực.',
    buttonText: 'Trải Nghiệm 14 Ngày Miễn Phí',
    accentColor: 'sky',
    value: 1500000
  }
};

export default function Home() {
  // Waitlist State
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistInterest, setWaitlistInterest] = useState('both');
  const [registeredUser, setRegisteredUser] = useState<WaitlistUser | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState(382);
  const [waitlistList, setWaitlistList] = useState<WaitlistUser[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  // Playground Config State
  const [activeNiche, setActiveNiche] = useState<keyof typeof templates>('saas');
  const [customHeadline, setCustomHeadline] = useState('');

  // Interactive Lead Submission inside playground
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newLeadNotification, setNewLeadNotification] = useState<string | null>(null);

  // CRM Playground State (Pre-seeded leads)
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'lead-1',
      name: 'Nguyễn Văn Minh',
      email: 'minh.nguyen@gmail.com',
      phone: '0912345678',
      source: 'Landing Page',
      niche: 'cosmetics',
      value: 450000,
      stage: 'new',
      createdAt: '10 phút trước'
    },
    {
      id: 'lead-2',
      name: 'Trần Thị Thảo',
      email: 'thaotran@yahoo.com',
      phone: '0987654321',
      source: 'Landing Page',
      niche: 'coding',
      value: 12000000,
      stage: 'contacted',
      createdAt: '1 giờ trước'
    },
    {
      id: 'lead-3',
      name: 'Phạm Thành Long',
      email: 'longpt@saascorp.vn',
      phone: '0905556677',
      source: 'Landing Page',
      niche: 'saas',
      value: 1500000,
      stage: 'negotiation',
      createdAt: '3 giờ trước'
    },
    {
      id: 'lead-4',
      name: 'Lê Hoàng Yến',
      email: 'yenlh.bds@gmail.com',
      phone: '0933445566',
      source: 'Landing Page',
      niche: 'realestate',
      value: 2800000000,
      stage: 'won',
      createdAt: 'Hôm qua'
    }
  ]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('affbio_waitlist_user');
    const savedCount = localStorage.getItem('affbio_waitlist_count');
    const savedList = localStorage.getItem('affbio_waitlist_all');

    setTimeout(() => {
      if (savedUser) {
        setRegisteredUser(JSON.parse(savedUser));
      }
      if (savedCount) {
        setTotalSubscribers(parseInt(savedCount, 10));
      } else {
        const organicStart = 1428;
        setTotalSubscribers(organicStart);
        localStorage.setItem('affbio_waitlist_count', organicStart.toString());
      }
      if (savedList) {
        setWaitlistList(JSON.parse(savedList));
      } else {
        const initialList = [
          { email: 'hoang.ha@marketing.vn', interest: 'both', joinedAt: '03/07/2026', queueNum: 1425, referrals: 3 },
          { email: 'lananh.nguyen@gmail.com', interest: 'pagebuilder', joinedAt: '03/07/2026', queueNum: 1426, referrals: 1 },
          { email: 'duypham.sales@bds.com', interest: 'crm', joinedAt: '03/07/2026', queueNum: 1427, referrals: 6 }
        ];
        setWaitlistList(initialList);
        localStorage.setItem('affbio_waitlist_all', JSON.stringify(initialList));
      }
    }, 0);
  }, []);

  // Handle Waitlist Submit
  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    const newCount = totalSubscribers + 1;
    const newUser: WaitlistUser = {
      email: waitlistEmail,
      interest: waitlistInterest,
      joinedAt: new Date().toLocaleDateString('vi-VN'),
      queueNum: newCount,
      referrals: 0
    };

    const updatedList = [newUser, ...waitlistList];
    setRegisteredUser(newUser);
    setTotalSubscribers(newCount);
    setWaitlistList(updatedList);

    localStorage.setItem('affbio_waitlist_user', JSON.stringify(newUser));
    localStorage.setItem('affbio_waitlist_count', newCount.toString());
    localStorage.setItem('affbio_waitlist_all', JSON.stringify(updatedList));

    setWaitlistEmail('');
  };

  // Simulated Lead Registration from Builder Phone Preview
  const handlePlaygroundSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) {
      alert('Vui lòng điền đủ Họ tên và Email để đăng ký.');
      return;
    }

    const currentTemplate = templates[activeNiche];
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: formName,
      email: formEmail,
      phone: formPhone || '090XXXXXXX',
      source: 'Landing Page (AffBio Playground)',
      niche: activeNiche,
      value: currentTemplate.value,
      stage: 'new',
      createdAt: 'Vừa xong'
    };

    setLeads([newLead, ...leads]);
    setFormSubmitted(true);
    setNewLeadNotification(`Khách hàng mới "${formName}" đã được ghi nhận tự động vào CRM AffBio!`);
    
    setTimeout(() => {
      setNewLeadNotification(null);
    }, 6000);
  };

  // Progress Stage inside CRM
  const advanceLeadStage = (leadId: string, nextStage: 'new' | 'contacted' | 'negotiation' | 'won') => {
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, stage: nextStage } : lead));
  };

  // Delete Lead inside CRM
  const deleteLead = (leadId: string) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
  };

  // Reset interactive playground
  const resetPlayground = () => {
    setLeads([
      {
        id: 'lead-1',
        name: 'Nguyễn Văn Minh',
        email: 'minh.nguyen@gmail.com',
        phone: '0912345678',
        source: 'Landing Page',
        niche: 'cosmetics',
        value: 450000,
        stage: 'new',
        createdAt: '10 phút trước'
      },
      {
        id: 'lead-2',
        name: 'Trần Thị Thảo',
        email: 'thaotran@yahoo.com',
        phone: '0987654321',
        source: 'Landing Page',
        niche: 'coding',
        value: 12000000,
        stage: 'contacted',
        createdAt: '1 giờ trước'
      },
      {
        id: 'lead-3',
        name: 'Phạm Thành Long',
        email: 'longpt@saascorp.vn',
        phone: '0905556677',
        source: 'Landing Page',
        niche: 'saas',
        value: 1500000,
        stage: 'negotiation',
        createdAt: '3 giờ trước'
      }
    ]);
    setFormSubmitted(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setActiveNiche('saas');
  };

  // Copy referral link to clipboard
  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=affbio_${registeredUser?.queueNum || 'promo'}`;
    navigator.clipboard.writeText(link);
    setShowCopiedAlert(true);
    setTimeout(() => setShowCopiedAlert(false), 3000);
  };

  // Download registrations as JSON (simulated CSV)
  const downloadWaitlistData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(waitlistList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `affbio_waitlist_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Clear registration to test again
  const resetWaitlistRegistration = () => {
    localStorage.removeItem('affbio_waitlist_user');
    setRegisteredUser(null);
  };

  // Count metrics
  const activeLeadsCount = leads.length;
  const wonLeadsCount = leads.filter(l => l.stage === 'won').length;
  const estimatedRevenue = leads
    .filter(l => l.stage === 'won')
    .reduce((sum, current) => sum + current.value, 0);

  return (
    <div className="relative overflow-hidden selection:bg-blue-500 selection:text-white" id="main-layout">
      {/* Background soft blue decoration elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-30 -z-10" id="bg-glow">
        <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-blue-200 blur-[140px]" />
        <div className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sky-200 blur-[150px]" />
      </div>

      {/* Navigation Header */}
      <header className="border-b border-slate-100 bg-white/85 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 shadow-sm" id="header-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" id="logo-container">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-slate-900">
                Aff<span className="text-blue-600">Bio</span>
              </span>
              <span className="text-[10px] block text-slate-400 font-mono tracking-wider -mt-1 font-bold">CRM & WEBSITE BUILDER</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100/60 rounded-full text-xs text-blue-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Đang phát triển thiết kế (Beta sắp ra mắt)</span>
            </div>
            <a 
              href="#interactive-playground" 
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm shadow-blue-500/10"
              id="try-demo-btn"
            >
              Mô phỏng tính năng
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative text-center" id="hero-section">
        {/* Floating Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-blue-500" />
          <span>Mô hình hoàn hảo cho nhà bán hàng: Landing Page đồng bộ thẳng phễu CRM</span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight max-w-4xl mx-auto leading-tight text-slate-900"
        >
          Dựng <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Landing Page</span> Đơn Giản, Tự Động Đổ Khách Vào <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Phễu CRM</span> Chăm Sóc
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Sản phẩm đang trong quá trình phát triển hoàn thiện. Hãy là những người đầu tiên đăng ký dùng thử bản thử nghiệm và nhận những ưu đãi đặc quyền lên tới 70% từ AffBio khi sản phẩm ra mắt.
        </motion.p>

        {/* Action Waitlist Form / Success Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-md mx-auto relative z-20"
          id="waitlist-card-container"
        >
          <AnimatePresence mode="wait">
            {!registeredUser ? (
              <motion.div 
                key="form-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xl shadow-slate-100 text-left"
              >
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-500" /> Đăng ký nhận bản Alpha Test và Ưu đãi sớm
                </h3>
                
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="Nhập email hoạt động của bạn..."
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-xs text-slate-500 mb-1.5 font-semibold">Bộ phận bạn quan tâm nhất:</label>
                    <select
                      value={waitlistInterest}
                      onChange={(e) => setWaitlistInterest(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="both">Cả hai (Landing Page Builder + CRM)</option>
                      <option value="pagebuilder">Công cụ kéo thả Landing Page (Bán hàng)</option>
                      <option value="crm">Hệ thống CRM lưu trữ, phân phối, quản lý leads</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-sm tracking-wide hover:opacity-95 active:scale-[0.98] transition shadow-md shadow-blue-500/15 flex items-center justify-center gap-1.5"
                  >
                    Đăng Ký Tham Gia Chờ Trải Nghiệm <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="flex items-center justify-between mt-4 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-500" /> 
                    <span>Đã có <strong className="text-slate-700 font-bold">{totalSubscribers.toLocaleString('vi-VN')}</strong> người xếp hàng</span>
                  </span>
                  <span>Miễn phí đăng ký</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-blue-200 p-6 rounded-2xl shadow-xl text-left relative"
              >
                <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Bản Ghi Nhận
                </div>

                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-blue-600 stroke-[3]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display">Chúc mừng bạn đã ghi danh thành công!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đội ngũ phát triển <span className="text-blue-600 font-semibold">AffBio</span> đang xây dựng rất nhanh. Bạn sẽ nhận được thông báo ngay khi chúng tôi mở cổng Alpha Test có hạn.
                </p>

                {/* Queue position & Referral */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Số thứ tự chờ của bạn:</span>
                    <span className="font-mono font-black text-blue-600 text-base">#{registeredUser.queueNum}</span>
                  </div>
                  
                  <div className="border-t border-slate-200 my-2" />

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-1 font-semibold">Được lên hàng chờ sớm hơn khi chia sẻ link:</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${typeof window !== 'undefined' ? window.location.origin : ''}?ref=affbio_${registeredUser.queueNum}`}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-slate-600 focus:outline-none"
                      />
                      <button
                        onClick={copyReferralLink}
                        className="p-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 rounded-lg transition active:scale-95"
                        title="Sao chép link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reward Meter */}
                <div className="mt-4 pt-2">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500 font-semibold">Giới thiệu: 0 / 3 thành viên đăng ký</span>
                    <span className="text-blue-600 font-mono font-bold">0%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="w-0 bg-gradient-to-r from-blue-500 to-sky-400 h-full rounded-full transition-all duration-1000" />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 text-[11px]">
                  <button 
                    onClick={resetWaitlistRegistration}
                    className="text-slate-400 hover:text-slate-600 transition underline font-medium"
                  >
                    Dùng email khác
                  </button>
                  <button 
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="text-blue-600 hover:text-blue-700 font-bold transition flex items-center gap-1"
                  >
                    {showAdminPanel ? 'Ẩn quản lý' : 'Xem quản lý danh sách chờ ⚙️'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Copy Notification Alert */}
          <AnimatePresence>
            {showCopiedAlert && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> Đã sao chép liên kết giới thiệu AffBio!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Admin Panel (Easter Egg / Local Debug utility) */}
      <AnimatePresence>
        {showAdminPanel && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-y border-slate-200 bg-white px-4 py-8 relative overflow-hidden shadow-inner"
            id="admin-waitlist-panel"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    Bảng Điều Khiển Admin Thử Nghiệm (Dữ Liệu Local)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Lập trình viên và bạn có thể kiểm tra danh sách đăng ký lưu tại local storage của trình duyệt này.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={downloadWaitlistData}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Xuất dữ liệu JSON
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa sạch danh sách đăng ký thử nghiệm lưu trong trình duyệt?')) {
                        localStorage.removeItem('affbio_waitlist_all');
                        setWaitlistList([]);
                      }
                    }}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-xs text-red-600 font-semibold flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Xóa toàn bộ
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <div className="max-h-[300px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider">
                        <th className="p-3"># STT Chờ</th>
                        <th className="p-3">Email Đăng Ký</th>
                        <th className="p-3">Sự Quan Tâm</th>
                        <th className="p-3">Ngày Đăng Ký</th>
                        <th className="p-3 text-right">Giới Thiệu (Referral)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {waitlistList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400">Chưa có ai đăng ký thử trong phiên này. Hãy nhập email ở form trên!</td>
                        </tr>
                      ) : (
                        waitlistList.map((user, idx) => (
                          <tr key={idx} className="hover:bg-slate-100/50 transition-colors bg-white">
                            <td className="p-3 font-mono text-blue-600 font-black">#{user.queueNum}</td>
                            <td className="p-3 font-semibold">{user.email}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                user.interest === 'both' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                user.interest === 'pagebuilder' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                                'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              }`}>
                                {user.interest === 'both' ? 'Cả hai' : user.interest === 'pagebuilder' ? 'Page Builder' : 'CRM'}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500">{user.joinedAt}</td>
                            <td className="p-3 text-right font-mono font-bold text-slate-900">{user.referrals} bạn</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Main Core Value Points Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 bg-white" id="features-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-black tracking-tight text-slate-900 sm:text-4xl">
            Sức Mạnh Cộng Hưởng Giữa Landing Page & CRM
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
            Hạn chế tối đa các điểm đứt gãy dữ liệu khách hàng. Thay vì sử dụng các ứng dụng rời rạc qua trung gian, AffBio gắn kết trực tiếp trải nghiệm thiết kế trang bán hàng và lưu trữ khách hàng làm một.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl flex flex-col hover:border-blue-400 hover:bg-white transition-all duration-300 group shadow-sm" id="feat-1">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Layout className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Page Builder Thượng Thừa</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              Trình thiết kế kéo thả tiện dụng không cần lập trình. Đáp ứng đầy đủ các module thu thập biểu mẫu liên hệ, giới thiệu sản phẩm, dịch vụ mượt mà và trực quan.
            </p>
            <ul className="mt-5 space-y-2.5 text-xs text-slate-400 border-t border-slate-200/60 pt-4">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Thư viện mẫu tối ưu cho chuyển đổi doanh số</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Tốc độ phản hồi cực nhanh, chuẩn SEO di động</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Trỏ tên miền bán hàng riêng kèm SSL bảo mật</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl flex flex-col hover:border-blue-400 hover:bg-white transition-all duration-300 group shadow-sm" id="feat-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">CRM Tích Hợp Sâu Sắc</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              Ngay khi khách hàng điền biểu mẫu liên hệ trên Landing Page của bạn, dữ liệu đổ trực tiếp về hệ thống CRM theo thời gian thực mà không qua bất cứ phần mềm kết nối thứ ba nào.
            </p>
            <ul className="mt-5 space-y-2.5 text-xs text-slate-400 border-t border-slate-200/60 pt-4">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Quản lý danh sách, số điện thoại, email an toàn</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Lọc trạng thái, gắn nhãn phân loại khách hàng</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Quản lý chiến dịch tiếp thị và chăm sóc chuẩn xác</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl flex flex-col hover:border-blue-400 hover:bg-white transition-all duration-300 group shadow-sm" id="feat-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Tự Động Hóa Vận Hành</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              Thiết lập hành động tự động hóa thông minh. Gửi thông báo ngay cho đội ngũ tư vấn, phản hồi khách hàng tự động và chuyển trạng thái khách hàng một cách tinh gọn.
            </p>
            <ul className="mt-5 space-y-2.5 text-xs text-slate-400 border-t border-slate-200/60 pt-4">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Tự động gửi Email thông báo và xác nhận</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Tự động phân chia Lead đều cho nhân viên</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Đo lường tỷ suất chuyển đổi doanh thu bán hàng</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Playground Simulator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 relative bg-slate-50/50" id="interactive-playground">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-3 font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> MÔ PHỎNG SẢN PHẨM HOẠT ĐỘNG
          </div>
          <h2 className="text-3xl font-display font-black tracking-tight text-slate-900 sm:text-4xl">
            Trải Nghiệm Hệ Thống CRM & Builder Của AffBio
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
            Xem dòng chảy dữ liệu tức thì: Thay đổi danh mục mẫu ở cột trái, chỉnh sửa nội dung tiêu đề, nhập thông tin đăng ký mẫu tại điện thoại và quan sát khách hàng xuất hiện ngay trên bảng CRM Kanban ở cột phải!
          </p>
        </div>

        {/* Lead Alert Banner */}
        <AnimatePresence>
          {newLeadNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 p-4 rounded-xl text-slate-700 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{newLeadNotification}</span>
                </span>
              </div>
              <button 
                onClick={() => setNewLeadNotification(null)}
                className="text-slate-400 hover:text-slate-600 ml-4 font-bold"
              >
                Đóng
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simulator Dashboard Block */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto" id="playground-grid">
          
          {/* Left Column: Mobile App / Landing Page Editor Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-slate-50/20" id="playground-left">
            <div>
              {/* Top Selector tabs */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-500" /> 1. KHÁCH XEM LANDING PAGE
                </h4>
                <button
                  onClick={resetPlayground}
                  className="text-[10px] font-mono flex items-center gap-1 text-slate-400 hover:text-slate-600 transition"
                  title="Đặt lại mô phỏng"
                >
                  <RotateCcw className="w-3 h-3" /> Trở về ban đầu
                </button>
              </div>

              {/* Niche switcher pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl mb-5">
                {(Object.keys(templates) as Array<keyof typeof templates>).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveNiche(key);
                      setCustomHeadline('');
                      setFormSubmitted(false);
                      setFormName('');
                      setFormEmail('');
                      setFormPhone('');
                    }}
                    className={`py-1.5 text-[10px] font-bold rounded-lg text-center transition ${
                      activeNiche === key 
                        ? 'bg-white text-blue-600 border border-slate-200 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {templates[key].label}
                  </button>
                ))}
              </div>

              {/* Inline Editor Input for customization */}
              <div className="bg-slate-100/50 border border-slate-200 p-3 rounded-xl mb-4 text-xs space-y-2">
                <span className="text-slate-500 font-semibold block">Thử thay đổi tiêu đề Landing Page trực tiếp:</span>
                <input
                  type="text"
                  value={customHeadline || templates[activeNiche].headline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  placeholder="Nhập tiêu đề tùy chỉnh..."
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            {/* Smart Phone Shell Frame */}
            <div className="mx-auto w-full max-w-[280px] sm:max-w-[300px] border-8 border-slate-800 bg-slate-900 rounded-[38px] overflow-hidden shadow-2xl p-2 relative h-[450px] flex flex-col justify-between">
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-1 px-2 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <div className="w-8 h-1 bg-slate-900 rounded-full" />
              </div>

              {/* Mobile Screen Area */}
              <div className="flex-1 bg-white rounded-[28px] overflow-y-auto overflow-x-hidden p-3 pt-6 flex flex-col justify-between text-left text-[11px] relative scrollbar-none border border-slate-100">
                
                {/* Simulated Header */}
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-1.5">
                  <span className="font-extrabold text-[9px] text-blue-600 uppercase tracking-wider">{templates[activeNiche].productName}</span>
                  <span className="text-[8px] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded text-blue-600 font-bold font-mono">LIVE PREVIEW</span>
                </div>

                {/* Hero Inside Mobile */}
                <div className="space-y-2 py-1">
                  <div className="text-[8px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> ĐĂNG KÝ TRẢI NGHIỆM SỚM
                  </div>
                  <h5 className="text-xs font-black text-slate-900 font-display leading-tight">
                    {customHeadline || templates[activeNiche].headline}
                  </h5>
                  <p className="text-[9px] text-slate-500 leading-relaxed">
                    {templates[activeNiche].subtitle}
                  </p>
                </div>

                {/* Form area or success confirmation */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 my-3">
                  {!formSubmitted ? (
                    <form onSubmit={handlePlaygroundSubmitLead} className="space-y-2">
                      <span className="text-[9px] text-slate-500 font-semibold block">Đăng ký mua / nhận quà:</span>
                      
                      <input
                        type="text"
                        required
                        placeholder="Họ và tên..."
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400"
                      />

                      <div className="grid grid-cols-2 gap-1">
                        <input
                          type="email"
                          required
                          placeholder="Email..."
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400"
                        />
                        <input
                          type="text"
                          placeholder="Số điện thoại..."
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className={`w-full py-1.5 rounded-md text-white font-bold text-[10px] bg-gradient-to-r ${templates[activeNiche].primaryColor} hover:opacity-95 active:scale-[0.98] transition flex items-center justify-center gap-1 shadow-sm`}
                      >
                        <MousePointer className="w-3 h-3 text-white" /> {templates[activeNiche].buttonText}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-4 space-y-2 bg-white rounded-lg p-2 border border-blue-100">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-950 block text-[10px]">Đăng ký thành công!</span>
                        <span className="text-[8px] text-slate-400 block mt-1">Thông tin đã truyền thẳng đến cột CRM AffBio bên cạnh để xử lý!</span>
                      </div>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-[8px] text-blue-600 hover:text-blue-700 font-bold underline font-mono block mx-auto"
                      >
                        Thêm Lead khác
                      </button>
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="flex justify-between items-center text-[8px] text-slate-400 pt-1.5 border-t border-slate-100">
                  <span>✔ Bảo mật 100%</span>
                  <span>⭐ AffBio Ecosystem</span>
                </div>
              </div>

              {/* Phone Home Button bar */}
              <div className="w-20 h-1 bg-slate-800 rounded-full mx-auto mt-1" />
            </div>
          </div>

          {/* Right Column: CRM Kanban Pipeline (7 cols) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-white" id="playground-right">
            
            {/* Header / Stats row */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-blue-500" /> 2. QUẢN LÝ CRM AFFBIO (REAL-TIME)
                </h4>
                
                <span className="text-[10px] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-blue-600 font-bold font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  KẾT NỐI TRỰC TIẾP
                </span>
              </div>

              {/* Realtime stats dashboard */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
                  <span className="text-[9px] text-slate-400 block font-mono font-bold">TỔNG LEADS</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-black text-slate-800 font-display">{activeLeadsCount}</span>
                    <span className="text-[8px] text-blue-600 font-bold font-mono">+Mới</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
                  <span className="text-[9px] text-slate-400 block font-mono font-bold">CHỐT THÀNH CÔNG</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-black text-emerald-600 font-display">{wonLeadsCount}</span>
                    <span className="text-[8px] text-slate-400">/{activeLeadsCount}</span>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
                  <span className="text-[9px] text-slate-400 block font-mono font-bold">DOANH THU WON</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xs font-black text-slate-800 font-mono truncate">
                      {estimatedRevenue >= 1000000000 
                        ? `${(estimatedRevenue / 1000000000).toFixed(2)} tỷ ₫` 
                        : `${(estimatedRevenue / 1000000).toFixed(1)} triệu ₫`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Kanban Pipelines wrapper */}
              <div className="grid grid-cols-4 gap-2 text-[10px]" id="kanban-columns">
                
                {/* Stage 1: New */}
                <div className="space-y-2">
                  <div className="bg-slate-50 p-1.5 rounded-lg border-t-2 border-blue-500 text-center font-bold text-slate-700 flex justify-between items-center px-2">
                    <span>Mới nhận</span>
                    <span className="bg-blue-100 text-blue-700 text-[8px] px-1 rounded font-bold font-mono">
                      {leads.filter(l => l.stage === 'new').length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[245px] overflow-y-auto pr-0.5">
                    {leads.filter(l => l.stage === 'new').map(lead => (
                      <div key={lead.id} className="bg-slate-50/50 border border-slate-200 p-2 rounded-lg relative hover:border-blue-400 hover:bg-white transition shadow-2xs">
                        <div className="font-bold text-slate-800 truncate">{lead.name}</div>
                        <div className="text-[8px] text-slate-400 font-mono truncate">{lead.email}</div>
                        
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/60">
                          <span className="text-[8px] bg-blue-50 text-blue-600 font-mono font-bold px-1 rounded">
                            {lead.value >= 1000000 ? `${(lead.value / 1000000).toFixed(1)}M` : `${lead.value / 1000}K`}
                          </span>
                          <button 
                            onClick={() => advanceLeadStage(lead.id, 'contacted')}
                            className="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded hover:bg-blue-700 transition font-mono font-bold"
                          >
                            Tiến ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 2: Contacted */}
                <div className="space-y-2">
                  <div className="bg-slate-50 p-1.5 rounded-lg border-t-2 border-sky-400 text-center font-bold text-slate-700 flex justify-between items-center px-2">
                    <span>Liên hệ</span>
                    <span className="bg-sky-100 text-sky-700 text-[8px] px-1 rounded font-bold font-mono">
                      {leads.filter(l => l.stage === 'contacted').length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[245px] overflow-y-auto pr-0.5">
                    {leads.filter(l => l.stage === 'contacted').map(lead => (
                      <div key={lead.id} className="bg-slate-50/50 border border-slate-200 p-2 rounded-lg relative hover:border-sky-400 hover:bg-white transition shadow-2xs">
                        <div className="font-bold text-slate-800 truncate">{lead.name}</div>
                        <div className="text-[8px] text-slate-400 font-mono truncate">{lead.email}</div>
                        
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/60">
                          <span className="text-[8px] bg-sky-50 text-sky-600 font-mono font-bold px-1 rounded">
                            {lead.value >= 1000000 ? `${(lead.value / 1000000).toFixed(1)}M` : `${lead.value / 1000}K`}
                          </span>
                          <button 
                            onClick={() => advanceLeadStage(lead.id, 'negotiation')}
                            className="bg-sky-500 text-white text-[8px] px-1.5 py-0.5 rounded hover:bg-sky-600 transition font-mono font-bold"
                          >
                            Tiến ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 3: Negotiation */}
                <div className="space-y-2">
                  <div className="bg-slate-50 p-1.5 rounded-lg border-t-2 border-amber-500 text-center font-bold text-slate-700 flex justify-between items-center px-2">
                    <span>Thương lượng</span>
                    <span className="bg-amber-100 text-amber-700 text-[8px] px-1 rounded font-bold font-mono">
                      {leads.filter(l => l.stage === 'negotiation').length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[245px] overflow-y-auto pr-0.5">
                    {leads.filter(l => l.stage === 'negotiation').map(lead => (
                      <div key={lead.id} className="bg-slate-50/50 border border-slate-200 p-2 rounded-lg relative hover:border-amber-400 hover:bg-white transition shadow-2xs">
                        <div className="font-bold text-slate-800 truncate">{lead.name}</div>
                        <div className="text-[8px] text-slate-400 font-mono truncate">{lead.email}</div>
                        
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/60">
                          <span className="text-[8px] bg-amber-50 text-amber-600 font-mono font-bold px-1 rounded">
                            {lead.value >= 1000000 ? `${(lead.value / 1000000).toFixed(1)}M` : `${lead.value / 1000}K`}
                          </span>
                          <button 
                            onClick={() => advanceLeadStage(lead.id, 'won')}
                            className="bg-amber-500 text-white text-[8px] px-1.5 py-0.5 rounded hover:bg-amber-600 transition font-mono font-bold"
                          >
                            Tiến ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 4: Won */}
                <div className="space-y-2">
                  <div className="bg-slate-50 p-1.5 rounded-lg border-t-2 border-emerald-500 text-center font-bold text-slate-700 flex justify-between items-center px-2">
                    <span>Thành công 🎉</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[8px] px-1 rounded font-bold font-mono">
                      {leads.filter(l => l.stage === 'won').length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[245px] overflow-y-auto pr-0.5">
                    {leads.filter(l => l.stage === 'won').map(lead => (
                      <div key={lead.id} className="bg-emerald-50/50 border border-emerald-200 p-2 rounded-lg relative hover:border-emerald-400 hover:bg-white transition shadow-2xs">
                        <div className="font-bold text-emerald-700 truncate">{lead.name}</div>
                        <div className="text-[8px] text-slate-400 font-mono truncate">{lead.email}</div>
                        
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-200/60">
                          <span className="text-[8px] bg-emerald-50 text-emerald-700 font-mono font-bold px-1 rounded">
                            {lead.value >= 1000000 ? `${(lead.value / 1000000).toFixed(1)}M` : `${lead.value / 1000}K`}
                          </span>
                          <button 
                            onClick={() => deleteLead(lead.id)}
                            className="text-[8px] text-red-500 hover:text-red-700 font-bold transition-colors"
                            title="Xóa khách hàng"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Live Logs terminal */}
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-3 text-[10px] font-mono text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-800">
                <span>DÒNG THỜI GIAN HOẠT ĐỘNG THỜI GIAN THỰC</span>
                <span className="text-blue-400 font-bold">SYSTEM ACTIVE</span>
              </div>
              <div className="space-y-1 max-h-[60px] overflow-y-auto scrollbar-none text-slate-400">
                <p className="text-blue-400">✓ [AffBio CRM] Đang chờ và lắng nghe luồng dữ liệu biểu mẫu...</p>
                {leads.map((l, index) => (
                  <p key={index} className="text-slate-500">
                    » Khách hàng <strong className="text-slate-300">{l.name}</strong> gửi thông tin từ phễu [{templates[l.niche as keyof typeof templates]?.label || 'Khác'}]. Trạng thái phễu hiện tại: [{l.stage.toUpperCase()}].
                  </p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Production Road Map & Coming Soon Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100" id="roadmap-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-black tracking-tight text-slate-900 sm:text-4xl">
            Lộ Trình Xây Dựng & Bản Phát Hành
          </h2>
          <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
            Hệ thống AffBio đang được tinh chỉnh hàng ngày. Chúng tôi cam kết tạo ra một môi trường tối ưu, an toàn và dễ sử dụng nhất cho doanh nghiệp của bạn.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto" id="roadmap-flow">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

          <div className="space-y-12">
            
            {/* Timeline Item 1 */}
            <div className="flex flex-col md:flex-row items-stretch relative">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-100 -translate-x-1/2 z-10" />
              <div className="w-full md:w-1/2 md:pr-10 pl-8 md:pl-0 text-left md:text-right">
                <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Giai đoạn 1</span>
                <h4 className="text-base font-bold text-slate-900 mt-2 font-display">Kiến Trúc Đất Nền & CRM Lõi</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Xây dựng giải pháp lưu trữ dữ liệu an toàn, xử lý trùng lặp tự động và thiết kế bảng chuyển đổi dữ liệu chuẩn xác nhất để làm bệ phóng cho các tính năng tiếp theo.
                </p>
                <span className="inline-block text-[11px] font-mono text-slate-400 mt-2">Hoàn thành (Tháng 5/2026)</span>
              </div>
              <div className="w-full md:w-1/2 hidden md:block" />
            </div>

            {/* Timeline Item 2 */}
            <div className="flex flex-col md:flex-row items-stretch relative">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-100 -translate-x-1/2 z-10 animate-pulse" />
              <div className="w-full md:w-1/2 hidden md:block" />
              <div className="w-full md:w-1/2 md:pl-10 pl-8 text-left">
                <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Giai đoạn 2</span>
                <h4 className="text-base font-bold text-slate-900 mt-2 font-display">Phát Triển Builder Kéo Thả Trực Quan</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Hoàn thiện trình thiết kế giao diện không cần code của AffBio, mang lại các tính năng kéo khối, chỉnh sửa hình ảnh, phông chữ nhanh và trực quan nhất.
                </p>
                <span className="inline-block text-[11px] font-mono text-blue-600 font-bold mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  Đang trong quá trình hoàn tất (Đạt 85%)
                </span>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex flex-col md:flex-row items-stretch relative">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-slate-300 border-4 border-slate-100 -translate-x-1/2 z-10" />
              <div className="w-full md:w-1/2 md:pr-10 pl-8 md:pl-0 text-left md:text-right">
                <span className="text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Giai đoạn 3</span>
                <h4 className="text-base font-bold text-slate-800 mt-2 font-display">Kiểm Thử Alpha Có Hạn (Alpha Test)</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Cung cấp quyền truy cập giới hạn cho các cá nhân trong danh sách chờ để thử nghiệm thực tế các tính năng, nâng cấp tốc độ và tối ưu giao diện.
                </p>
                <span className="inline-block text-[11px] font-mono text-slate-400 mt-2">Dự kiến: Tháng 8/2026</span>
              </div>
              <div className="w-full md:w-1/2 hidden md:block" />
            </div>

            {/* Timeline Item 4 */}
            <div className="flex flex-col md:flex-row items-stretch relative">
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-slate-300 border-4 border-slate-100 -translate-x-1/2 z-10" />
              <div className="w-full md:w-1/2 hidden md:block" />
              <div className="w-full md:w-1/2 md:pl-10 pl-8 text-left">
                <span className="text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Giai đoạn 4</span>
                <h4 className="text-base font-bold text-slate-800 mt-2 font-display">Phát Hành Bản Beta Rộng Rãi</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Mở cổng đăng ký tài khoản chính thức cho toàn bộ cộng đồng nhà bán hàng, đi kèm chính sách ưu đãi sâu cho người dùng đồng hành đời đầu.
                </p>
                <span className="inline-block text-[11px] font-mono text-slate-400 mt-2">Dự kiến: Tháng 9/2026</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-100 bg-white" id="faq-section">
        <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-center text-slate-900 mb-12">
          Câu Hỏi Thường Gặp
        </h3>

        <div className="space-y-4" id="faq-list">
          
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">AffBio khác gì so với việc nối Ladipage với một CRM riêng lẻ?</h4>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Thông thường, bạn phải dựng Landing page ở một nền tảng khác rồi nối webhook hoặc Zapier về phần mềm CRM. Việc này gây ra độ trễ dữ liệu, thỉnh thoảng lỗi cổng API khiến bạn bị mất Leads khách hàng quý giá từ quảng cáo. Tại AffBio, chúng tôi đồng bộ sâu mọi form đăng ký trực tiếp vào CRM của bạn theo thời gian thực mà không qua một cổng trung gian nào.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">Tôi có thể trỏ tên miền riêng về website dựng trên AffBio không?</h4>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Hoàn toàn được. Bạn có thể dễ dàng liên kết tên miền thương hiệu riêng của mình với các trang landing page xây dựng trên AffBio, hoàn tất tự động cấu hình chứng chỉ bảo mật SSL trọn đời miễn phí chỉ sau vài thao tác.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">Mức độ ưu đãi 70% dành cho danh sách chờ hoạt động thế nào?</h4>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Đối với toàn bộ các thành viên thực hiện đăng ký giữ vị trí chờ trên hệ thống ngày hôm nay, chúng tôi sẽ gửi tặng mã giảm giá độc quyền 70% giá trị gói dịch vụ AffBio khi phiên bản thương mại chính thức khởi chạy, áp dụng trọn đời hoặc theo chu kỳ thanh toán dài hạn đầu tiên.
            </p>
          </div>

        </div>
      </section>

      {/* Mini CTA Footer Section */}
      <footer className="border-t border-slate-100 bg-white py-12 px-4 sm:px-6 lg:px-8 text-center" id="footer-section">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            <span className="font-display font-black text-base text-slate-900">AffBio Workspace</span>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Hệ sinh thái kiến tạo phễu bán hàng, thiết kế landing page và tự động hoá quy trình quản trị khách hàng tối ưu hiệu suất doanh nghiệp.
          </p>

          <div className="flex justify-center gap-6 text-xs text-slate-400 border-t border-slate-100 pt-6">
            <span>© 2026 AffBio. Bảo lưu toàn bộ bản quyền.</span>
            <a href="#main-layout" className="hover:text-slate-600 transition underline">Quay lại đầu trang</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
