import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, DollarSign, Users, Calendar, Target, Send, Heart, Building2, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DashboardLayout } from '../../components/DashboardLayout';
import { ApplicationModal } from '../../components/ApplicationModal';

interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  activeCampaigns: number;
  avgBudget: string;
  rating: number;
  description: string;
  tags: string[];
  followers: string;
  verified: boolean;
}

interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandId: string;
  brandLogo: string;
  budget: string;
  startDate: string;
  endDate: string;
  description: string;
  requirements: string[];
  category: string;
  tags: string[];
  applicants: number;
  status: 'active' | 'upcoming';
}

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'FashionHub',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    industry: 'Fashion & Lifestyle',
    location: 'New York, NY',
    activeCampaigns: 5,
    avgBudget: '$500-$1,000',
    rating: 4.8,
    description: 'Leading fashion brand looking for lifestyle influencers',
    tags: ['Fashion', 'Lifestyle', 'Clothing'],
    followers: '2.5M',
    verified: true
  },
  {
    id: '2',
    name: 'TechGear Pro',
    logo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    industry: 'Technology',
    location: 'San Francisco, CA',
    activeCampaigns: 8,
    avgBudget: '$1,000-$2,500',
    rating: 4.9,
    description: 'Tech company seeking reviewers and tech enthusiasts',
    tags: ['Technology', 'Gadgets', 'Reviews'],
    followers: '1.8M',
    verified: true
  },
  {
    id: '3',
    name: 'WellnessLife',
    logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
    industry: 'Health & Wellness',
    location: 'Los Angeles, CA',
    activeCampaigns: 6,
    avgBudget: '$400-$800',
    rating: 4.7,
    description: 'Wellness brand promoting healthy lifestyle',
    tags: ['Wellness', 'Health', 'Fitness'],
    followers: '980K',
    verified: true
  },
  {
    id: '4',
    name: 'BeautyGlow',
    logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
    industry: 'Beauty & Cosmetics',
    location: 'Miami, FL',
    activeCampaigns: 4,
    avgBudget: '$600-$1,200',
    rating: 4.6,
    description: 'Beauty brand seeking makeup and skincare influencers',
    tags: ['Beauty', 'Cosmetics', 'Skincare'],
    followers: '1.2M',
    verified: true
  },
  {
    id: '5',
    name: 'FoodieFiesta',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
    industry: 'Food & Beverage',
    location: 'Chicago, IL',
    activeCampaigns: 7,
    avgBudget: '$300-$700',
    rating: 4.5,
    description: 'Food delivery service looking for food bloggers',
    tags: ['Food', 'Restaurant', 'Delivery'],
    followers: '750K',
    verified: false
  },
  {
    id: '6',
    name: 'EcoGreen',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',
    industry: 'Sustainability',
    location: 'Portland, OR',
    activeCampaigns: 3,
    avgBudget: '$400-$900',
    rating: 4.8,
    description: 'Eco-friendly products promoting sustainable living',
    tags: ['Sustainability', 'Eco-friendly', 'Green'],
    followers: '650K',
    verified: true
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Fashion Collection 2026',
    brandName: 'FashionHub',
    brandId: '1',
    brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    budget: '$800-$1,200',
    startDate: '2026-04-15',
    endDate: '2026-07-31',
    description: 'Promote our new summer collection through Instagram posts and stories',
    requirements: ['10K+ followers', 'Fashion niche', '3 posts + 5 stories'],
    category: 'Fashion',
    tags: ['Summer', 'Fashion', 'Instagram'],
    applicants: 24,
    status: 'active'
  },
  {
    id: '2',
    title: 'Smart Watch Product Launch',
    brandName: 'TechGear Pro',
    brandId: '2',
    brandLogo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    budget: '$1,500-$2,000',
    startDate: '2026-04-01',
    endDate: '2026-05-15',
    description: 'Review and showcase our latest smartwatch with advanced features',
    requirements: ['Tech reviewer', 'YouTube channel', 'Unboxing + review video'],
    category: 'Technology',
    tags: ['Tech', 'Gadgets', 'Review'],
    applicants: 18,
    status: 'active'
  },
  {
    id: '3',
    title: 'Wellness Challenge - 30 Days',
    brandName: 'WellnessLife',
    brandId: '3',
    brandLogo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
    budget: '$600-$900',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    description: 'Join our 30-day wellness challenge and share your journey',
    requirements: ['Health/Fitness niche', 'Daily Instagram stories', 'Weekly posts'],
    category: 'Health & Wellness',
    tags: ['Wellness', 'Challenge', 'Fitness'],
    applicants: 32,
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Spring Makeup Tutorial Series',
    brandName: 'BeautyGlow',
    brandId: '4',
    brandLogo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
    budget: '$700-$1,100',
    startDate: '2026-04-10',
    endDate: '2026-06-10',
    description: 'Create makeup tutorials featuring our spring collection',
    requirements: ['Beauty influencer', 'YouTube/TikTok', '4 tutorial videos'],
    category: 'Beauty',
    tags: ['Beauty', 'Makeup', 'Tutorial'],
    applicants: 28,
    status: 'active'
  },
  {
    id: '5',
    title: 'Restaurant Week Promotion',
    brandName: 'FoodieFiesta',
    brandId: '5',
    brandLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
    budget: '$400-$650',
    startDate: '2026-04-20',
    endDate: '2026-05-05',
    description: 'Visit partnered restaurants and create engaging food content',
    requirements: ['Food blogger', '5K+ followers', '5 restaurant reviews'],
    category: 'Food',
    tags: ['Food', 'Restaurant', 'Review'],
    applicants: 41,
    status: 'active'
  },
  {
    id: '6',
    title: 'Eco-Friendly Product Line Launch',
    brandName: 'EcoGreen',
    brandId: '6',
    brandLogo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',
    budget: '$500-$850',
    startDate: '2026-05-15',
    endDate: '2026-07-15',
    description: 'Showcase our new sustainable products and eco-friendly practices',
    requirements: ['Sustainability niche', 'Instagram/TikTok', '3 posts + video'],
    category: 'Sustainability',
    tags: ['Eco-friendly', 'Sustainable', 'Green'],
    applicants: 15,
    status: 'upcoming'
  }
];

