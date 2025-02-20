// ✅ Updated code: Fixed undefined domains issue and ensured proper initialization

"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";

interface Domain {
  name: string;
  level: string;
}

interface EmployeeFormProps {
  employee: any;
  onSubmit: (employee: any) => void;
  onCancel: () => void;
}

const availableDomains = ["Web Development", "Backend", "Frontend", "UI/UX Design", "DevOps", "AI/ML"];
const levels = ["Non Formé", "Débutant", "Intermédiaire", "Avancé"];

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ ...employee, domains: employee.domains || [] });
  const [isDomainPopupOpen, setIsDomainPopupOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  useEffect(() => {
    if (!Array.isArray(formData.domains)) {
      setFormData((prevData) => ({ ...prevData, domains: [] }));
    }
  }, [formData.domains]);

  const handleAddDomain = (domain: string) => {
    setSelectedDomain(domain);
    setIsDomainPopupOpen(true);
  };

  const handleSetDomainLevel = (level: string) => {
    if (selectedDomain) {
      const newDomain = { name: selectedDomain, level };
      setFormData((prevData) => ({ ...prevData, domains: [...prevData.domains, newDomain] }));
      setSelectedDomain(null);
      setIsDomainPopupOpen(false);
    }
  };

  const handleRemoveDomain = (domainName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      domains: prevData.domains.filter((domain: Domain) => domain.name !== domainName),
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nom"
          className="input input-bordered w-full"
        />
        <input
          name="position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          placeholder="Poste"
          className="input input-bordered w-full"
        />
        <input
          name="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          placeholder="Département"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <h3 className="font-bold mb-2">Domaines</h3>
        <div className="flex flex-wrap gap-2">
          {formData.domains && formData.domains.map((domain: Domain, index: number) => (
            <div key={index} className="badge badge-primary gap-2">
              {domain.name} - {domain.level}
              <button type="button" onClick={() => handleRemoveDomain(domain.name)} className="ml-2 text-red-500">✖</button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {availableDomains.map((domain, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleAddDomain(domain)}
              className="badge badge-outline cursor-pointer"
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button type="button" onClick={onCancel} className="btn btn-outline">
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          Mettre à jour
        </button>
      </div>

      {isDomainPopupOpen && (
        <Modal onClose={() => setIsDomainPopupOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Sélectionnez le niveau pour {selectedDomain}</h2>
          <div className="space-y-2">
            {levels.map((level, index) => (
              <button
                key={index}
                onClick={() => handleSetDomainLevel(level)}
                className="btn btn-outline w-full"
              >
                {level}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </form>
  );
};