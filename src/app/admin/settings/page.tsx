"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, Globe, Layout, MessageSquare } from "lucide-react";
import { authFetch } from "@/lib/authFetch";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    websiteName: "",
    websiteDescription: "",
    heroSection: {
      heading: "",
      subheading: "",
      buttonText: "",
      buttonLink: "",
    },
    contactDetails: {
      email: "",
      phone: "",
    },
    socialLinks: {
      instagram: "",
      facebook: "",
      youtube: "",
    },
    aboutUs: {
      content: "",
    },
    footer: {
      copyrightText: "",
      address: "",
    },
  });

  const fetchSettings = async () => {
    try {
      const res = await authFetch("/api/v1/admin/website-settings");
      if (res.ok) {
        const data = await res.json();
        const settings = data.data.settings;
        setForm({
          websiteName: settings.websiteName || "",
          websiteDescription: settings.websiteDescription || "",
          heroSection: {
            heading: settings.heroSection?.heading || "",
            subheading: settings.heroSection?.subheading || "",
            buttonText: settings.heroSection?.buttonText || "",
            buttonLink: settings.heroSection?.buttonLink || "",
          },
          contactDetails: {
            email: settings.contactDetails?.email || "",
            phone: settings.contactDetails?.phone || "",
          },
          socialLinks: {
            instagram: settings.socialLinks?.instagram || "",
            facebook: settings.socialLinks?.facebook || "",
            youtube: settings.socialLinks?.youtube || "",
          },
          aboutUs: {
            content: settings.aboutUs?.content || "",
          },
          footer: {
            copyrightText: settings.footer?.copyrightText || "",
            address: settings.footer?.address || "",
          }
        });
      }
    } catch (err) {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await authFetch("/api/v1/admin/website-settings", {
        method: "PUT",
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess("Website settings updated successfully!");
      } else {
        setError("Failed to update settings");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Loader2 className="w-10 h-10 text-saffron-deep animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-saffron-deep" />
        <h1 className="font-display text-3xl font-extrabold text-[#5C1A1A] tracking-wider">Website Settings</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        
        {/* General Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-gold-start/10 pb-4">
            <Globe className="w-5 h-5 text-saffron-deep" />
            <h2 className="font-display text-xl font-bold text-[#5C1A1A]">General Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Website Name</label>
              <input 
                type="text" 
                value={form.websiteName}
                onChange={e => setForm({...form, websiteName: e.target.value})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Website Description (SEO)</label>
              <textarea 
                rows={3}
                value={form.websiteDescription}
                onChange={e => setForm({...form, websiteDescription: e.target.value})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-gold-start/10 pb-4">
            <Layout className="w-5 h-5 text-saffron-deep" />
            <h2 className="font-display text-xl font-bold text-[#5C1A1A]">Hero Section</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Main Heading</label>
              <input 
                type="text" 
                value={form.heroSection.heading}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, heading: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Subheading</label>
              <textarea 
                rows={2}
                value={form.heroSection.subheading}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, subheading: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Button Text</label>
              <input 
                type="text" 
                value={form.heroSection.buttonText}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, buttonText: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Button Link</label>
              <input 
                type="text" 
                value={form.heroSection.buttonLink}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, buttonLink: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-gold-start/10 pb-4">
            <MessageSquare className="w-5 h-5 text-saffron-deep" />
            <h2 className="font-display text-xl font-bold text-[#5C1A1A]">Contact Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Support Email</label>
              <input 
                type="email" 
                value={form.contactDetails.email}
                onChange={e => setForm({...form, contactDetails: {...form.contactDetails, email: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Support Phone</label>
              <input 
                type="text" 
                value={form.contactDetails.phone}
                onChange={e => setForm({...form, contactDetails: {...form.contactDetails, phone: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Instagram URL</label>
              <input 
                type="text" 
                value={form.socialLinks.instagram}
                onChange={e => setForm({...form, socialLinks: {...form.socialLinks, instagram: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">YouTube URL</label>
              <input 
                type="text" 
                value={form.socialLinks.youtube}
                onChange={e => setForm({...form, socialLinks: {...form.socialLinks, youtube: e.target.value}})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Additional Website Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(212,168,83,0.05)] border border-gold-start/20 p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-gold-start/10 pb-4">
            <Layout className="w-5 h-5 text-saffron-deep" />
            <h2 className="font-display text-xl font-bold text-[#5C1A1A]">About Us & Footer</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">About Us Content</label>
              <textarea 
                rows={4}
                value={form.aboutUs.content}
                onChange={e => setForm({...form, aboutUs: { content: e.target.value }})}
                className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Footer Copyright Text</label>
                <input 
                  type="text" 
                  value={form.footer.copyrightText}
                  onChange={e => setForm({...form, footer: { ...form.footer, copyrightText: e.target.value }})}
                  className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8B6F4E] mb-1.5">Footer Address</label>
                <input 
                  type="text" 
                  value={form.footer.address}
                  onChange={e => setForm({...form, footer: { ...form.footer, address: e.target.value }})}
                  className="w-full bg-white/50 border border-gold-start/30 rounded-xl px-4 py-2.5 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-saffron/40 focus:border-gold-start/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={actionLoading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#D4A853] via-[#E8850A] to-[#D4A853] bg-[length:200%_auto] text-white rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-[0_4px_15px_rgba(212,168,83,0.2)] hover:bg-[position:right_center] transition-all duration-500 disabled:opacity-50"
          >
            {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
