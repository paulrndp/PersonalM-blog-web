import { getAccountProfile, updateAccountProfile } from "@/actions/account";
import { requireAuth } from "@/lib/auth";
import { User, Save, Lock, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminAccountPage() {
  await requireAuth();
  const profile = await getAccountProfile();

  async function handleUpdateProfile(formData: FormData) {
    "use server";
    await updateAccountProfile(formData);
    redirect("/admin/account?updated=true");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-serif font-bold text-stone-900">
          Author Profile
        </h1>
        <p className="text-stone-500 text-xs mt-1">
          Manage your personal details, bio, login credentials, and public avatar.
        </p>
      </div>

      <form action={handleUpdateProfile} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-stone-100">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-stone-200 border-2 border-amber-800/30 shrink-0">
              <img
                src="/api/account/avatar"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-semibold text-stone-700 block">
                Update Profile Photo
              </label>
              <input
                type="file"
                name="profile"
                accept="image/*"
                className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
              />
              <p className="text-[11px] text-stone-400">
                Displayed in the hero banner and on the public author about section.
              </p>
            </div>
          </div>

          {/* Name & Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                required
                defaultValue={profile?.firstname || ""}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                required
                defaultValue={profile?.lastname || ""}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                defaultValue={profile?.username || ""}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Change Password (optional)
              </label>
              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep current"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
              />
            </div>
          </div>

          {/* Bio / Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 block">
              Bio / About Me Description
            </label>
            <textarea
              name="desc"
              rows={4}
              defaultValue={profile?.desc || ""}
              placeholder="Introduce yourself to your readers..."
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800"
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-stone-900 hover:bg-amber-900 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Save Profile Settings
          </button>
        </div>
      </form>
    </div>
  );
}
