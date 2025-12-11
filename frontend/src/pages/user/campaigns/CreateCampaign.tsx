import { CampaignModel } from "./campaign.model";
import { NotFound } from "../../core/errors";
import { logger } from "../../config/logger";

export const CampaignService = {
  
  /**
   * @pram Create a new campaign for a user
   */
  async create(userId: string, data: Partial<any>) {
    const campaign = await CampaignModel.create({ ...data, user: userId });
    if (data.scheduledAt) data.scheduledAt = new Date(data.scheduledAt);

    logger.info(`[CampaignService] Created campaign | UserID: ${userId} | CampaignID: ${campaign._id}`);
    return campaign;
  },

  /**
   * @pram Get a campaign by ID
   * @throws NotFound if campaign does not exist
   */
  async getById(id: string) {
    const campaign = await CampaignModel.findById(id).populate("user", "name email avatar role");
    if (!campaign) throw new NotFound("Campaign not found");
    return campaign;
  },

  /**
   * @pram List all campaigns for a specific user
   */
  async listByUser(userId: string) {
    return CampaignModel.find({ user: userId })
      .populate("user", "name email avatar role")
      .sort({ createdAt: -1 });
  },

  /**
   * @pram List all campaigns (limit default 50)
   */
  async listAll(limit = 50) {
    return CampaignModel.find()
      .populate("user", "name email avatar role")
      .limit(limit)
      .sort({ createdAt: -1 });
  },

  /**
   * @pram Update a campaign by ID
   * @throws NotFound if campaign does not exist
   */
  async update(id: string, data: Partial<any>) {
    const campaign = await CampaignModel.findByIdAndUpdate(id, data, { new: true });
    if (!campaign) throw new NotFound("Campaign not found");
    logger.info(`[CampaignService] Updated campaign | CampaignID: ${id}`);
    return campaign;
  },

  /**
   * @pram Delete a campaign by ID
   * @throws NotFound if campaign does not exist
   */
  async delete(id: string) {
    const campaign = await CampaignModel.findByIdAndDelete(id);
    if (!campaign) throw new NotFound("Campaign not found");
    logger.info(`[CampaignService] Deleted campaign | CampaignID: ${id}`);
    return campaign;
  },
};
