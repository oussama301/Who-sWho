import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Employee {
  id: number
  name: string
  position: string
  department: string
}

interface EmployeeListProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (id: number) => void
  onView: (employee: Employee) => void
}

export function EmployeeList({ employees, onEdit, onDelete, onView }: EmployeeListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Poste</TableHead>
          <TableHead>Département</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => onView(employee)} className="mr-2">
                Voir détails
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEdit(employee)} className="mr-2">
                Modifier
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(employee.id)}>
                Supprimer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