export function SearchBrandsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'brands' | 'campaigns'>('brands');
  const [savedBrands, setSavedBrands] = useState<Set<string>>(new Set());
  const [savedCampaigns, setSavedCampaigns] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [applicationMode, setApplicationMode] = useState<'brand' | 'campaign'>('campaign');

  // Simulate API call on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleSavedBrand = (id: string) => {
    const newSaved = new Set(savedBrands);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedBrands(newSaved);
  };

  const toggleSavedCampaign = (id: string) => {
    const newSaved = new Set(savedCampaigns);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedCampaigns(newSaved);
  };

  const filteredBrands = mockBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBrandRequest = (brand: Brand) => {
    setSelectedBrand(brand);
    setApplicationMode('brand');
    setIsApplicationModalOpen(true);
  };

  const handleCampaignApply = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setApplicationMode('campaign');
    setIsApplicationModalOpen(true);
  };

  const getAvailableCampaignsForBrand = (brandId: string) => {
    return mockCampaigns.filter(c => c.brandId === brandId);
  };

  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Johnson"
      notificationCount={8}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Explore Opportunities</h1>
          <p className="text-[#6b7280] mt-1">Discover brands and campaigns to collaborate with</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <input
              type="text"
              placeholder={activeTab === 'brands' ? 'Search brands...' : 'Search campaigns...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'brands' | 'campaigns')}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="brands">
              <Building2 className="w-4 h-4 mr-2" />
              Brands ({mockBrands.length})
            </TabsTrigger>
            <TabsTrigger value="campaigns">
              <Target className="w-4 h-4 mr-2" />
              Campaigns ({mockCampaigns.length})
            </TabsTrigger>
          </TabsList>

          {/* Brands Tab Content */}
          <TabsContent value="brands" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="w-16 h-16 bg-[#e5e7eb] rounded-lg mb-4"></div>
                    <div className="h-4 bg-[#e5e7eb] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#e5e7eb] rounded w-full mb-4"></div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrands.map((brand) => (
                  <Card
                    key={brand.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <img src={brand.logo} alt={brand.name} className="w-16 h-16 rounded-lg object-cover" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedBrand(brand.id);
                        }}
                        className={`p-2 rounded-lg ${savedBrands.has(brand.id) ? 'bg-[#fee2e2] text-[#ef4444]' : 'bg-[#f3f4f6] text-[#6b7280]'}`}
                      >
                        <Heart className={`w-5 h-5 ${savedBrands.has(brand.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-[#111827]">{brand.name}</h3>
                      {brand.verified && (
                        <Badge variant="default" className="bg-[#3b82f6]">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#6b7280] mb-3">{brand.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {brand.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <MapPin className="w-4 h-4" />
                        {brand.location}
                      </div>
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <DollarSign className="w-4 h-4" />
                        Avg. Budget: {brand.avgBudget}
                      </div>
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <Users className="w-4 h-4" />
                        {brand.activeCampaigns} active campaigns
                      </div>
                      <div className="flex items-center gap-2 text-[#6b7280]">
                        <TrendingUp className="w-4 h-4" />
                        {brand.followers} followers
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/influencer/brands/${brand.id}`)}
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBrandRequest(brand);
                        }}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send Request
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Campaigns Tab Content */}
          <TabsContent value="campaigns" className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-4 bg-[#e5e7eb] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#e5e7eb] rounded w-full mb-4"></div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    {/* Brand Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={campaign.brandLogo} alt={campaign.brandName} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm text-[#6b7280]">by</p>
                          <p className="font-semibold text-[#111827]">{campaign.brandName}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedCampaign(campaign.id);
                        }}
                        className={`p-2 rounded-lg ${savedCampaigns.has(campaign.id) ? 'bg-[#fee2e2] text-[#ef4444]' : 'bg-[#f3f4f6] text-[#6b7280]'}`}
                      >
                        <Heart className={`w-5 h-5 ${savedCampaigns.has(campaign.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Campaign Title */}
                    <h3 className="text-lg font-semibold text-[#111827] mb-2">{campaign.title}</h3>
                    <p className="text-sm text-[#6b7280] mb-4">{campaign.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="default" className="bg-[#3b82f6]">{campaign.category}</Badge>
                      {campaign.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                      <Badge variant={campaign.status === 'active' ? 'default' : 'outline'} className={campaign.status === 'active' ? 'bg-[#10b981]' : ''}>
                        {campaign.status === 'active' ? 'Active' : 'Upcoming'}
                      </Badge>
                    </div>

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
                        <span className="font-medium text-[#111827]">{campaign.startDate} - {campaign.endDate}</span>
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
                        {campaign.requirements.map((req, idx) => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCampaignApply(campaign);
                        }}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Apply Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedBrand(null);
          setSelectedCampaign(null);
        }}
        brandName={selectedBrand?.name || selectedCampaign?.brandName}
        brandLogo={selectedBrand?.logo || selectedCampaign?.brandLogo}
        selectedCampaign={selectedCampaign ? { id: selectedCampaign.id, title: selectedCampaign.title } : undefined}
        availableCampaigns={selectedBrand ? getAvailableCampaignsForBrand(selectedBrand.id) : []}
        mode={applicationMode}
      />
    </DashboardLayout>
  );
}