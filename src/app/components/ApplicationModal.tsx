import { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Campaign {
  id: string;
  title: string;
  brandName?: string;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
  brandLogo?: string;
  selectedCampaign?: Campaign;
  availableCampaigns?: Campaign[];
  mode: 'brand' | 'campaign';
}

type ApplicationStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ApplicationModal({
  isOpen,
  onClose,
  brandName,
  brandLogo,
  selectedCampaign,
  availableCampaigns = [],
  mode
}: ApplicationModalProps) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>(
    selectedCampaign ? [selectedCampaign.id] : []
  );
  const [proposedBudget, setProposedBudget] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleCampaignToggle = (campaignId: string) => {
    setSelectedCampaigns(prev => {
      if (prev.includes(campaignId)) {
        return prev.filter(id => id !== campaignId);
      } else {
        return [...prev, campaignId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (mode === 'brand' && selectedCampaigns.length === 0) {
      setErrorMessage('Please select at least one campaign');
      return;
    }

    if (!proposedBudget) {
      setErrorMessage('Please enter your proposed budget');
      return;
    }

    if (!resume) {
      setErrorMessage('Please upload your portfolio or resume');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Please add a message');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 90% success rate for demo
          Math.random() > 0.1 ? resolve(true) : reject(new Error('Failed to submit application'));
        }, 2000);
      });

      setStatus('success');

      // Auto-close after success message
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit application. Please try again.');
    }
  };

  const handleClose = () => {
    // Reset form
    setSelectedCampaigns(selectedCampaign ? [selectedCampaign.id] : []);
    setProposedBudget('');
    setResume(null);
    setMessage('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {status === 'success' ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">Application Submitted!</h3>
            <p className="text-[#6b7280] mb-4">
              Your {mode === 'brand' ? 'collaboration request' : 'campaign application'} has been successfully submitted.
            </p>
            <p className="text-sm text-[#6b7280]">
              The brand will review your application and get back to you soon.
            </p>
          </div>
        ) : status === 'error' ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#fee2e2] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-[#ef4444]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-2">Submission Failed</h3>
            <p className="text-[#6b7280] mb-6">{errorMessage}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-[#3b82f6] hover:bg-[#2563eb]"
                onClick={() => {
                  setStatus('idle');
                  setErrorMessage('');
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-[#111827]">
                  {mode === 'brand' ? 'Send Collaboration Request' : 'Apply to Campaign'}
                </DialogTitle>
                <button
                  onClick={handleClose}
                  className="text-[#6b7280] hover:text-[#111827] p-1 rounded-lg hover:bg-[#f3f4f6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <DialogDescription className="sr-only">
                {mode === 'brand'
                  ? 'Fill out the form to send a collaboration request to this brand'
                  : 'Fill out the form to apply to this campaign'
                }
              </DialogDescription>
            </DialogHeader>

            {/* Brand Info */}
            {brandName && brandLogo && (
              <div className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg">
                <img src={brandLogo} alt={brandName} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-sm text-[#6b7280]">
                    {mode === 'brand' ? 'Sending request to' : 'Applying to'}
                  </p>
                  <p className="font-semibold text-[#111827]">{brandName}</p>
                </div>
              </div>
            )}

            {/* Selected Campaign (for direct campaign application) */}
            {mode === 'campaign' && selectedCampaign && (
              <div className="p-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg">
                <p className="text-sm text-[#1e40af] font-medium mb-1">Campaign</p>
                <p className="font-semibold text-[#111827]">{selectedCampaign.title}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campaign Selection (for brand request) */}
              {mode === 'brand' && availableCampaigns.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Select Campaigns <span className="text-[#ef4444]">*</span>
                  </label>
                  <p className="text-sm text-[#6b7280] mb-3">
                    Choose one or more campaigns you'd like to collaborate on
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto p-1">
                    {availableCampaigns.map((campaign) => (
                      <label
                        key={campaign.id}
                        className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedCampaigns.includes(campaign.id)
                            ? 'border-[#3b82f6] bg-[#eff6ff]'
                            : 'border-[#d1d5db] hover:border-[#3b82f6] hover:bg-[#f9fafb]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCampaigns.includes(campaign.id)}
                          onChange={() => handleCampaignToggle(campaign.id)}
                          className="mt-1 w-4 h-4 text-[#3b82f6] border-[#d1d5db] rounded focus:ring-[#3b82f6]"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#111827]">{campaign.title}</p>
                          {campaign.brandName && (
                            <p className="text-sm text-[#6b7280]">by {campaign.brandName}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  {selectedCampaigns.length > 0 && (
                    <p className="text-sm text-[#10b981] mt-2">
                      {selectedCampaigns.length} campaign{selectedCampaigns.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>
              )}

              {/* Proposed Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-[#111827] mb-2">
                  Proposed Budget <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280]">
                    $
                  </span>
                  <input
                    id="budget"
                    type="text"
                    placeholder="1,000 - 2,500"
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
                <p className="text-sm text-[#6b7280] mt-1">
                  Enter your proposed rate or budget range
                </p>
              </div>

              {/* Portfolio/Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Portfolio or Resume <span className="text-[#ef4444]">*</span>
                </label>
                <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-6 text-center hover:border-[#3b82f6] transition-colors">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-[#6b7280] mx-auto mb-2" />
                    {resume ? (
                      <div>
                        <p className="font-medium text-[#111827]">{resume.name}</p>
                        <p className="text-sm text-[#10b981] mt-1">File uploaded successfully</p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setResume(null);
                          }}
                          className="text-sm text-[#3b82f6] hover:underline mt-2"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-[#111827]">Click to upload</p>
                        <p className="text-sm text-[#6b7280] mt-1">
                          PDF, DOC, DOCX or TXT (Max. 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#111827] mb-2">
                  Message or Note <span className="text-[#ef4444]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell the brand why you're interested and what makes you a great fit..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                />
                <p className="text-sm text-[#6b7280] mt-1">
                  {message.length}/500 characters
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && status === 'idle' && (
                <div className="p-3 bg-[#fee2e2] border border-[#fecaca] rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#dc2626]">{errorMessage}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={status === 'submitting'}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={status === 'submitting'}
                  className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb]"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {mode === 'brand' ? 'Send Request' : 'Submit Application'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
