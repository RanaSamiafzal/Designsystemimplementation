import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, DollarSign, Users, Target, Clock, CheckCircle2, Building2, Send, Heart, AlertCircle, TrendingUp, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ApplicationModal } from '../../components/ApplicationModal';

interface CampaignDetail {
  id: string;
  title: string;
  brandName: string;
  brandId: string;
  brandLogo: string;
  status: 'active' | 'upcoming';
  budget: string;
  startDate: string;
  endDate: string;
  description: string;
  longDescription: string;
  requirements: string[];
  deliverables: string[];
  category: string;
  tags: string[];
  applicants: number;
  platforms: string[];
  contentType: string[];
  targetAudience: string;
  campaignGoals: string[];
}

// Mock campaign details data
const campaignDetails: { [key: string]: CampaignDetail } = {
  '1': {
    id: '1',
    title: 'Summer Fashion Collection 2026',
    brandName: 'FashionHub',
    brandId: '1',
    brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    status: 'active',
    budget: '$800-$1,200',
    startDate: '2026-04-15',
    endDate: '2026-07-31',
    description: 'Promote our new summer collection through Instagram posts and stories',
    longDescription: 'We\'re launching our Summer 2026 collection and looking for fashion influencers to showcase the versatility and style of our new pieces. This campaign focuses on authentic styling that resonates with your audience while highlighting the quality and design of our summer line. We want to see how you incorporate our pieces into your everyday wardrobe and special occasions.',
    requirements: [
      'Minimum 10,000 Instagram followers',
      'Fashion or lifestyle content niche',
      'Engagement rate of at least 3%',
      'Previous brand collaboration experience preferred',
      'Based in the United States'
    ],
    deliverables: [
      '3 Instagram feed posts featuring different outfits',
      '5 Instagram stories throughout the campaign period',
      'Product styling and photography',
      'Authentic caption highlighting your favorite pieces',
      'Usage of campaign hashtags'
    ],
    category: 'Fashion',
    tags: ['Summer', 'Fashion', 'Instagram', 'Lifestyle'],
    applicants: 24,
    platforms: ['Instagram'],
    contentType: ['Photos', 'Stories', 'Reels'],
    targetAudience: 'Women aged 18-35 interested in fashion and lifestyle',
    campaignGoals: [
      'Increase brand awareness for summer collection',
      'Drive traffic to online store',
      'Generate authentic user-generated content',
      'Boost social media engagement'
    ]
  },
  '2': {
    id: '2',
    title: 'Smart Watch Product Launch',
    brandName: 'TechGear Pro',
    brandId: '2',
    brandLogo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    status: 'active',
    budget: '$1,500-$2,000',
    startDate: '2026-04-01',
    endDate: '2026-05-15',
    description: 'Review and showcase our latest smartwatch with advanced features',
    longDescription: 'TechGear Pro is excited to launch our newest smartwatch with cutting-edge health tracking features. We\'re seeking tech reviewers and content creators to provide comprehensive, honest reviews of the device. This is an opportunity to be among the first to test and showcase innovative technology that will set new standards in the wearable tech industry.',
    requirements: [
      'Active YouTube channel with 50K+ subscribers',
      'Tech review or gadget content niche',
      'Previous experience reviewing wearable technology',
      'Professional video production quality',
      'Ability to provide detailed technical analysis'
    ],
    deliverables: [
      'Unboxing video (8-12 minutes)',
      'Comprehensive review video (15-20 minutes)',
      'Real-world testing over 2 weeks',
      '2 Instagram posts showcasing key features',
      'Comparison with competitor products (optional but preferred)'
    ],
    category: 'Technology',
    tags: ['Tech', 'Gadgets', 'Review', 'Smartwatch'],
    applicants: 18,
    platforms: ['YouTube', 'Instagram'],
    contentType: ['Videos', 'Photos'],
    targetAudience: 'Tech enthusiasts and fitness-conscious consumers aged 25-45',
    campaignGoals: [
      'Generate pre-launch buzz and excitement',
      'Demonstrate product features and capabilities',
      'Build credibility through authentic reviews',
      'Drive pre-orders and early sales'
    ]
  },
  '3': {
    id: '3',
    title: 'Wellness Challenge - 30 Days',
    brandName: 'WellnessLife',
    brandId: '3',
    brandLogo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
    status: 'upcoming',
    budget: '$600-$900',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    description: 'Join our 30-day wellness challenge and share your journey',
    longDescription: 'Be part of our transformative 30-day wellness challenge designed to inspire your audience to embrace healthier lifestyle choices. We\'ll provide you with our wellness products and a structured challenge plan to share with your community. Document your journey and motivate others to join the movement toward better health and wellness.',
    requirements: [
      'Health, fitness, or wellness content focus',
      'Minimum 5,000 followers on Instagram',
      'Daily social media activity',
      'Authentic connection with wellness lifestyle',
      'Willingness to commit to full 30-day period'
    ],
    deliverables: [
      'Daily Instagram stories documenting progress',
      '4 Instagram feed posts (weekly)',
      'Honest testimonial about products and experience',
      'Engagement with community comments and questions',
      'Before and after content'
    ],
    category: 'Health & Wellness',
    tags: ['Wellness', 'Challenge', 'Fitness', 'Health'],
    applicants: 32,
    platforms: ['Instagram', 'TikTok'],
    contentType: ['Stories', 'Posts', 'Videos'],
    targetAudience: 'Health-conscious individuals aged 25-50',
    campaignGoals: [
      'Build community around wellness lifestyle',
      'Showcase product effectiveness through real results',
      'Create shareable motivational content',
      'Increase brand loyalty and repeat customers'
    ]
  }
};

