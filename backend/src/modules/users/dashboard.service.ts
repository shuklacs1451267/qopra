import { UserModel } from "../users/user.model";
import { CampaignModel } from "../campaign/campaign.model";

interface DashboardData {
  weeklyActivity: { name: string; sent: number; delivered: number }[];
  weeklyCost: { name: string; cost: number }[];
  channelSplit: { name: string; value: number }[];
  credits: number;
  creditsValue: number;
  campaignsRunning: number;
  messagesSent: number;
  deliveryRate: string;
}

interface Campaign {
  recipients?: any[];
  scheduledAt?: string | Date;
}

export const DashboardService = {
  async getClientDashboard(userId: string): Promise<DashboardData> {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    const campaigns: Campaign[] = await CampaignModel.find({ user: userId });

    const campaignsRunning = campaigns.filter(
      (c) => new Date(c.scheduledAt || "") > new Date()
    ).length;

    const messagesSent = campaigns.reduce<number>((sum, c) => {
      return sum + (c.recipients?.length || 0);
    }, 0);

    const deliveredMessages = campaigns.reduce<number>((sum, c) => {
      return sum + Math.floor((c.recipients?.length || 0) * 0.95);
    }, 0);

    const deliveryRate =
      messagesSent > 0
        ? ((deliveredMessages / messagesSent) * 100).toFixed(0) + "%"
        : "0%";

    const weeklyActivity = [
      { name: "Mon", sent: 120, delivered: 116 },
      { name: "Tue", sent: 180, delivered: 172 },
      { name: "Wed", sent: 240, delivered: 230 },
      { name: "Thu", sent: 300, delivered: 291 },
      { name: "Fri", sent: 420, delivered: 401 },
      { name: "Sat", sent: 360, delivered: 347 },
      { name: "Sun", sent: 220, delivered: 215 },
    ];

    const weeklyCost = [
      { name: "Week1", cost: 1200 },
      { name: "Week2", cost: 1800 },
      { name: "Week3", cost: 2600 },
      { name: "Week4", cost: 3200 },
    ];

    const channelSplit = [
      { name: "WhatsApp", value: 72 },
      { name: "SMS", value: 18 },
      { name: "Email", value: 10 },
    ];

    return {
      weeklyActivity,
      weeklyCost,
      channelSplit,
      credits: user.credits || 0,
      creditsValue: (user.credits || 0) * 1.2,
      campaignsRunning,
      messagesSent,
      deliveryRate,
    };
  },
};
