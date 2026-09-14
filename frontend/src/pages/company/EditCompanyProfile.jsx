import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecruiterLayout } from '../../components/layout/RecruiterLayout';
import { companyService } from '../../services/company.service';
import { Building2, Save, ArrowLeft, Upload, FileImage } from 'lucide-react';
import toast from 'react-hot-toast';

export const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    companyType: 'Product',
    website: '',
    description: '',
    foundedYear: 2020,
    officialEmail: '',
    phone: '',
    city: '',
    state: '',
    country: 'India',
    linkedin: '',
    twitter: '',
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const res = await companyService.getCompany();
      if (res && res.data) {
        const c = res.data;
        setFormData({
          name: c.name || '',
          industry: c.industry || '',
          companyType: c.companyType || 'Product',
          website: c.website || '',
          description: c.description || '',
          foundedYear: c.foundedYear || 2020,
          officialEmail: c.officialEmail || '',
          phone: c.phone || '',
          city: c.city || '',
          state: c.state || '',
          country: c.country || 'India',
          linkedin: c.linkedin || '',
          twitter: c.twitter || '',
        });
      } else {
        setIsNew(true);
      }
    } catch {
      setIsNew(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let res;
      if (isNew) {
        res = await companyService.createCompany(formData);
        toast.success(res.message || 'Company created successfully!');
      } else {
        res = await companyService.updateCompany(formData);
        toast.success(res.message || 'Company updated successfully!');
      }

      if (logoFile) {
        await handleLogoUpload();
      }

      navigate('/recruiter/company');
    } catch (err) {
      toast.error(err.message || 'Failed to save company profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return;
    setUploadingLogo(true);
    const data = new FormData();
    data.append('logo', logoFile);

    try {
      await companyService.uploadLogo(data);
      toast.success('Logo uploaded successfully');
    } catch (err) {
      toast.error(err.message || 'Logo upload failed');
    } finally {
      setUploadingLogo(false);
    }
  };

  if (loading) {
    return (
      <RecruiterLayout>
        <div className="flex justify-center items-center h-64 text-slate-400">
          <span className="animate-pulse font-medium text-sm">Loading Company Form...</span>
        </div>
      </RecruiterLayout>
    );
  }

  return (
    <RecruiterLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/recruiter/company')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Company Dashboard
          </button>
          <h1 className="text-xl font-bold text-slate-50 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-400" /> {isNew ? 'Create Company Profile' : 'Edit Company Details'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Company Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Acme Tech Solutions"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Industry</label>
                <input
                  type="text"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="Software / IT Services"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Company Type</label>
                <select
                  value={formData.companyType}
                  onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                >
                  <option value="Product">Product Company</option>
                  <option value="Service">Service Company</option>
                  <option value="Startup">Startup</option>
                  <option value="MNC">Multinational Corporation (MNC)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Official Website URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://acme.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Company Overview / Description</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your organization, mission, and products..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
              ></textarea>
            </div>
          </div>

          {/* Logo Upload Section */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <FileImage className="w-4 h-4" /> Company Logo Image
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="logo-file"
                accept="image/*"
                onChange={(e) => e.target.files && setLogoFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="logo-file"
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 cursor-pointer flex items-center gap-2 transition"
              >
                <Upload className="w-4 h-4" /> Select Logo File
              </label>
              <span className="text-xs text-slate-400">
                {logoFile ? logoFile.name : 'PNG, JPG, SVG up to 2MB'}
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Official Contact Email</label>
                <input
                  type="email"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  placeholder="contact@acme.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">City Location</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Bengaluru"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/recruiter/company')}
              className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingLogo}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-500/20 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : isNew ? 'Create Company' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </RecruiterLayout>
  );
};
