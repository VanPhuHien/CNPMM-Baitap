import React, { useState } from 'react';
import { notification } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, UserPlus, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { name, email, password } = formData;

        const res = await createUserApi(name, email, password);

        if (res && res.EC === 0) {
            notification.success({
                message: "Tạo Tài Khoản Thành Công",
                description: "Chào mừng bạn! Vui lòng đăng nhập để tiếp tục."
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Đăng Ký Thất Bại",
                description: res?.EM ?? "Đã xảy ra lỗi, vui lòng thử lại."
            })
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-dark">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] -ml-48 -mt-48 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] -mr-48 -mb-48 rounded-full"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="p-3 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-all">
                            <Cpu className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            CYBER<span className="text-primary">STORE</span>
                        </span>
                    </Link>
                    <h2 className="text-3xl font-bold text-white mb-2">Đăng Ký Tài Khoản</h2>
                    <p className="text-gray-400">Tham gia cộng đồng mua sắm thiết bị công nghệ hàng đầu</p>
                </div>

                <div className="glass-card p-8 border-white/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Họ và Tên</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Nguyễn Văn A"
                                />
                                <User className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Địa Chỉ Email</label>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="nhap-email@example.com"
                                />
                                <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Mật Khẩu</label>
                            <div className="relative group">
                                <input 
                                    type="password" 
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="••••••••"
                                />
                                <Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Đang tạo tài khoản..." : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    Đăng Ký Ngay
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-400 text-sm">
                            Đã có tài khoản? <Link to="/login" className="text-primary font-bold hover:underline">Đăng nhập tại đây</Link>
                        </p>
                    </div>
                </div>

                <Link to="/" className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors mt-8 text-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Quay lại Trang Chủ
                </Link>
            </motion.div>
        </div>
    );
};

export default RegisterPage;