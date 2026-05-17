"use client";

import { useState } from "react";
import { BookOpen, Menu, X, User, LogOut, Sun, Moon, PlusCircle, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // অ্যাসাইনমেন্টের রিকোয়ারমেন্ট টেস্ট করার জন্য একটি ডামি ইউজার স্টেট। 
  // কন্ডিশনাল রেন্ডারিং চেক করতে এটিকে true বা null করে দেখতে পারেন।
  const [user, setUser] = useState({
    name: "Sohanur Rahman",
    email: "sohan@gmail.com",
  });

  const handleLogout = () => {
    setUser(null); // আপনার আসল অথেন্টিকেশন বা ফায়ারবেস সাইন-আউট লজিক এখানে বসবে
  };

  return (
    // ফ্লোটিং বা ভাসমান ভাব আনার জন্য `pt-4` এবং `px-4` দিয়ে স্পেস তৈরি করা হয়েছে
    <nav className="w-full pt-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      
      {/* মূল ন্যাভিগেশন কন্টেইনার - স্ক্রিনশটের মতো পিল-শেপড এবং ডার্ক/লাইট মোড সাপোর্টেড */}
      <div className="max-w-7xl mx-auto bg-background/70 dark:bg-black/40 backdrop-blur-md border border-default-200 dark:border-default-100 shadow-lg rounded-full px-6 py-2 transition-all duration-300">
        <div className="flex justify-between h-14 items-center">
          
          {/* ১. লোগো এবং নাম */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">
              Mentorify
            </span>
          </Link>

          {/* ২. ডেস্কটপ মেনু লিংঙ্কস (পাবলিক এবং প্রাইভেট রিকোয়ারমেন্ট অনুযায়ী) */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/tutors" className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors">
              Tutors
            </Link>
            
            {/* ব্যবহারকারী লগইন থাকলে তবেই এই প্রাইভেট রাউটগুলো দেখাবে */}
            {user && (
              <>
                <Link href="/add-tutor" className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Add Tutor
                </Link>
                <Link href="/my-tutors" className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors">
                  My Tutors
                </Link>
                <Link href="/my-booked-sessions" className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors">
                  My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* ৩. রাইট সাইড অ্যাকশন বাটন (থিম টগল এবং লগইন/প্রোফাইল) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* `next-themes` ভিত্তিক ডার্ক/লাইট মোড টগলার */}
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="p-2 rounded-full hover:bg-default-100 text-foreground transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {!user ? (
              <>
                {/* স্ক্রিনশটের মতো মিনিমাল সাইন ইন টেক্সট */}
                <Link href="/login" className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Link href="/register">
                  {/* স্ক্রিনশটের 'Get Started Free' বাটনের মতো রাউন্ডেড ও প্রিমিয়াম লুক */}
                  <Button 
                    className="font-semibold bg-foreground text-background rounded-full px-6 py-2 text-sm shadow-md hover:opacity-90 transition-opacity"
                    size="sm"
                  >
                    Get Started Free
                  </Button>
                </Link>
              </>
            ) : (
              /* ব্যবহারকারী লগইন থাকলে প্রোফাইল ড্রপডাউন */
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-default-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs ring-2 ring-default-300 dark:ring-default-100">
                    {user.name ? user.name[0] : <User className="w-3 h-3" />}
                  </div>
                </button>
                
                {/* ড্রপডাউন মেনু */}
                <div className="absolute right-0 top-10 w-48 bg-background border border-default-200 dark:border-default-100 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-default-100">
                    <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="px-4 py-2 text-sm hover:bg-default-100 flex items-center gap-2 transition-colors">
                    <User className="w-4 h-4" /> Profile Page
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 text-sm text-danger hover:bg-danger-50 dark:hover:bg-danger-50/10 flex items-center gap-2 text-left w-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ৪. মোবাইল রেসপন্সিভ মেনু বাটন */}
          <div className="md:hidden flex items-center gap-1">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="p-2 rounded-full text-foreground"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full text-foreground">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* মোবাইল রেসপন্সিভ ড্রপডাউন মেনু */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl px-6 py-4 bg-background border border-default-200 dark:border-default-100 rounded-2xl shadow-xl space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/tutors" onClick={() => setIsMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-primary transition-colors">Tutors</Link>
          
          {user ? (
            <>
              <Link href="/add-tutor" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium flex items-center gap-2"><PlusCircle className="w-4 h-4" /> Add Tutor</Link>
              <Link href="/my-tutors" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium flex items-center gap-2"><Users className="w-4 h-4" /> My Tutors</Link>
              <Link href="/my-booked-sessions" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm font-medium flex items-center gap-2"><Calendar className="w-4 h-4" /> My Booked Sessions</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left py-2 text-sm font-medium text-danger flex items-center gap-2 border-t border-default-200 dark:border-default-100 mt-2"><LogOut className="w-4 h-4" /> Log Out</button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-default-200 dark:border-default-100">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}><Button size="sm" variant="bordered" className="w-full rounded-full">Sign In</Button></Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}><Button size="sm" className="w-full bg-foreground text-background rounded-full font-semibold">Get Started</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}