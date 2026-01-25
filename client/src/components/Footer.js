import React from 'react';
import { Link } from 'react-router-dom';
import { RiFacebookCircleFill, RiTwitterXFill, RiInstagramFill, RiYoutubeFill, RiLinkedinBoxFill, RiPinterestFill, RiCustomerService2Fill } from 'react-icons/ri';
import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-[#333545] text-[#b3b3b3] text-sm">
            {/* Top Bar - Brand Promise */}
            <div className="bg-[#2b2d3c] py-6 border-b border-gray-700">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <span className="text-[#333545] font-bold text-xl">E</span>
                        </div>
                        <div>
                            <span className="font-bold text-white text-lg block">List your Show</span>
                            <span className="text-xs">Got a show, event, activity or a great experience? Partner with us & get listed.</span>
                        </div>
                    </div>
                    <Link to="/list-your-show" className="bg-[#ec5e71] hover:bg-[#e11d48] text-white px-6 py-2 rounded-md font-medium transition-colors">
                        Contact Today!
                    </Link>
                </div>
            </div>

            {/* Links Section */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Company</h4>
                    <ul className="space-y-2 text-xs">
                        <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Help & Support</h4>
                    <ul className="space-y-2 text-xs">
                        <li><Link to="/help" className="hover:text-white transition">User Guide</Link></li>
                        <li><Link to="/refunds" className="hover:text-white transition">Refund Policy</Link></li>
                        <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                        <li><Link to="/sitemap" className="hover:text-white transition">Sitemap</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Explore</h4>
                    <ul className="space-y-2 text-xs">
                        <li><Link to="/movies" className="hover:text-white transition">Movies in Mumbai</Link></li>
                        <li><Link to="/events" className="hover:text-white transition">Events in Mumbai</Link></li>
                        <li><Link to="/plays" className="hover:text-white transition">Plays in Mumbai</Link></li>
                        <li><Link to="/sports" className="hover:text-white transition">Sports in Mumbai</Link></li>
                        <li><Link to="/activities" className="hover:text-white transition">Activities in Mumbai</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">Connect With Us</h4>
                    <div className="flex gap-3 mb-6">
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"><RiFacebookCircleFill size={18} /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"><RiTwitterXFill size={16} /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"><RiInstagramFill size={18} /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"><RiYoutubeFill size={18} /></a>
                        <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all"><RiLinkedinBoxFill size={18} /></a>
                    </div>

                    <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">24/7 Customer Care</h4>
                    <p className="text-xs flex items-center gap-2 mb-1">
                        <RiCustomerService2Fill className="text-white" /> +91 12345 67890
                    </p>
                    <p className="text-xs ml-6">support@eventify.com</p>
                </div>
            </div>

            {/* Logos & Copyright */}
            <div className="border-t border-gray-700 pt-8 pb-12 bg-[#333545]">
                <div className="container mx-auto px-4 flex flex-col items-center gap-6">
                    <div className="flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos for visual "trust" */}
                        <SiVisa size={40} />
                        <SiMastercard size={40} />
                        <SiAmericanexpress size={40} />
                    </div>

                    <div className="text-center">
                        <div className="w-full h-[1px] bg-gray-700 w-32 mx-auto mb-4"></div>
                        <p className="text-[11px] text-gray-500 uppercase tracking-widest">
                            © {new Date().getFullYear()} Eventify Entertainment Pvt. Ltd. All Rights Reserved.
                        </p>
                        <p className="text-[10px] text-gray-600 mt-2 max-w-2xl mx-auto leading-relaxed">
                            The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
