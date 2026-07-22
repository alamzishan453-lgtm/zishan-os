"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [websiteName, setWebsiteName] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [currentHeroImage, setCurrentHeroImage] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [currentLogo, setCurrentLogo] = useState("");

useEffect(() => {
    loadSettings();
  }, []);

 const loadSettings = async () => {
  const { data, error } = await supabase
    .from("website_settings")
    .select("*")
    .limit(1)
    .single();

  if (!error && data) {
    setWebsiteName(data.website_name || "");
    setHeroTitle(data.hero_title || "");
    setHeroDescription(data.hero_description || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setCurrentHeroImage(data.hero_image || "");
    setCurrentProfileImage(data.profile_image || "");
    setCurrentLogo(data.logo || "");
  }
};

const saveSettings = async () => {
  let imageUrl = currentHeroImage;

  if (heroImage) {
    const fileName = `hero-${Date.now()}-${heroImage.name}`;

    const { error: uploadError } = await supabase.storage
      .from("website")
      .upload(fileName, heroImage);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("website")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }
  let profileImageUrl = currentProfileImage;

if (profileImage) {
  const fileName = `profile-${Date.now()}-${profileImage.name}`;

  const { error: uploadError } = await supabase.storage
    .from("website")
    .upload(fileName, profileImage);

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("website")
    .getPublicUrl(fileName);

  profileImageUrl = data.publicUrl;
}
let logoUrl = currentLogo;

if (logoImage) {
  const fileName = `logo-${Date.now()}-${logoImage.name}`;

  const { error: uploadError } = await supabase.storage
    .from("website")
    .upload(fileName, logoImage);

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("website")
    .getPublicUrl(fileName);

  logoUrl = data.publicUrl;
}
  const { data: row } = await supabase
    .from("website_settings")
    .select("id")
    .limit(1)
    .single();

  if (row) {
    const { error } = await supabase
      .from("website_settings")
      .update({
        website_name: websiteName,
        hero_title: heroTitle,
        hero_description: heroDescription,
        email,
        phone,
        hero_image: imageUrl,
        profile_image: profileImageUrl,
        logo: logoUrl,
      })
      .eq("id", row.id);

    if (error) {
      alert(error.message);
      return;
    }
  } else {
    const { error } = await supabase
      .from("website_settings")
      .insert([
  {
    website_name: websiteName,
    hero_title: heroTitle,
    hero_description: heroDescription,
    email,
    phone,
    hero_image: imageUrl,
    profile_image: profileImageUrl,
    logo: logoUrl,
  },
]);

    if (error) {
      alert(error.message);
      return;
    }
  }

  alert("Settings Saved Successfully");
  loadSettings();
};

  return (
  <main className="min-h-screen bg-black text-white p-8">
    <h1 className="text-5xl font-bold text-red-500 text-center mb-10">
      Website Settings
    </h1>

    <div className="max-w-4xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-red-500">

      <input
        type="text"
        placeholder="Website Name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
      />

      <input
        type="text"
        placeholder="Hero Title"
        value={heroTitle}
        onChange={(e) => setHeroTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
      />

      <textarea
        placeholder="Hero Description"
        value={heroDescription}
        onChange={(e) => setHeroDescription(e.target.value)}
        className="w-full h-32 p-3 rounded-lg bg-black border border-gray-700 mb-5"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-6"
      />

      {/* Hero Background Image */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold">
          Hero Background Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setHeroImage(e.target.files[0]);
            }
          }}
          className="w-full p-3 rounded-lg bg-black border border-gray-700"
        />

        {currentHeroImage && (
          <img
            src={currentHeroImage}
            alt="Hero Preview"
            className="mt-4 rounded-xl border border-gray-700 w-full max-h-72 object-cover"
          />
        )}
      </div>

      {/* Profile Image */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold">
          Profile Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setProfileImage(e.target.files[0]);
            }
          }}
          className="w-full p-3 rounded-lg bg-black border border-gray-700"
        />

        {currentProfileImage && (
          <img
            src={currentProfileImage}
            alt="Profile Preview"
            className="mt-4 w-40 h-40 object-cover rounded-xl border border-gray-700"
          />
        )}
      </div>
    <div className="mb-6">
  <label className="block mb-2 text-lg font-semibold">
    Website Logo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setLogoImage(e.target.files[0]);
      }
    }}
    className="w-full p-3 rounded-lg bg-black border border-gray-700"
  />

  {currentLogo && (
    <img
      src={currentLogo}
      alt="Logo Preview"
      className="mt-4 w-24 h-24 object-contain rounded-lg border border-gray-700 bg-white p-2"
    />
  )}
</div>
      <button
        onClick={saveSettings}
        className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-xl font-bold"
      >
        Save Settings
      </button>

    </div>
  </main>
);
}