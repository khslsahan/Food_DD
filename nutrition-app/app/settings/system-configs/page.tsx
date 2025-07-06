'use client';
import React, { useEffect, useState } from 'react';

type Config = {
  config_key: string;
  config_value: string;
  description: string | null;
  updated_at: string;
};

export default function SystemConfigAdminPage() {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editConfig, setEditConfig] = useState<Config | null>(null);
  const [form, setForm] = useState({ config_key: '', config_value: '', description: '' });

  // Fetch configs
  useEffect(() => {
    fetch('/api/system-configs')
      .then(res => res.json())
      .then(setConfigs);
  }, []);

  // Open modal for add or edit
  const openModal = (config?: Config) => {
    setEditConfig(config || null);
    setForm({
      config_key: config?.config_key || '',
      config_value: config?.config_value || '',
      description: config?.description || '',
    });
    setModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editConfig ? 'PUT' : 'POST';
    const res = await fetch('/api/system-configs', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setModalOpen(false);
      // Refresh configs
      fetch('/api/system-configs')
        .then(res => res.json())
        .then(setConfigs);
    } else {
      alert('Error saving config');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">System Configurations</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => openModal()}
      >
        Add New Config
      </button>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Key</th>
            <th className="border px-2 py-1">Value</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Updated At</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {configs.map(cfg => (
            <tr key={cfg.config_key}>
              <td className="border px-2 py-1">{cfg.config_key}</td>
              <td className="border px-2 py-1">{cfg.config_value}</td>
              <td className="border px-2 py-1">{cfg.description}</td>
              <td className="border px-2 py-1">{new Date(cfg.updated_at).toLocaleString()}</td>
              <td className="border px-2 py-1">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => openModal(cfg)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-md w-96"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl mb-4">{editConfig ? 'Edit Config' : 'Add Config'}</h2>
            <div className="mb-2">
              <label className="block mb-1">Key</label>
              <input
                className="w-full border px-2 py-1"
                value={form.config_key}
                onChange={e => setForm(f => ({ ...f, config_key: e.target.value }))}
                disabled={!!editConfig}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Value</label>
              <input
                className="w-full border px-2 py-1"
                value={form.config_value}
                onChange={e => setForm(f => ({ ...f, config_value: e.target.value }))}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Description</label>
              <input
                className="w-full border px-2 py-1"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 