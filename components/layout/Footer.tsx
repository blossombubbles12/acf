import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-white py-12 border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                {/* Brand */}
                <div className="space-y-4 lg:col-span-2">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner relative overflow-hidden">
                            <Image
                                src="/acflogo.png"
                                alt="ACF Logo"
                                fill
                                className="object-contain p-1"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-outfit font-bold text-white">
                                Actors Charity <span className="text-amber-500">Foundation</span>
                            </h2>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-amber-500/80">Creative Impact & Social Change</p>
                        </div>
                    </Link>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-medium">
                        Harnessing the global influence of Nollywood to drive sustainable social change through storytelling and strategic philanthropy.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Quick Links</h3>
                    <ul className="space-y-2 text-[11px] font-medium">
                        <li><Link href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">About ACF</Link></li>
                        <li><Link href="/about/board" className="text-slate-400 hover:text-amber-500 transition-colors">Board Members</Link></li>
                        <li><Link href="/community" className="text-slate-400 hover:text-amber-500 transition-colors">Industry Network</Link></li>
                        <li><Link href="/donate" className="text-slate-400 hover:text-amber-500 transition-colors">Donate Now</Link></li>
                        <li><Link href="/media" className="text-slate-400 hover:text-amber-500 transition-colors">Media Gallery</Link></li>
                        <li><Link href="/events" className="text-slate-400 hover:text-amber-500 transition-colors">Our Campaigns</Link></li>
                        <li><Link href="/contact" className="text-slate-400 hover:text-amber-500 transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Contact Us</h3>
                    <ul className="space-y-3 text-[11px] font-medium">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                            <span className="text-slate-400 leading-relaxed">17 Modupe Johnson Crescent<br/>off Adeniran Ogunsanya<br/>Surulere, Lagos, Nigeria</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <a href="mailto:support@actorscharityfoundation.org" className="block text-slate-400 hover:text-amber-500 transition-colors">support@actorscharityfoundation.org</a>
                                <a href="mailto:actorscharityfoundation17@gmail.com" className="block text-slate-400 hover:text-amber-500 transition-colors">actorscharityfoundation17@gmail.com</a>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <a href="tel:+2348023424770" className="block text-slate-400 hover:text-amber-500 transition-colors">+234 802 342 4770</a>
                                <a href="tel:+2348033243943" className="block text-slate-400 hover:text-amber-500 transition-colors">+234 803 324 3943</a>
                                <span className="text-slate-500 text-[10px]">Available 24/7 for support</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Stay Connected</h3>
                    <div className="flex gap-3">
                        <a href="#" className="p-2.5 bg-white/5 text-slate-400 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2.5 bg-white/5 text-slate-400 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2.5 bg-white/5 text-slate-400 rounded-lg hover:bg-amber-500 hover:text-slate-950 transition-all">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} Actors Charity Foundation.
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    );
}
