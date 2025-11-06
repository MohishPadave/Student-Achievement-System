import { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const InternshipForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState(
    initialData || {
      company_name: '',
      internship_role: '',
      department: '',
      start_date: '',
      end_date: '',
      ongoing: false,
      stipend: '',
      external_mentor: '',
      internal_mentor: '',
      proof: null,
      no_certificate_yet: false,
    }
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFormData({
        ...formData,
        [name]: file,
        no_certificate_yet: false,
      });
    } else if (type === 'checkbox') {
      const isNoCertCheckbox = name === 'no_certificate_yet';
      setFormData({
        ...formData,
        [name]: checked,
        ...(isNoCertCheckbox && checked ? { proof: null } : {}),
        ...(name === 'ongoing' ? { end_date: checked ? '' : formData.end_date } : {}),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (e.dataTransfer.items?.length > 0) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    dragCounter.current = 0;
    const file = e.dataTransfer.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    setFormData({
      ...formData,
      proof: file,
      no_certificate_yet: false,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClickUpload = () => {
    if (!formData.no_certificate_yet && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      if (end < start) {
        toast.error('End date cannot be before start date.');
        return;
      }
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-2xl border border-slate-200 p-6">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              Company Name / Organization <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-1">e.g., TCS, Infosys, Google</p>
            <input
              type="text"
              name="company_name"
              required
              value={formData.company_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company Name"
            />
          </div>

          {/* Internship Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              Internship Role <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-1">e.g., Frontend Developer</p>
            <input
              type="text"
              name="internship_role"
              required
              value={formData.internship_role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Internship Role"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              Department <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-1">e.g., IT, R&D</p>
            <input
              type="text"
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Department"
            />
          </div>

          {/* Stipend */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stipend (Optional)</label>
            <p className="text-xs text-gray-400 mb-1">e.g., ₹5000/month</p>
            <input
              type="text"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Stipend"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date <span className="text-red-600">*</span></label>
            <p className="text-xs text-gray-400 mb-1">When the internship started</p>
            <input
              type="date"
              name="start_date"
              required
              value={formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                name="ongoing"
                checked={formData.ongoing}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-xs text-gray-600">Ongoing internship</span>
            </div>
            <input
              type="date"
              name="end_date"
              disabled={formData.ongoing}
              value={formData.end_date ? new Date(formData.end_date).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              min={formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : undefined}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${formData.ongoing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
          </div>

          {/* External Mentor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">External Mentor & Designation <span className="text-red-600">*</span></label>
            <p className="text-xs text-gray-400 mb-1">e.g., Mr. Sharma, Senior Developer</p>
            <input
              type="text"
              name="external_mentor"
              required
              value={formData.external_mentor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="External Mentor"
            />
          </div>

          {/* Internal Mentor */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Internal Mentor & Designation <span className="text-red-600">*</span></label>
            <p className="text-xs text-gray-400 mb-1">e.g., Prof. A. Patel, Assistant Professor</p>
            <input
              type="text"
              name="internal_mentor"
              required
              value={formData.internal_mentor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Internal Mentor"
            />
          </div>

          {/* Certificate Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" /> Certificate Upload (Optional)
            </label>
            <div className="mt-2 pb-2 flex items-center">
              <input
                type="checkbox"
                name="no_certificate_yet"
                checked={formData.no_certificate_yet}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-xs text-gray-600">I haven't received my certificate yet</span>
            </div>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? 'border-blue-400 bg-blue-50' : formData.no_certificate_yet ? 'border-gray-300 bg-gray-100 opacity-70' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}
              onClick={handleClickUpload}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                name="proof"
                ref={fileInputRef}
                accept="application/pdf,image/*"
                onChange={handleChange}
                className="hidden"
                disabled={formData.no_certificate_yet}
              />
              {formData.proof ? (
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mb-2" />
                  <p className="font-semibold">{formData.proof.name}</p>
                  <p className="text-xs text-gray-400">Click or drag to replace</p>
                </div>
              ) : formData.no_certificate_yet ? (
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="font-semibold">Certificate will be submitted later</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="font-semibold">{isDragging ? 'Drop your certificate here' : 'Drag & drop or click to upload'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-6 flex justify-center">
          <button
            type="submit"
            disabled={loading || (!formData.proof && !formData.no_certificate_yet)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {initialData?._id ? 'Update Internship' : 'Add Internship'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternshipForm;
