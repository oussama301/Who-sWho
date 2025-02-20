"use client";

import { useState, useEffect } from "react";
import { EmployeeList } from "@/components/employee-list";
import { EmployeeForm } from "@/components/employee-form";
import { EmployeeDetails } from "@/components/employee-details";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

interface Skill {
  name: string;
  level: number;
}

interface Domain {
  name: string;
  level: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  skills: Skill[];
  domains?: Domain[];
}

// ✅ Initial Static Users
const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Jean Dupont",
    position: "Développeur",
    department: "IT",
    skills: [
      { name: "JavaScript", level: 4 },
      { name: "React", level: 3 },
      { name: "Node.js", level: 3 },
    ],
    domains: [
      { name: "Web Development", level: "Avancé" },
      { name: "Backend", level: "Intermédiaire" },
    ],
  },
  {
    id: 2,
    name: "Marie Martin",
    position: "Designer",
    department: "Marketing",
    skills: [],
    domains: [],
  },
  {
    id: 3,
    name: "Pierre Durand",
    position: "Comptable",
    department: "Finance",
    skills: [],
    domains: [],
  },
];

export default function EmployeeManagement() {
  // ✅ Initialize State Using localStorage or Default to Static Users
  const [employees, setEmployees] = useState<Employee[]>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("employees");
      return savedData ? JSON.parse(savedData) : initialEmployees;
    }
    return initialEmployees;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalType, setModalType] = useState<"details" | "edit" | "delete" | null>(null);

  // ✅ Persist State to localStorage Whenever It Changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);

  // ✅ CRUD Operations
  const addEmployee = (employee: Omit<Employee, "id">) => {
    const newEmployee = { ...employee, id: Date.now() };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
    closeModal();
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    closeModal();
  };

  // ✅ Filtering
  const filteredEmployees = employees.filter((emp) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(lowerCaseSearch) ||
      emp.position.toLowerCase().includes(lowerCaseSearch) ||
      emp.department.toLowerCase().includes(lowerCaseSearch) ||
      emp.skills.some((skill) => skill.name.toLowerCase().includes(lowerCaseSearch)) ||
      emp.domains?.some((domain) => domain.name.toLowerCase().includes(lowerCaseSearch))
    );
  });

  const openModal = (employee: Employee, type: "details" | "edit" | "delete") => {
    setSelectedEmployee(employee);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setModalType(null);
  };

  return (
    <div className="container mx-auto p-4">

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Rechercher par nom, poste, département, compétence ou domaine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full input input-bordered"
        />
      </div>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={(emp) => openModal(emp, "edit")}
        onDelete={(id) => openModal(employees.find((emp) => emp.id === id)!, "delete")}
        onView={(emp) => openModal(emp, "details")}
      />

      {modalType && selectedEmployee && (
        <Modal onClose={closeModal}>
          {modalType === "details" && <EmployeeDetails employee={selectedEmployee} onClose={closeModal} />}
          {modalType === "edit" && <EmployeeForm employee={selectedEmployee} onSubmit={updateEmployee} onCancel={closeModal} />}
          {modalType === "delete" && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
              <p>Voulez-vous vraiment supprimer {selectedEmployee.name} ?</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button onClick={closeModal} className="btn btn-outline">Annuler</button>
                <button onClick={() => deleteEmployee(selectedEmployee.id)} className="btn btn-error">Supprimer</button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
