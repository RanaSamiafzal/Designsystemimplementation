import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, CheckCircle2, Clock, AlertCircle, MessageSquare, Target, Users, Filter, Check, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { DashboardLayout } from '../../components/DashboardLayout';

type NotificationType = 'application' | 'collaboration' | 'message' | 'system';
type NotificationStatus = 'unread' | 'read';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  status: NotificationStatus;
  actionUrl?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
  metadata?: {
    brandName?: string;
    campaignName?: string;
    brandLogo?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'application',
    title: 'Application Accepted',
    message: 'Your application for "Summer Fashion Collection 2026" has been accepted by FashionHub!',
    timestamp: '2026-04-01T10:30:00',
    status: 'unread',
    actionUrl: '/influencer/collaboration/1',
    actionLabel: 'View Collaboration',
    metadata: {
      brandName: 'FashionHub',
      campaignName: 'Summer Fashion Collection 2026',
      brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop'
    }
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message from TechGear Pro',
    message: 'TechGear Pro sent you a message regarding your smartwatch review proposal.',
    timestamp: '2026-04-01T09:15:00',
    status: 'unread',
    actionUrl: '/influencer/messages/2',
    actionLabel: 'View Message',
    metadata: {
      brandName: 'TechGear Pro',
      brandLogo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=50&h=50&fit=crop'
    }
  },
  {
    id: '3',
    type: 'application',
    title: 'Application Under Review',
    message: 'WellnessLife is reviewing your application for the "30-Day Wellness Challenge".',
    timestamp: '2026-03-31T16:45:00',
    status: 'read',
    actionUrl: '/influencer/requests-page',
    actionLabel: 'View Application',
    metadata: {
      brandName: 'WellnessLife',
      campaignName: '30-Day Wellness Challenge',
      brandLogo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=50&h=50&fit=crop'
    }
  },
  {
    id: '4',
    type: 'collaboration',
    title: 'New Deliverable Added',
    message: 'FashionHub added 2 new deliverables to your Summer Fashion Collection collaboration.',
    timestamp: '2026-03-31T14:20:00',
    status: 'read',
    actionUrl: '/influencer/deliverable-board/1',
    actionLabel: 'View Deliverables',
    metadata: {
      brandName: 'FashionHub'
    }
  },
  {
    id: '5',
    type: 'application',
    title: 'Application Declined',
    message: 'Unfortunately, your application for "Restaurant Week Promotion" was not selected at this time.',
    timestamp: '2026-03-30T11:30:00',
    status: 'read',
    actionUrl: '/influencer/search-brands',
    actionLabel: 'Browse Campaigns',
    metadata: {
      brandName: 'FoodieFiesta',
      campaignName: 'Restaurant Week Promotion'
    }
  },
  {
    id: '6',
    type: 'collaboration',
    title: 'Deliverable Approved',
    message: 'TechGear Pro approved your product review video. Payment has been processed.',
    timestamp: '2026-03-29T15:10:00',
    status: 'read',
    actionUrl: '/influencer/collaborations-page',
    actionLabel: 'View Collaboration',
    metadata: {
      brandName: 'TechGear Pro'
    }
  },
  {
    id: '7',
    type: 'message',
    title: 'New Message from BeautyGlow',
    message: 'BeautyGlow is interested in collaborating with you for their spring makeup line.',
    timestamp: '2026-03-28T09:45:00',
    status: 'read',
    actionUrl: '/influencer/brands/4',
    actionLabel: 'View Brand',
    metadata: {
      brandName: 'BeautyGlow',
      brandLogo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=50&h=50&fit=crop'
    }
  },
  {
    id: '8',
    type: 'system',
    title: 'Profile Completion Reminder',
    message: 'Complete your portfolio to increase your chances of getting selected for campaigns.',
    timestamp: '2026-03-27T10:00:00',
    status: 'read',
    actionUrl: '/influencer/settings',
    actionLabel: 'Edit Profile'
  },
  {
    id: '9',
    type: 'collaboration',
    title: 'Deadline Approaching',
    message: 'You have 3 deliverables due in the next 48 hours for Summer Fashion Collection.',
    timestamp: '2026-03-26T08:30:00',
    status: 'read',
    actionUrl: '/influencer/deliverable-board/1',
    actionLabel: 'View Tasks'
  },
  {
    id: '10',
    type: 'application',
    title: 'New Campaign Match',
    message: 'Based on your profile, you might be interested in "Eco-Friendly Product Line Launch".',
    timestamp: '2026-03-25T14:15:00',
    status: 'read',
    actionUrl: '/influencer/campaigns/6',
    actionLabel: 'View Campaign'
  }
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filter === 'all' || notification.type === filter;
    const matchesReadStatus = !showUnreadOnly || notification.status === 'unread';
    return matchesType && matchesReadStatus;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'read' as NotificationStatus } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, status: 'read' as NotificationStatus }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'application':
        return <Target className="w-5 h-5" />;
      case 'collaboration':
        return <Users className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'system':
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'application':
        return 'bg-[#dbeafe] text-[#3b82f6]';
      case 'collaboration':
        return 'bg-[#d1fae5] text-[#10b981]';
      case 'message':
        return 'bg-[#e0e7ff] text-[#6366f1]';
      case 'system':
        return 'bg-[#fef3c7] text-[#f59e0b]';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - notificationTime.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return notificationTime.toLocaleDateString();
  };

  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Johnson"
      notificationCount={unreadCount}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/influencer/dashboard')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Notifications</h1>
                <p className="text-[#6b7280] mt-1">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
            <TabsList>
              <TabsTrigger value="all">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="application">
                Applications ({notifications.filter(n => n.type === 'application').length})
              </TabsTrigger>
              <TabsTrigger value="collaboration">
                Collaborations ({notifications.filter(n => n.type === 'collaboration').length})
              </TabsTrigger>
              <TabsTrigger value="message">
                Messages ({notifications.filter(n => n.type === 'message').length})
              </TabsTrigger>
              <TabsTrigger value="system">
                System ({notifications.filter(n => n.type === 'system').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="w-4 h-4 text-[#3b82f6] border-[#d1d5db] rounded focus:ring-[#3b82f6]"
            />
            <span className="text-sm text-[#6b7280]">Show unread only</span>
          </label>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-12 h-12 text-[#9ca3af] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#111827] mb-2">No Notifications</h3>
              <p className="text-[#6b7280]">
                {showUnreadOnly ? "You don't have any unread notifications." : "You're all caught up!"}
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 transition-all ${
                  notification.status === 'unread'
                    ? 'border-l-4 border-l-[#3b82f6] bg-[#eff6ff]'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-lg ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#111827]">{notification.title}</h3>
                          {notification.status === 'unread' && (
                            <Badge variant="default" className="bg-[#3b82f6]">New</Badge>
                          )}
                        </div>
                        {notification.metadata?.brandLogo && (
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src={notification.metadata.brandLogo}
                              alt={notification.metadata.brandName}
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span className="text-sm text-[#6b7280]">{notification.metadata.brandName}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#6b7280] whitespace-nowrap">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#6b7280] mb-3">{notification.message}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {notification.actionUrl && notification.actionLabel && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-[#3b82f6] hover:bg-[#2563eb]"
                          onClick={() => {
                            markAsRead(notification.id);
                            navigate(notification.actionUrl!);
                          }}
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                      {notification.status === 'unread' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-[#ef4444] hover:text-[#dc2626] hover:bg-[#fee2e2]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center">
            <Button variant="outline">
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