export function CampaignDetailsPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const campaign = campaignId ? campaignDetails[campaignId] : null;

  if (!campaign) {
    return (
      <DashboardLayout
        userRole="influencer"
        userName="Sarah Johnson"
        notificationCount={8}
        onLogout={() => navigate('/login')}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[#111827] mb-4">Campaign Not Found</h2>
          <p className="text-[#6b7280] mb-6">The campaign you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/influencer/search-brands')}>
            Back to Search
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const daysRemaining = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Johnson"
      notificationCount={8}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/influencer/search-brands')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        {/* Campaign Header */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Brand Logo */}
            <img
              src={campaign.brandLogo}
              alt={campaign.brandName}
              className="w-20 h-20 rounded-xl object-cover"
            />

            {/* Campaign Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={campaign.status === 'active' ? 'default' : 'outline'}
                      className={campaign.status === 'active' ? 'bg-[#10b981]' : ''}
                    >
                      {campaign.status === 'active' ? 'Active' : 'Upcoming'}
                    </Badge>
                    <Badge variant="outline">{campaign.category}</Badge>
                    {daysRemaining <= 7 && campaign.status === 'active' && (
                      <Badge variant="default" className="bg-[#ef4444]">
                        <Clock className="w-3 h-3 mr-1" />
                        Ending Soon
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2">{campaign.title}</h1>
                  <div className="flex items-center gap-2 text-[#6b7280] mb-3">
                    <Building2 className="w-4 h-4" />
                    <span>by</span>
                    <button
                      onClick={() => navigate(`/influencer/brands/${campaign.brandId}`)}
                      className="font-medium text-[#3b82f6] hover:underline"
                    >
                      {campaign.brandName}
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                  className={isSaved ? 'border-[#ef4444] text-[#ef4444]' : ''}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>

              <p className="text-[#6b7280] mb-4">{campaign.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {campaign.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#fef3c7] rounded-lg">
                <DollarSign className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Budget</p>
                <p className="font-bold text-[#111827]">{campaign.budget}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#dbeafe] rounded-lg">
                <Calendar className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Duration</p>
                <p className="font-bold text-[#111827]">{daysRemaining} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#e0e7ff] rounded-lg">
                <Users className="w-5 h-5 text-[#6366f1]" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Applicants</p>
                <p className="font-bold text-[#111827]">{campaign.applicants}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#d1fae5] rounded-lg">
                <Target className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Platforms</p>
                <p className="font-bold text-[#111827]">{campaign.platforms.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Section */}
        {campaign.status === 'active' && (
          <Alert className="border-[#3b82f6] bg-[#eff6ff]">
            <AlertCircle className="h-4 w-4 text-[#3b82f6]" />
            <AlertDescription className="text-[#1e40af]">
              This campaign is actively accepting applications. Apply now to be considered!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Campaign Description */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">About This Campaign</h3>
              <p className="text-[#6b7280] leading-relaxed">{campaign.longDescription}</p>
            </Card>

            {/* Campaign Goals */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3b82f6]" />
                Campaign Goals
              </h3>
              <ul className="space-y-3">
                {campaign.campaignGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#6b7280]">
                    <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Requirements</h3>
              <ul className="space-y-3">
                {campaign.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#6b7280]">
                    <div className="w-6 h-6 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-[#3b82f6]">{idx + 1}</span>
                    </div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Deliverables */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f59e0b]" />
                Expected Deliverables
              </h3>
              <ul className="space-y-3">
                {campaign.deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#6b7280]">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Ready to Apply?</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">Campaign Status</span>
                  <Badge
                    variant={campaign.status === 'active' ? 'default' : 'outline'}
                    className={campaign.status === 'active' ? 'bg-[#10b981]' : ''}
                  >
                    {campaign.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">Starts</span>
                  <span className="font-medium text-[#111827]">{campaign.startDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">Ends</span>
                  <span className="font-medium text-[#111827]">{campaign.endDate}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb]"
                  onClick={() => setIsApplicationModalOpen(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Apply to Campaign
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/influencer/brands/${campaign.brandId}`)}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  View Brand Profile
                </Button>
              </div>
            </Card>

            {/* Campaign Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Campaign Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6b7280] mb-2">Platforms</p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform) => (
                      <Badge key={platform} variant="outline">{platform}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] mb-2">Content Type</p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.contentType.map((type) => (
                      <Badge key={type} variant="outline">{type}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#6b7280] mb-2">Target Audience</p>
                  <p className="text-sm text-[#111827]">{campaign.targetAudience}</p>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Campaign Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b7280]">Total Applicants</span>
                  <span className="font-bold text-[#111827]">{campaign.applicants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6b7280]">Competition Level</span>
                  <Badge variant={campaign.applicants > 30 ? 'default' : 'outline'} className={campaign.applicants > 30 ? 'bg-[#ef4444]' : ''}>
                    {campaign.applicants > 30 ? 'High' : campaign.applicants > 15 ? 'Medium' : 'Low'}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        brandName={campaign?.brandName}
        brandLogo={campaign?.brandLogo}
        selectedCampaign={campaign ? { id: campaign.id, title: campaign.title, brandName: campaign.brandName } : undefined}
        mode="campaign"
      />
    </DashboardLayout>
  );
}
