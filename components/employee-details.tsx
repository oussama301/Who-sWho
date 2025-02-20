// ✅ Updated code: Added safe check for domains array

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

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
  domains?: Domain[]; // ✅ Optional to prevent undefined errors
}

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
}

const levelScores: Record<string, number> = {
  "Non Formé": 0,
  "Débutant": 25,
  "Intermédiaire": 50,
  "Avancé": 100,
};

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  const radarData = employee.domains?.map((domain) => ({
    name: domain.name,
    score: levelScores[domain.level] || 0,
  })) || []; // ✅ Default to empty array if domains is undefined

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{employee.name} - Détails</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
  <div>
    <p>
      <strong>Poste:</strong> {employee.position}
    </p>
    <p>
      <strong>Département:</strong> {employee.department}
    </p>
  </div>

  {/* ✅ Avatar added on the right side with styling */}
  <img
    src="https://avatar.iran.liara.run/public"
    alt="Employee Avatar"
    className="w-24 h-24 rounded-full object-cover border border-gray-300"
  />
</CardContent>

      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Matrice de Compétences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {employee.skills.map((skill) => (
              <div key={skill.name} className="flex justify-between items-center">
                <span>{skill.name}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ✅ Radar Chart with Domain Levels */}
      {radarData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Domaine</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Domaine" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={onClose}>Fermer</Button>
      </div>
    </div>
  );
}
