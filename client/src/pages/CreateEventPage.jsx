import React from 'react';
import {
  Calendar,
  MapPin,
  Users,
  UploadCloud,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
function CreateEventPage() {
  const bannerRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    capacity: null,
    location: '',
  });
  const [banner , setBanner] = useState(null) ;
  //   {current : null}
//   console.log(bannerRef);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };
  console.log(banner); //media files
  console.log(formData) //text isme chala gaya :
 
  const handleSubmit = async (e) =>
  {
    e.preventDefault() ;
    const formmData = new FormData();
    //formmData as a payload jaiga jisme media + text hoga
    //   media + text
    formmData.append("title" , formData.title)
    formmData.append("description" , formData.description)
    formmData.append("location" , formData.location)
    formmData.append("capacity" , formData.capacity)
    formmData.append("date" , formData.date)
    formmData.append("category" , formData.category)
    formmData.append("bannerUrl" , banner);
 
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/events`, formmData , {
        headers : {
        "Content-Type" : "multipart/form-data",
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
    });
    console.log(res)
 
  }
 
  return (
    <div className="min-h-[90vh] bg-[radial-gradient(circle_at_center,_#1f2124_0%,_#131517_100%)] text-white font-sans flex flex-col justify-between selection:bg-white selection:text-black">
      <main className="flex-1 flex items-center justify-center p-4 my-8 md:my-12">
        {/* Spacious Glassmorphic Card */}
        <div className="w-full max-w-[680px] bg-white/[0.02] border border-white/[0.08] shadow-[0_24px_48px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
          {/* Top glowing ambient gold effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-[#f2ca77]/30 to-transparent"></div>
 
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-[#f2ca77]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Create New Event
                </h1>
                <p className="text-xs text-white/50">
                  Host a new experience and connect with your audience
                </p>
              </div>
            </div>
 
            <div className="h-[1px] bg-white/[0.06] my-6"></div>
 
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Banner Upload */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block">
                  Event Banner Image
                </label>
                <div
                  onClick={() => bannerRef.current.click()}
                  className="group relative w-full h-48 rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.08] transition-all">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium">
                        Click to upload event banner
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        Supports PNG, JPG or WEBP (Max 5MB)
                      </p>
                    </div>
                  </div>
                  <input
                  onChange={(e)=>setBanner(e.target.files[0])}
                    ref={bannerRef}
                    type="file"
                    name="bannerUrl"
                    accept="image/*"
                    // className="hidden"
                  />
                </div>
              </div>
 
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block">
                  Event Title
                </label>
                <input
                  onChange={handleChange}
                  required
                  type="text"
                  name="title"
                  placeholder="Give your event a clear, descriptive name"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                />
              </div>
 
              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block">
                  Description
                </label>
                <textarea
                  required
                  onChange={handleChange}
                  name="description"
                  rows="4"
                  placeholder="Provide details about your event, what to expect, and any pre-requisites..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 resize-none"
                />
              </div>
 
              {/* Two-Column Grid for other fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleChange}
                      required
                      name="category"
                      className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#131517] text-white/30"
                      >
                        Select category
                      </option>
                      <option
                        value="Technology"
                        className="bg-[#131517] text-white"
                      >
                        Technology
                      </option>
                      <option
                        value="Social"
                        className="bg-[#131517] text-white"
                      >
                        Social
                      </option>
                      <option
                        value="Workshop"
                        className="bg-[#131517] text-white"
                      >
                        Workshop
                      </option>
                      <option
                        value="Entertainment"
                        className="bg-[#131517] text-white"
                      >
                        Entertainment
                      </option>
                      <option
                        value="Sports"
                        className="bg-[#131517] text-white"
                      >
                        Sports
                      </option>
                      <option value="Art" className="bg-[#131517] text-white">
                        Art
                      </option>
                      <option value="Other" className="bg-[#131517] text-white">
                        Other
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
 
                {/* Capacity */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-white/40" /> Capacity
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="number"
                    name="capacity"
                    min="1"
                    placeholder="e.g. 50"
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>
 
                {/* Date & Time */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/40" /> Date &
                    Time
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="datetime-local"
                    name="date"
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 [color-scheme:dark]"
                  />
                </div>
 
                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-white/50 block flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/40" /> Location
                  </label>
                  <input
                    onChange={handleChange}
                    required
                    type="text"
                    name="location"
                    placeholder="Venue address or virtual meeting link"
                    className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>
              </div>
 
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold text-sm py-3.5 px-4 rounded-xl hover:bg-white/95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
              >
                Create Event
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
 
export default CreateEventPage;
 
 