import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Users, Star, Globe, Instagram, Facebook, Twitter, DollarSign, Calendar, Target, Send, Heart, TrendingUp, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DashboardLayout } from '../../components/DashboardLayout';
import { ApplicationModal } from '../../components/ApplicationModal';

interface BrandProfile {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  industry: string;
  location: string;
  description: string;
  longDescription: string;
  website: string;
  followers: string;
  rating: number;
  reviews: number;
  verified: boolean;
  tags: string[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  stats: {
    totalCampaigns: number;
    activeCampaigns: number;
    completedCollaborations: number;
    avgBudget: string;
  };
}

interface Campaign {
  id: string;
  title: string;
  status: 'active' | 'upcoming';
  budget: string;
  startDate: string;
  endDate: string;
  description: string;
  requirements: string[];
  category: string;
  applicants: number;
}

// Mock data
const brandProfiles: { [key: string]: BrandProfile } = {
  '1': {
    id: '1',
    name: 'FashionHub',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
    industry: 'Fashion & Lifestyle',
    location: 'New York, NY',
    description: 'Leading fashion brand looking for lifestyle influencers',
    longDescription: 'FashionHub is a premier fashion brand dedicated to bringing the latest trends and timeless classics to fashion enthusiasts worldwide. With a focus on quality, sustainability, and style, we collaborate with influencers who share our passion for fashion and authentic storytelling. Our campaigns are designed to showcase real people wearing real fashion, creating genuine connections with audiences.',
    website: 'https://fashionhub.example.com',
    followers: '2.5M',
    rating: 4.8,
    reviews: 342,
    verified: true,
    tags: ['Fashion', 'Lifestyle', 'Clothing', 'Sustainable'],
    socialMedia: {
      instagram: '@fashionhub',
      facebook: 'FashionHubOfficial',
      twitter: '@fashionhub'
    },
    stats: {
      totalCampaigns: 48,
      activeCampaigns: 5,
      completedCollaborations: 156,
      avgBudget: '$500-$1,000'
    }
  },
  '2': {
    id: '2',
    name: 'TechGear Pro',
    logo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop',
    industry: 'Technology',
    location: 'San Francisco, CA',
    description: 'Tech company seeking reviewers and tech enthusiasts',
    longDescription: 'TechGear Pro is at the forefront of consumer technology, creating innovative gadgets and accessories that enhance digital lifestyles. We partner with tech reviewers and content creators who can showcase our products\' capabilities through detailed reviews, tutorials, and real-world testing. Our influencer partnerships focus on honest, comprehensive reviews that help consumers make informed decisions.',
    website: 'https://techgearpro.example.com',
    followers: '1.8M',
    rating: 4.9,
    reviews: 428,
    verified: true,
    tags: ['Technology', 'Gadgets', 'Reviews', 'Innovation'],
    socialMedia: {
      instagram: '@techgearpro',
      twitter: '@techgearpro'
    },
    stats: {
      totalCampaigns: 62,
      activeCampaigns: 8,
      completedCollaborations: 203,
      avgBudget: '$1,000-$2,500'
    }
  }
};

const activeCampaigns: { [key: string]: Campaign[] } = {
  '1': [
    {
      id: '1',
      title: 'Summer Fashion Collection 2026',
      status: 'active',
      budget: '$800-$1,200',
      startDate: '2026-04-15',
      endDate: '2026-07-31',
      description: 'Promote our new summer collection through Instagram posts and stories. Showcase versatile pieces that can be styled for different occasions.',
      requirements: ['10K+ followers', 'Fashion niche', '3 posts + 5 stories', 'Instagram focus'],
      category: 'Fashion',
      applicants: 24
    },
    {
      id: '7',
      title: 'Sustainable Fashion Initiative',
      status: 'active',
      budget: '$600-$900',
      startDate: '2026-04-20',
      endDate: '2026-06-30',
      description: 'Highlight our eco-friendly clothing line and sustainable fashion practices.',
      requirements: ['Sustainability advocate', '5K+ followers', '2 posts + 3 stories'],
      category: 'Sustainability',
      applicants: 18
    },
    {
      id: '8',
      title: 'Fall Preview Campaign',
      status: 'upcoming',
      budget: '$700-$1,100',
      startDate: '2026-08-01',
      endDate: '2026-09-30',
      description: 'Early access to our fall collection with exclusive preview content.',
      requirements: ['Fashion blogger', 'YouTube or TikTok', '1 video + 2 posts'],
      category: 'Fashion',
      applicants: 12
    }
  ],
  '2': [
    {
      id: '2',
      title: 'Smart Watch Product Launch',
      status: 'active',
      budget: '$1,500-$2,000',
      startDate: '2026-04-01',
      endDate: '2026-05-15',
      description: 'Review and showcase our latest smartwatch with advanced health tracking features.',
      requirements: ['Tech reviewer', 'YouTube channel', 'Unboxing + review video', '50K+ subscribers'],
      category: 'Technology',
      applicants: 18
    },
    {
      id: '9',
      title: 'Wireless Earbuds Campaign',
      status: 'active',
      budget: '$1,200-$1,800',
      startDate: '2026-04-10',
      endDate: '2026-06-10',
      description: 'Comprehensive review of our noise-cancelling wireless earbuds.',
      requirements: ['Tech reviewer', 'Audio enthusiast', 'Video review required'],
      category: 'Audio',
      applicants: 22
    }
  ]
};

export function BrandProfilePage() {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'campaigns'>('about');
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [applicationMode, setApplicationMode] = useState<'brand' | 'campaign'>('campaign');

  const brand = brandId ? brandProfiles[brandId] : null;
  const campaigns = brandId ? activeCampaigns[brandId] || [] : [];

  const handleBrandRequest = () => {
    setApplicationMode('brand');
    setSelectedCampaign(null);
    setIsApplicationModalOpen(true);
  };

  const handleCampaignApply = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setApplicationMode('campaign');
    setIsApplicationModalOpen(true);
  };

