import mongoose, { Schema, model, models } from 'mongoose';

const TechStackSchema = new Schema({
  id: String,
  category: String,
  items: [String],
  icon: String,
});

const ProjectSchema = new Schema({
  id: String,
  title: String,
  description: String,
  tags: [String],
  githubUrl: String,
  liveUrl: String,
  docsUrl: String,
  videoUrl: String,
  architecture: [{ from: String, to: String, label: String }],
  techStackStats: [{ label: String, value: Number }],
});

const ResearchDocSchema = new Schema({
  id: String,
  number: String,
  title: String,
  content: String,
});

const PortfolioSchema = new Schema({
  name: String,
  version: String,
  status: String,
  roles: [String],
  heroDescription: String,
  portraitUrl: String,
  githubUsername: String,
  stats: [{ label: String, value: String }],
  philosophy: {
    title: String,
    content: String,
    subContent: String,
    specs: [{ label: String, value: String }],
  },
  techStacks: [TechStackSchema],
  projects: [ProjectSchema],
  researchDocs: [ResearchDocSchema],
  socials: {
    github: String,
    linkedin: String,
    email: String,
  },
  cvUrl: String,
}, { timestamps: true });

export const Portfolio = models.Portfolio || model('Portfolio', PortfolioSchema);
