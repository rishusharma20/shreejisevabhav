"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, Globe, Layout, MessageSquare } from "lucide-react";

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/website-settings`, {
        credentials: "include"
      });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/admin/website-settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Website Settings</h1>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Globe className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800">General Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website Name</label>
              <input 
                type="text" 
                value={form.websiteName}
                onChange={e => setForm({...form, websiteName: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website Description (SEO)</label>
              <textarea 
                rows={3}
                value={form.websiteDescription}
                onChange={e => setForm({...form, websiteDescription: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Layout className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800">Hero Section</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
              <input 
                type="text" 
                value={form.heroSection.heading}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, heading: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
              <textarea 
                rows={2}
                value={form.heroSection.subheading}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, subheading: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input 
                type="text" 
                value={form.heroSection.buttonText}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, buttonText: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
              <input 
                type="text" 
                value={form.heroSection.buttonLink}
                onChange={e => setForm({...form, heroSection: {...form.heroSection, buttonLink: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800">Contact Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input 
                type="email" 
                value={form.contactDetails.email}
                onChange={e => setForm({...form, contactDetails: {...form.contactDetails, email: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
              <input 
                type="text" 
                value={form.contactDetails.phone}
                onChange={e => setForm({...form, contactDetails: {...form.contactDetails, phone: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input 
                type="text" 
                value={form.socialLinks.instagram}
                onChange={e => setForm({...form, socialLinks: {...form.socialLinks, instagram: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input 
                type="text" 
                value={form.socialLinks.youtube}
                onChange={e => setForm({...form, socialLinks: {...form.socialLinks, youtube: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Website Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Layout className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800">About Us & Footer</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Us Content</label>
              <textarea 
                rows={4}
                value={form.aboutUs.content}
                onChange={e => setForm({...form, aboutUs: { content: e.target.value }})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Copyright Text</label>
                <input 
                  type="text" 
                  value={form.footer.copyrightText}
                  onChange={e => setForm({...form, footer: { ...form.footer, copyrightText: e.target.value }})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Address</label>
                <input 
                  type="text" 
                  value={form.footer.address}
                  onChange={e => setForm({...form, footer: { ...form.footer, address: e.target.value }})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={actionLoading}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {actionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
