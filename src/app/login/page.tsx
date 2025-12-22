"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fixed type error: added React.FormEvent
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin"); // Redirect to Dashboard
    } catch (err: any) { // Fixed type error: explicit 'any' for error
      console.error(err); // Good practice to log the error
      setError("Invalid credentials. Access denied.");
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#050511] overflow-hidden flex items-center justify-center font-sans">
      
      {/* =========================================
          BACKGROUND AMBIENCE (Consistent with Hero)
          ========================================= */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none opacity-20" />


      {/* =========================================
          LOGIN CARD
          ========================================= */}
      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Back Button */}
        <Link href="/" className="absolute -top-16 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-medium tracking-wide">BACK TO HOME</span>
        </Link>

        {/* Glass Card */}
        <div className="w-full bg-[#0b0f19]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
          
            {/* Top Glow Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-20 h-20 mb-6">
                    {/* Avatar Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-[20px] opacity-50 animate-pulse" />
                    {/* Avatar Image */}
                    <div className="relative w-full h-full rounded-full border-2 border-white/20 overflow-hidden bg-black">
                          <Image 
                            src="https://i.postimg.cc/c4QsPY2p/Screenshot-2025-12-21-154814.png" 
                            alt="Admin" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    {/* Badge */}
                    <div className="absolute bottom-0 right-0 bg-[#050511] rounded-full p-1 border border-white/20 text-cyan-400">
                        <ShieldCheck size={14} />
                    </div>
                </div>

                <h1 className="text-2xl font-black text-white tracking-wide uppercase">
                    Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Portal</span>
                </h1>
                <p className="text-gray-500 text-sm mt-2">Enter your credentials to manage content.</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                
                {/* Email Input */}
                <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-blue-400 transition-colors" size={20} />
                    <input
                        type="email"
                        placeholder="Admin Email"
                        required
                        className="w-full bg-[#050511] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-purple-400 transition-colors" size={20} />
                    <input
                        type="password"
                        placeholder="Secure Password"
                        required
                        className="w-full bg-[#050511] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button 
                    disabled={loading}
                    className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Authenticating...
                        </>
                    ) : (
                        "Access Dashboard"
                    )}
                </button>
            </form>

        </div>
      </div>
    </section>
  );
}