  if (!brand) {
    return (
      <DashboardLayout
        userRole="influencer"
        userName="Sarah Johnson"
        notificationCount={8}
        onLogout={() => navigate('/login')}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[#111827] mb-4">Brand Not Found</h2>
          <p className="text-[#6b7280] mb-6">The brand you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/influencer/search-brands')}>
            Back to Search
          </Button>
        </div>
      </DashboardLayout>
    );
  }

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

        {/* Cover Image */}
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
          <img
            src={brand.coverImage}
            alt={brand.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Brand Header */}
        <div className="relative -mt-20 px-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Brand Logo */}
              <div className="relative">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                />
                {brand.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-[#3b82f6] text-white p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Brand Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">{brand.name}</h1>
                      {brand.verified && (
                        <Badge variant="default" className="bg-[#3b82f6]">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#6b7280] mb-3">{brand.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <MapPin className="w-4 h-4" />
                        {brand.location}
                      </div>
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <Users className="w-4 h-4" />
                        {brand.followers} followers
                      </div>
                      <div className="flex items-center gap-2 text-[#f59e0b]">
                        <Star className="w-4 h-4 fill-current" />
                        {brand.rating} ({brand.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSaved(!isSaved)}
                      className={isSaved ? 'border-[#ef4444] text-[#ef4444]' : ''}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#3b82f6] hover:bg-[#2563eb]"
                      onClick={handleBrandRequest}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Request
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {brand.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#dbeafe] rounded-lg">
                <Target className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{brand.stats.activeCampaigns}</p>
                <p className="text-sm text-[#6b7280]">Active Campaigns</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#d1fae5] rounded-lg">
                <Award className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{brand.stats.completedCollaborations}</p>
                <p className="text-sm text-[#6b7280]">Collaborations</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#fef3c7] rounded-lg">
                <DollarSign className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#111827]">{brand.stats.avgBudget}</p>
                <p className="text-sm text-[#6b7280]">Avg. Budget</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#e0e7ff] rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#6366f1]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#111827]">{brand.stats.totalCampaigns}</p>
                <p className="text-sm text-[#6b7280]">Total Campaigns</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'about' | 'campaigns')}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="about">About Brand</TabsTrigger>
            <TabsTrigger value="campaigns">
              Active Campaigns ({campaigns.length})
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">About {brand.name}</h3>
                  <p className="text-[#6b7280] leading-relaxed">{brand.longDescription}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">What We Look For</h3>
                  <ul className="space-y-3 text-[#6b7280]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>Authentic content creators who align with our brand values</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>Engaged audiences in the {brand.industry.toLowerCase()} space</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>Creative storytelling through various content formats</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>Professional communication and timely deliverables</span>
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[#6b7280]">
                      <Globe className="w-5 h-5" />
                      <a href={brand.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6]">
                        Visit Website
                      </a>
                    </div>
                    {brand.socialMedia.instagram && (
                      <div className="flex items-center gap-3 text-[#6b7280]">
                        <Instagram className="w-5 h-5" />
                        <span>{brand.socialMedia.instagram}</span>
                      </div>
                    )}
                    {brand.socialMedia.facebook && (
                      <div className="flex items-center gap-3 text-[#6b7280]">
                        <Facebook className="w-5 h-5" />
                        <span>{brand.socialMedia.facebook}</span>
                      </div>
                    )}
                    {brand.socialMedia.twitter && (
                      <div className="flex items-center gap-3 text-[#6b7280]">
                        <Twitter className="w-5 h-5" />
                        <span>{brand.socialMedia.twitter}</span>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">Industry</h3>
                  <Badge variant="default" className="bg-[#3b82f6]">{brand.industry}</Badge>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="mt-6">
            <div className="space-y-4">
              {campaigns.length === 0 ? (
                <Card className="p-12 text-center">
                  <Target className="w-12 h-12 text-[#9ca3af] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#111827] mb-2">No Active Campaigns</h3>
                  <p className="text-[#6b7280]">This brand doesn't have any active campaigns at the moment.</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <Badge
                          variant={campaign.status === 'active' ? 'default' : 'outline'}
                          className={campaign.status === 'active' ? 'bg-[#10b981]' : ''}
                        >
                          {campaign.status === 'active' ? 'Active' : 'Upcoming'}
                        </Badge>
                        <Badge variant="outline">{campaign.category}</Badge>
                      </div>

                      <h3 className="text-lg font-semibold text-[#111827] mb-2">{campaign.title}</h3>
                      <p className="text-sm text-[#6b7280] mb-4">{campaign.description}</p>

                      {/* Campaign Details */}
                      <div className="space-y-2 text-sm mb-4 bg-[#f9fafb] p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6b7280] flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Budget
                          </span>
                          <span className="font-medium text-[#111827]">{campaign.budget}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6b7280] flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Duration
                          </span>
                          <span className="font-medium text-[#111827] text-xs">{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6b7280] flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Applicants
                          </span>
                          <span className="font-medium text-[#111827]">{campaign.applicants} applied</span>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-[#111827] mb-2">Requirements:</p>
                        <ul className="text-sm text-[#6b7280] space-y-1">
                          {campaign.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#3b82f6] mt-1">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/influencer/campaigns/${campaign.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb]"
                          onClick={() => handleCampaignApply(campaign)}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Apply Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedCampaign(null);
        }}
        brandName={brand?.name}
        brandLogo={brand?.logo}
        selectedCampaign={selectedCampaign ? { id: selectedCampaign.id, title: selectedCampaign.title } : undefined}
        availableCampaigns={campaigns.map(c => ({ id: c.id, title: c.title }))}
        mode={applicationMode}
      />
    </DashboardLayout>
  );
}
