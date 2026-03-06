"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PortfolioData, TechStack, Project, ResearchDoc } from '@/lib/data';
import { Save, Plus, Trash2, X, LogOut } from 'lucide-react';
import { Login } from './Login';

interface AdminProps {
  data: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onClose: () => void;
}

export const Admin = ({ data, onSave, onClose }: AdminProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { register, control, handleSubmit, watch } = useForm<PortfolioData>({
    defaultValues: data
  });

  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
    control,
    name: "techStacks"
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projects"
  });

  const { fields: researchFields, append: appendResearch, remove: removeResearch } = useFieldArray({
    control,
    name: "researchDocs"
  });

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} onClose={onClose} />;
  }

  const onSubmit = (formData: PortfolioData) => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg-color)] overflow-y-auto p-4 md:p-8 transition-colors scanline crt-flicker">
      <div className="max-w-4xl mx-auto terminal-window p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[var(--border-color)] pb-6 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-[var(--text-primary)]">ADMIN_PANEL</h1>
            <p className="mono text-[10px] text-[var(--text-secondary)]">Modify system parameters and content</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 border border-red-500/30 mono text-[10px] font-bold text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
              title="Logout"
            >
              <LogOut size={14} /> LOGOUT
            </button>
            <button 
              onClick={onClose}
              className="flex-1 md:flex-none px-4 py-2 border border-[var(--border-color)] mono text-[10px] font-bold text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-all flex items-center justify-center gap-2"
            >
              <X size={14} /> CANCEL
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              className="flex-1 md:flex-none px-6 py-2 bg-[var(--accent-blue)] text-black mono text-[10px] font-bold hover:bg-[var(--text-primary)] hover:text-[var(--bg-color)] transition-all flex items-center justify-center gap-2 glow"
            >
              <Save size={14} /> SAVE_CHANGES
            </button>
          </div>
        </div>

        <form className="space-y-16 pb-20">
          {/* Basic Info */}
          <section className="space-y-6">
            <h2 className="mono text-xs font-bold text-[var(--accent-blue)] border-b border-[var(--accent-blue)]/10 pb-2 glow-text">01. BASIC_INFO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">System.Name</label>
                <input {...register("name")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">System.Status</label>
                <input {...register("status")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">System.Version</label>
                <input {...register("version")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Hero.Tag</label>
                <input {...register("heroTag")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Github.Username</label>
                <input {...register("githubUsername")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">System.Roles (Comma separated)</label>
                <input 
                  className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]"
                  defaultValue={data.roles.join(", ")}
                  onChange={(e) => {
                    const roles = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                    register("roles").onChange({ target: { value: roles, name: "roles" } });
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Hero.Description</label>
              <textarea {...register("heroDescription")} rows={3} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
            </div>
          </section>

          {/* Philosophy */}
          <section className="space-y-6">
            <h2 className="mono text-xs font-bold text-[var(--accent-blue)] border-b border-[var(--accent-blue)]/10 pb-2 glow-text">02. CORE_PHILOSOPHY</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Philosophy.Title</label>
                <input {...register("philosophy.title")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Philosophy.Content</label>
                <textarea {...register("philosophy.content")} rows={3} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Philosophy.SubContent</label>
                <textarea {...register("philosophy.subContent")} rows={3} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.philosophy.specs.map((spec, i) => (
                  <div key={i} className="space-y-2 p-4 border border-[var(--border-color)]">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Spec_{i+1}.Label</label>
                    <input {...register(`philosophy.specs.${i}.label`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-[10px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] mb-2" />
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Spec_{i+1}.Value</label>
                    <input {...register(`philosophy.specs.${i}.value`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-[10px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tech Stacks */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--accent-blue)]/10 pb-2">
              <h2 className="mono text-xs font-bold text-[var(--accent-blue)] glow-text">03. TECH_STACKS</h2>
              <button 
                type="button"
                onClick={() => appendTech({ id: Date.now().toString(), category: "NEW_STACK", items: [], icon: "code" })}
                className="mono text-[8px] font-bold text-[var(--accent-blue)] hover:underline flex items-center gap-1 glow-text"
              >
                <Plus size={10} /> ADD_STACK
              </button>
            </div>
            <div className="grid gap-6">
              {techFields.map((field, index) => (
                <div key={field.id} className="p-6 border border-[var(--border-color)] bg-[var(--card-bg)] relative">
                  <button 
                    type="button"
                    onClick={() => removeTech(index)}
                    className="absolute top-4 right-4 text-[var(--text-primary)]/20 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Category</label>
                      <input {...register(`techStacks.${index}.category`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Icon (code|cpu|shield)</label>
                      <input {...register(`techStacks.${index}.icon`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Items (Comma separated)</label>
                    <input 
                      className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]"
                      defaultValue={field.items.join(", ")}
                      onChange={(e) => {
                        const items = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                        register(`techStacks.${index}.items`).onChange({ target: { value: items, name: `techStacks.${index}.items` } });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--accent-blue)]/10 pb-2">
              <h2 className="mono text-xs font-bold text-[var(--accent-blue)] glow-text">04. PROJECTS</h2>
              <button 
                type="button"
                onClick={() => appendProject({ 
                  id: Date.now().toString(), 
                  title: "New Project", 
                  description: "", 
                  tags: [], 
                  githubUrl: "",
                  liveUrl: "",
                  docsUrl: "",
                  videoUrl: "",
                  techStackStats: [],
                  architecture: []
                })}
                className="mono text-[8px] font-bold text-[var(--accent-blue)] hover:underline flex items-center gap-1 glow-text"
              >
                <Plus size={10} /> ADD_PROJECT
              </button>
            </div>
            <div className="grid gap-6">
              {projectFields.map((field, index) => (
                <div key={field.id} className="p-6 border border-[var(--border-color)] bg-[var(--card-bg)] relative">
                  <button 
                    type="button"
                    onClick={() => removeProject(index)}
                    className="absolute top-4 right-4 text-[var(--text-primary)]/20 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Title</label>
                      <input {...register(`projects.${index}.title`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Description</label>
                    <textarea {...register(`projects.${index}.description`)} rows={2} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                  </div>
                  <div className="space-y-2 mb-4">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Tags (Comma separated)</label>
                    <input 
                      className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]"
                      defaultValue={field.tags.join(", ")}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                        register(`projects.${index}.tags`).onChange({ target: { value: tags, name: `projects.${index}.tags` } });
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Github URL</label>
                      <input 
                        type="url"
                        {...register(`projects.${index}.githubUrl`, {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Invalid URL"
                          }
                        })} 
                        placeholder="https://github.com/..."
                        className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Live Demo URL</label>
                      <input 
                        type="url"
                        {...register(`projects.${index}.liveUrl`, {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Invalid URL"
                          }
                        })} 
                        placeholder="https://..."
                        className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Documentation URL</label>
                      <input 
                        type="url"
                        {...register(`projects.${index}.docsUrl`, {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Invalid URL"
                          }
                        })} 
                        placeholder="https://docs..."
                        className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Video Demo URL</label>
                      <input 
                        type="url"
                        {...register(`projects.${index}.videoUrl`, {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Invalid URL"
                          }
                        })} 
                        placeholder="https://youtube.com/..."
                        className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" 
                      />
                    </div>
                  </div>

                  {/* Tech Stack Stats */}
                  <div className="mt-4 space-y-2">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Tech Stack Stats (Label:Value, Comma separated)</label>
                    <input 
                      className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]"
                      placeholder="Python:80, React:70"
                      defaultValue={field.techStackStats?.map(s => `${s.label}:${s.value}`).join(", ")}
                      onChange={(e) => {
                        const stats = e.target.value.split(",").map(s => {
                          const [label, value] = s.split(":").map(p => p.trim());
                          return label && value ? { label, value: parseInt(value) } : null;
                        }).filter(Boolean);
                        register(`projects.${index}.techStackStats`).onChange({ target: { value: stats, name: `projects.${index}.techStackStats` } });
                      }}
                    />
                  </div>

                  {/* Architecture */}
                  <div className="mt-4 space-y-2">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Architecture (From-&gt;To:Label, Comma separated)</label>
                    <input 
                      className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]"
                      placeholder="Client->Server:Request, Server->DB:Query"
                      defaultValue={field.architecture?.map(a => `${a.from}->${a.to}:${a.label}`).join(", ")}
                      onChange={(e) => {
                        const arch = e.target.value.split(",").map(s => {
                          const [flow, label] = s.split(":").map(p => p.trim());
                          const [from, to] = flow ? flow.split("->").map(p => p.trim()) : [];
                          return from && to && label ? { from, to, label } : null;
                        }).filter(Boolean);
                        register(`projects.${index}.architecture`).onChange({ target: { value: arch, name: `projects.${index}.architecture` } });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Research */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--accent-blue)]/10 pb-2">
              <h2 className="mono text-xs font-bold text-[var(--accent-blue)] glow-text">05. RESEARCH</h2>
              <button 
                type="button"
                onClick={() => appendResearch({ id: Date.now().toString(), number: "01", title: "New Research", content: "" })}
                className="mono text-[8px] font-bold text-[var(--accent-blue)] hover:underline flex items-center gap-1 glow-text"
              >
                <Plus size={10} /> ADD_RESEARCH
              </button>
            </div>
            <div className="grid gap-6">
              {researchFields.map((field, index) => (
                <div key={field.id} className="p-6 border border-[var(--border-color)] bg-[var(--card-bg)] relative">
                  <button 
                    type="button"
                    onClick={() => removeResearch(index)}
                    className="absolute top-4 right-4 text-[var(--text-primary)]/20 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Number</label>
                      <input {...register(`researchDocs.${index}.number`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Title</label>
                      <input {...register(`researchDocs.${index}.title`)} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Content</label>
                    <textarea {...register(`researchDocs.${index}.content`)} rows={2} className="w-full p-2 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Socials & Links */}
          <section className="space-y-6">
            <h2 className="mono text-xs font-bold text-[var(--accent-blue)] border-b border-[var(--accent-blue)]/10 pb-2 glow-text">06. SOCIALS_&_LINKS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Github.URL</label>
                <input {...register("socials.github")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Linkedin.URL</label>
                <input {...register("socials.linkedin")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">Email.Address</label>
                <input {...register("socials.email")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
              <div className="space-y-2">
                <label className="mono text-[8px] text-[var(--text-secondary)] uppercase">CV.Download.URL</label>
                <input {...register("cvUrl")} className="w-full p-3 border border-[var(--border-color)] bg-transparent mono text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)]" />
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
