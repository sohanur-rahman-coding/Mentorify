"use client";

import Link from "next/link";
import { FaBookOpen, FaFacebookF, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import { FaXTwitter, FaMapLocationDot } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 border-t border-zinc-800 bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                <FaBookOpen className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Mentorify
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Simplifying the learning process by connecting passionate students
              with expert verified mentors instantly.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white hover:text-black transition-all"
                title="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white hover:text-black transition-all"
                title="X (Twitter)"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white hover:text-black transition-all"
                title="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-white hover:text-black transition-all"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Learning Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/tutors"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Browse All Tutors
                </Link>
              </li>
              <li>
                <Link
                  href="/tutors?category=mathematics"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Mathematics Mentors
                </Link>
              </li>
              <li>
                <Link
                  href="/tutors?category=physics"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Physics Experts
                </Link>
              </li>
              <li>
                <Link
                  href="/tutors?category=programming"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Coding & Tech Tutors
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Home Page
                </Link>
              </li>
              <li>
                <Link
                  href="/add-tutor"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/my-booked-sessions"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-zinc-400">
                <FaMapLocationDot className="w-4 h-4 mt-0.5 text-zinc-300 flex-shrink-0" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <FaPhoneAlt className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <FaRegEnvelope className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                <span className="truncate">support@mentorify.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} Mentorify. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}