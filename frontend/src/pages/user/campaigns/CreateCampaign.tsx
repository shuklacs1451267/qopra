/* eslint-disable no-negated-condition */
import React, { useState } from "react";
import "../../../styles/userCss/CreateCampaign.css";
import api from "../../../api/adminApi";

type CampaignForm = {
  title: string;
  channel: string;
  type: "bulk" | "single" | "template";
  senderId: string;
  scheduledAt: string;
  recipients: string;
  message: string;
  description: string;
  tags: string;
  templateId: string;
};

const CreateCampaign: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CampaignForm>({
    title: "",
    channel: "",
    type: "bulk",
    senderId: "",
    scheduledAt: "",
    recipients: "",
    message: "",
    description: "",
    tags: "",
    templateId: "",
  });

  const [fileRecipients, setFileRecipients] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileRecipients(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const recipientsArray =
      form.recipients.trim() !== ""
        ? form.recipients.split(",").map((x) => x.trim())
        : [];

    const finalPayload: Record<string, unknown> = {
      title: form.title,
      channel: form.channel,
      type: form.type,
      senderId: form.senderId,
      scheduledAt: form.scheduledAt || null,
      message: form.type !== "template" ? form.message : null,
      templateId: form.type === "template" ? form.templateId : null,
      description: form.description || "",
      tags:
        form.tags.trim() !== ""
          ? form.tags.split(",").map((t) => t.trim())
          : [],
      recipients: recipientsArray,
    };

    const data = new FormData();

    for (const [key, value] of Object.entries(finalPayload)) {
      if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
        data.append(key, JSON.stringify(value));
      } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        data.append(key, value.toString());
      }
    }


    if (fileRecipients) {
      data.append("file", fileRecipients);
    }

    try {
      await api.post("/campaigns", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Campaign Created Successfully!");

      setForm({
        title: "",
        channel: "",
        type: "bulk",
        senderId: "",
        scheduledAt: "",
        recipients: "",
        message: "",
        description: "",
        tags: "",
        templateId: "",
      });

      setFileRecipients(null);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Error creating campaign!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-campaign-page">
      <form className="create-campaign-form" onSubmit={handleSubmit}>
        <h2>Create New Campaign</h2>

        <div className="form-grid">

          <div className="form-group form-full">
            <label htmlFor="title">Campaign Title *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter campaign name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="channel">Channel *</label>
            <select
              id="channel"
              name="channel"
              value={form.channel}
              onChange={handleChange}
              required
            >
              <option value="">Select Channel</option>
              <option value="SMS">SMS</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type">Message Type *</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="bulk">Bulk</option>
              <option value="single">Single</option>
              <option value="template">Template</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="senderId">Sender ID *</label>
            <input
              id="senderId"
              name="senderId"
              value={form.senderId}
              onChange={handleChange}
              required
              placeholder="SMS ID / WhatsApp ID / Email From"
            />
          </div>

          {form.type === "template" && (
            <div className="form-group">
              <label htmlFor="templateId">Template ID *</label>
              <input
                id="templateId"
                name="templateId"
                value={form.templateId}
                onChange={handleChange}
                required
                placeholder="whatsapp_template_001"
              />
            </div>
          )}

          <div className="form-group form-full">
            <label htmlFor="recipients">Recipients (comma separated)</label>
            <input
              id="recipients"
              name="recipients"
              value={form.recipients}
              onChange={handleChange}
              placeholder="9876543210, 9876543211"
            />
          </div>

          <div className="form-group form-full">
            <label htmlFor="file">Upload CSV (optional)</label>
            <input id="file" type="file" accept=".csv" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label htmlFor="scheduledAt">Schedule Time (Optional)</label>
            <input
              id="scheduledAt"
              type="datetime-local"
              name="scheduledAt"
              value={form.scheduledAt}
              onChange={handleChange}
            />
          </div>

          <div className="form-group form-full">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              id="tags"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="promo, update, festival"
            />
          </div>

          <div className="form-group form-full stacked">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your campaign message..."
              required={form.type !== "template"}
            />
          </div>

          <div className="form-group form-full stacked">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description or notes..."
            />
          </div>

        </div>

        <button className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
