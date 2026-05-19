import React, { useContext, useState } from 'react';
import { notification } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { ArrowLeft, Mail, Lock, LogIn, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = formData;

        const res = await loginApi(email, password);

        if (res && res.EC === 0) {
            localStorage.setItem("access_token", res.access_token);
            notification.success({
                message: "Welcome Back",
                description: "Login successful!"
            });
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? ""
                }
            })
            navigate("/");
        } else {
            notification.error({
                message: "Login Failed",
                description: res?.EM ?? "Invalid email or password"
            })
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-dark">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -mr-48 -mt-48 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[120px] -ml-48 -mb-48 rounded-full"></div>

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
                    <h2 className="text-3xl font-bold text-white mb-2">Member Login</h2>
                    <p className="text-gray-400">Enter your credentials to access your account</p>
                </div>

                <div className="glass-card p-8 border-white/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="name@example.com"
                                />
                                <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                            </div>
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
                            {loading ? "Signing in..." : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up now</Link>
                        </p>
                    </div>
                </div>

                <Link to="/" className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors mt-8 text-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Homepage
                </Link>
            </motion.div>
        </div>
    );
};

export default LoginPage;