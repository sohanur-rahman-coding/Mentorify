"use client";

import { useState } from "react";
import {
  BookOpen,
  Menu,
  X,
  User,
  LogOut,
  Sun,
  Moon,
  PlusCircle,
  Users,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: sessionData, isPending } = authClient.useSession();

  const user = sessionData?.user;

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        onSuccess: () => {
          router.push("/login");
          toast.warning("Sign Out Successful");
          router.refresh();
        },
      });
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
     
    }
  };

  return (
    <nav className="w-full pt-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto bg-background/70 dark:bg-black/40 backdrop-blur-md border border-default-200 dark:border-default-100 shadow-lg rounded-full px-6 py-2 transition-all duration-300">
        <div className="flex justify-between h-14 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">
              Mentorify
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className={`font-semibold text-sm transition-colors ${
                isActive("/")
                  ? "text-cyan-500 dark:text-cyan-400"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tutors"
              className={`font-semibold text-sm transition-colors ${
                isActive("/tutors")
                  ? "text-cyan-500 dark:text-cyan-400"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Tutors
            </Link>

            {!isPending && user && (
              <>
                <Link
                  href="/add-tutor"
                  className={`font-semibold text-sm transition-colors ${
                    isActive("/add-tutor")
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  Add Tutor
                </Link>
                <Link
                  href="/my-tutors"
                  className={`font-semibold text-sm transition-colors ${
                    isActive("/my-tutors")
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  My Tutors
                </Link>
                <Link
                  href="/my-booked-sessions"
                  className={`font-semibold text-sm transition-colors ${
                    isActive("/my-booked-sessions")
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* Right side actions (Theme Toggle & Profile/Sign In) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-default-100 text-foreground transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {!isPending &&
              (!user ? (
                <>
                  <Link
                    href="/login"
                    className="font-medium text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link href="/register">
                    <Button
                      className="font-semibold bg-foreground text-background rounded-full px-6 py-2 text-sm shadow-md hover:opacity-90 transition-opacity"
                      size="sm"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-default-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs ring-2 ring-default-300 dark:ring-default-100 overflow-hidden">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : user.name ? (
                        user.name[0].toUpperCase()
                      ) : (
                        <User className="w-3 h-3" />
                      )}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-10 w-48 bg-background border border-default-200 dark:border-default-100 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-default-100">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-foreground/60 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className={`px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                        isActive("/profile")
                          ? "bg-default-100 text-cyan-500 font-semibold"
                          : "hover:bg-default-100"
                      }`}
                    >
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
              ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl px-6 py-4 bg-background border border-default-200 dark:border-default-100 rounded-2xl shadow-xl space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block py-2 text-sm font-semibold transition-colors ${
              isActive("/") ? "text-cyan-500" : "hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/tutors"
            onClick={() => setIsMenuOpen(false)}
            className={`block py-2 text-sm font-semibold transition-colors ${
              isActive("/tutors") ? "text-cyan-500" : "hover:text-primary"
            }`}
          >
            Tutors
          </Link>

          {!isPending &&
            (user ? (
              <>
                <Link
                  href="/add-tutor"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${
                    isActive("/add-tutor")
                      ? "text-cyan-500"
                      : "text-foreground/80"
                  }`}
                >
                  <PlusCircle className="w-4 h-4" /> Add Tutor
                </Link>
                <Link
                  href="/my-tutors"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${
                    isActive("/my-tutors")
                      ? "text-cyan-500"
                      : "text-foreground/80"
                  }`}
                >
                  <Users className="w-4 h-4" /> My Tutors
                </Link>
                <Link
                  href="/my-booked-sessions"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${
                    isActive("/my-booked-sessions")
                      ? "text-cyan-500"
                      : "text-foreground/80"
                  }`}
                >
                  <Calendar className="w-4 h-4" /> My Booked Sessions
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-sm font-medium text-danger flex items-center gap-2 border-t border-default-200 dark:border-default-100 mt-2 pt-2"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-default-200 dark:border-default-100">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size="sm"
                    variant="bordered"
                    className="w-full rounded-full"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-foreground text-background rounded-full font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
        </div>
      )}
    </nav>
  );
}
